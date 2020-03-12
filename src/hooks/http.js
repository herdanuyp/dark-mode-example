import { useReducer, useCallback } from 'react'
import Swal from 'sweetalert2'

const initialState = {
  status: 'idle',
  error: null,
  data: null,
  helper: null,
  identifier: null
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

    case 'STARTED': {
      return {
        ...currentHttpState,
        status: 'pending',
        data: null,
        helper: null,
        identifier: action.identifier
      }
    }

    case 'SUCCESS': {
      return {
        ...currentHttpState,
        status: 'resolved',
        data: action.responseData,
        helper: action.helper
      }
    }

    case 'CLEAR':
      return initialState

    default: {
      throw new Error(`Unhandled HTTP action type: ${action.type}`)
    }
  }
}

const useHttp = () => {
  const [httpState, dispatchHttp] = useReducer(httpReducer, initialState)

  const sendRequest = useCallback(
    (url, method, body, reqHelper, identifier) => {
      console.log(url, method, body, reqHelper, identifier)
      dispatchHttp({ type: 'STARTED', identifier })
      fetch(url, {
        method,
        body,
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then((response) => response.json())
        .then((responseData) => {
          dispatchHttp({ type: 'SUCCESS', responseData, helper: reqHelper })

          Swal.fire({
            text: 'Your action is succeed',
            icon: 'success',
            showClass: {
              popup: 'animated fadeInDown faster'
            },
            hideClass: {
              popup: 'animated fadeOutUp faster'
            }
          })
        })
        .catch((error) => {
          dispatchHttp({ type: 'ERROR', errorMessage: error.message })

          Swal.fire({
            text: `Your action is failed, ${error.message}`,
            icon: 'error',
            showClass: {
              popup: 'animated fadeInDown faster'
            },
            hideClass: {
              popup: 'animated fadeOutUp faster'
            }
          }).then((result) => {
            if (result.value) {
              dispatchHttp({ type: 'CLEAR' })
            }
          })
        })
    },
    []
  )

  return {
    status: httpState.status,
    error: httpState.error,
    data: httpState.data,
    sendRequest,
    helper: httpState.helper,
    identifier: httpState.identifier
  }
}

export default useHttp
