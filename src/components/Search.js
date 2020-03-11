import React, { useState, useEffect, useRef } from 'react'
import { Label, Input } from '../assets/styles/main'

const Search = React.memo((props) => {
  const { onLoadingIdeas } = props
  const [enteredFilter, setEnteredFilter] = useState('')
  const inputRef = useRef()
  console.log('RENDERING SEARCH')

  useEffect(() => {
    const timer = setTimeout(() => {
      if (enteredFilter === inputRef.current.value) {
        const query =
          enteredFilter.length === 0
            ? ''
            : `?orderBy="idea"&startAt="${enteredFilter}"&endAt="${enteredFilter}\uf8ff"`

        fetch(process.env.REACT_APP_DUMMY_BACKEND + '/ideas.json' + query)
          .then((response) => response.json())
          .then((responseData) => {
            const loadedIdeas = []

            for (const key in responseData) {
              loadedIdeas.push({
                id: key,
                idea: responseData[key].idea,
                description: responseData[key].description,
                need: responseData[key].need
              })
            }

            onLoadingIdeas(loadedIdeas)
          })
          .catch((error) => console.log(error))
      }
    }, 500)

    return () => {
      clearTimeout(timer)
    }
  }, [enteredFilter, onLoadingIdeas, inputRef])

  const filterHandler = (event) => {
    setEnteredFilter(event.target.value)
  }

  return (
    <div>
      <Label htmlFor='search-input'>Search idea</Label>
      <Input
        type='text'
        value={enteredFilter}
        onChange={filterHandler}
        ref={inputRef}
      />
    </div>
  )
})

export default Search
