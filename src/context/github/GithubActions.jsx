import axios from 'axios'

const token = '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'

const github = axios.create({
  baseURL: 'https://api.github.com',
})

// Get Search results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({
    q: text,
  })
  const res = await github.get(`/search/users?${params}`)

  return res.data.items
}

// Get Single User
export const getUser = async (login) => {
  const res = await fetch(`https://api.github.com/users/${login}`)

  const data = await res.json()
  return data
}

// get repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({
    sort: 'created',
    per_page: 10,
  })

  const res = await fetch(
    `https://api.github.com/users/${login}/repos?${params}`
  )

  const data = await res.json()
  return data
}

// get user and repos
export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`users/${login}`),
    github.get(`/users/${login}/repos`),
  ])
  return { user: user.data, repos: repos.data }
}
