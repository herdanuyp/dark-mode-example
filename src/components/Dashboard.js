import React, { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

const OnePageContainer = styled.div`
  text-align: center;
  height: 100vh;
  background-image: linear-gradient(to top, #fad0c4 0%, #ffd1ff 100%);
  padding: 2rem;

  & h3 {
    margin: 0;
  }

  & span {
    height: 2px;
    width: 75%;
    border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
    display: block;
    margin: 2rem auto;
  }
`

function Dashboard() {
  return (
    <OnePageContainer>
      <h3>
        There are so many ideas out there, waiting to be explored with
        extraordinary people who have an optimistic sense to run it and succeed
        with those ideas.
      </h3>
      <span></span>
      <h3>
        Ada begitu banyak ide-ide di luar sana, menunggu untuk dieksplor dengan
        orang-orang yang luar biasa memiliki pandangan optimis untuk
        menjalankannya dan berhasil dengan ide-ide itu.
      </h3>
    </OnePageContainer>
  )
}

export default Dashboard
