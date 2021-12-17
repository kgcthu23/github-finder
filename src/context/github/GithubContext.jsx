import { createContext, useReducer } from 'react'
import { FaWindows } from 'react-icons/fa'
import githubReducer from './GithubReducer'

const GithubContext = createContext()
const token = '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'

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    loading: false,
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)

  // Get Search results
  const searchUsers = async (text) => {
    const params = new URLSearchParams({
      q: text,
    })
    setLoading()
    const res = await fetch(`https://api.github.com/search/users?${params}`)
    const { items } = await res.json()
    dispatch({
      type: 'GET_USERS',
      payload: items,
    })
  }

  // Get Single User
  const getUser = async (login) => {
    setLoading()
    const res = await fetch(`https://api.github.com/users/${login}`, {
      headers: {
        Authorization: `token ${token}`,
      },
    })

    const data = await res.json()
    dispatch({
      type: 'GET_USER',
      payload: data,
    })
  }

  const setLoading = () => {
    dispatch({
      type: 'SET_LOADING',
    })
  }

  const clearUsers = () => {
    dispatch({
      type: 'CLEAR_USERS',
    })
  }

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
