import React, { useReducer, createContext, useCallback } from 'react'
import Swal from 'sweetalert2'

const IdeaContext = createContext()

const ideaReducer = (currentIdeaState, action) => {
  switch (action.type) {
    case 'SET':
      return action.ideas

    case 'ADD':
      return [...currentIdeaState.ideaState, action.idea]

    case 'DELETE':
      return currentIdeaState.ideaState.filter((idea) => idea.id !== action.id)

    default:
      throw new Error(`Unhandled action type ${action.type}`)
  }
}

const httpReducer = (currentHttpState, action) => {
  switch (action.type) {
    case 'ERROR': {
      return {
        ...currentHttpState,
        status: 'rejected',
        error: action.errorMessage
      }
    }

    case 'SUCCESS': {
      return {
        ...currentHttpState,
        status: 'resolved'
      }
    }

    case 'STARTED': {
      return {
        ...currentHttpState,
        status: 'pending'
      }
    }

    default: {
      throw new Error(`Unhandled HTTP action type: ${action.type}`)
    }
  }
}

function IdeaProvider({ children }) {
  const [ideaState, dispatch] = useReducer(ideaReducer, [])
  const [httpState, dispatchHttp] = useReducer(httpReducer, {
    status: 'idle',
    error: null
  })
  // const [ideaState, setIdeaState] = useState([])
  // const [status, dispatchHttp]{ = useState(}'idle')
  // const [error, setError] = useState()

  const addIdeaHandler = useCallback((value, resetForm) => {
    dispatchHttp({ type: 'STARTED' })
    fetch(process.env.REACT_APP_DUMMY_BACKEND + '/ideas.json', {
      method: 'POST',
      body: JSON.stringify(value),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((response) => response.json())
      .then((responseData) => {
        // setIdeaState((prevIdeas) => [
        //   ...prevIdeas,
        //   { id: responseData.name, ...value }
        // ])

        dispatch({ type: 'ADD', idea: { id: responseData.name, ...value } })

        Swal.fire({
          title: `Yeay, ideas is submitted`,
          icon: 'success',
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        })

        resetForm({ value })
        dispatchHttp({ type: 'SUCCESS' })
      })
      .catch((error) => {
        dispatchHttp({ type: 'ERROR', errorMessage: error.message })
        // setError(error.message)
        Swal.fire({
          title: `Ooops, error happened!
        ${error.message}`,
          icon: 'error',
          showClass: {
            popup: 'animated fadeInDown faster'
          },
          hideClass: {
            popup: 'animated fadeOutUp faster'
          }
        })
      })
  }, [])

  const removeIdeaHandler = useCallback((id) => {
    dispatchHttp({ type: 'STARTED' })
    fetch(`${process.env.REACT_APP_DUMMY_BACKEND}/ideas/${id}.json`, {
      method: 'DELETE'
    })
      .then(() => {
        // setIdeaState((prevIdeas) => prevIdeas.filter((idea) => idea.id !== id))
        dispatch({ type: 'DELETE', id })
        dispatchHttp({ type: 'SUCCESS' })
      })
      .catch((error) => {
        // setError(error.message)
        dispatchHttp({ type: 'ERROR', errorMessage: error.message })
      })
  }, [])

  const filteredIdeaHandler = useCallback((value) => {
    dispatch({ type: 'SET', ideas: value })
    // setIdeaState(value)
  }, [])

  const statusHandler = () => {
    if (httpState.status === 'pending') {
      return <div>Loading your request...</div>
    }

    if (httpState.status === 'resolved') {
      return
    }

    if (httpState.status === 'rejected') {
      return (
        <div>
          <div>Oh no, there was a problem</div>
          <pre>{httpState.error}</pre>
        </div>
      )
    }
  }

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
