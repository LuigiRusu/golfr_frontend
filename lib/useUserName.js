import useSWR from 'swr'
import { getToken } from './userAuth'

export const USER_NAME_URL = userId => `${process.env.NEXT_PUBLIC_API_URL}/users/${userId}`

const useUserName = userId => {
  const fetcher = async url => {
    const res = await fetch(url, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${getToken()}`,
      },
    })

    if (!res.ok) {
      const error = new Error('There was an error while fetching the data.')
      // Attach extra info to the error object.
      error.info = await res.json()
      error.status = res.status
      throw error
    }
    return res.json().then(data => data.name)
  }

  const NAME_URL = USER_NAME_URL(userId)

  const { data, error } = useSWR(userId ? NAME_URL : null, fetcher)

  return {
    name: data,
    error_name: error && error.message,
  }
}


export default useUserName
