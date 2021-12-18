import { createContext, useReducer } from 'react'

import githubReducer from './GithubReducer'

const GithubContext = createContext()
const token = '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'

export const GithubProvider = ({ children }) => {
  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  }
  const [state, dispatch] = useReducer(githubReducer, initialState)

  return (
    <GithubContext.Provider
      value={{
        ...state,
        dispatch,
      }}
    >
      {children}
    </GithubContext.Provider>
  )
}

export default GithubContext
