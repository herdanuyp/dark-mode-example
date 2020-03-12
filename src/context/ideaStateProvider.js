import React, { useReducer, createContext, useCallback, useEffect } from 'react'

import useHttp from '../hooks/http'

const IdeaContext = createContext()

const ideaReducer = (currentIdeaState, action) => {
  switch (action.type) {
    case 'SET':
      return action.ideas

    case 'ADD':
      return [...currentIdeaState, action.idea]

    case 'DELETE':
      return currentIdeaState.filter((idea) => idea.id !== action.id)

    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

function IdeaProvider({ children }) {
  const [ideaState, dispatch] = useReducer(ideaReducer, [])
  const { status, error, data, sendRequest, helper, identifier } = useHttp()

  useEffect(() => {
    if (status !== 'pending' && !error && identifier === 'REMOVE_IDEA') {
      dispatch({ type: 'DELETE', id: helper })
    } else if (status !== 'pending' && !error && identifier === 'ADD_IDEA') {
      dispatch({ type: 'ADD', idea: { id: data.name, ...helper } })
    }
  }, [data, helper, identifier, status, error])

  const addIdeaHandler = useCallback(
    (value) => {
      sendRequest(
        `${process.env.REACT_APP_DUMMY_BACKEND}/ideas.json`,
        'POST',
        JSON.stringify(value),
        value,
        'ADD_IDEA'
      )
    },
    [sendRequest]
  )

  const removeIdeaHandler = useCallback(
    (id) => {
      sendRequest(
        `${process.env.REACT_APP_DUMMY_BACKEND}/ideas/${id}.json`,
        'DELETE',
        null,
        id,
        'REMOVE_IDEA'
      )
    },
    [sendRequest]
  )

  const filteredIdeaHandler = useCallback((value) => {
    dispatch({ type: 'SET', ideas: value })
  }, [])

  const statusHandler = useCallback(() => {
    if (status === 'pending') {
      return <div>Loading your request...</div>
    }
  }, [status])

  return (
    <IdeaContext.Provider
      value={{
        ideaState,
        addIdeaHandler,
        removeIdeaHandler,
        filteredIdeaHandler,
        statusHandler
      }}
    >
      {children}
    </IdeaContext.Provider>
  )
}

export { IdeaProvider, IdeaContext }
