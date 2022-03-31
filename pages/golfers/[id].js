import { useRouter } from 'next/router'
import Layout from '../../components/Layout'
import ScoreCard from '../../components/ScoreCard'
import useUserName from '../../lib/useUserName'
import useUserScores from '../../lib/useUserScores'
import { USER_SCORES_URL } from '../../lib/useUserScores'

const ScoresList = () => {
  const router = useRouter()
  const { id } = router.query
  const { name, errorName } = useUserName(id)
  const { scores, errorScores } = useUserScores(id)

  if (errorName) {
    return <Layout> {errorName} </Layout>
  }

  if (errorScores) {
    return <Layout> {errorScores} </Layout>
  }

  return (
    <Layout>
      {
        name && (
          <>
            <h1>  Player <b> {name} </b> </h1>
            {scores && scores.map(score => (
              <ScoreCard
                key={score.id}
                id={score.id}
                totalScore={score.total_score}
                playedAt={score.played_at}
                userId={score.user_id}
                userName={name}
                url={USER_SCORES_URL}
              />
            ))}
          </>
        )}
    </Layout>
  )
}

export default ScoresList
