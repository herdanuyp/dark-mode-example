import React, { useContext } from 'react'

import { IdeaContext } from '../../context/ideaStateProvider'

function Ideas() {
  const { ideaState, removeIdeaHandler } = useContext(IdeaContext)

  return (
    <ul>
      {ideaState &&
        ideaState.map((idea) => (
          <li key={idea.id} onClick={() => removeIdeaHandler(idea.id)}>
            <span>{idea.idea}</span>
            <br />
            <small>{idea.description}</small>
          </li>
        ))}
    </ul>
  )
}

const MemorizedIdeas = React.memo(Ideas)

export default MemorizedIdeas
