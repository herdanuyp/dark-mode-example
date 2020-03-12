import React from 'react'
import styled from 'styled-components'

import { ReactComponent as Moon } from '../assets/svg/wolf.svg'
import { ReactComponent as Sun } from '../assets/svg/beach.svg'

const ToggleContainer = styled.button`
  grid-area: darkMode;
  place-self: center end;
  background: ${({ theme }) => theme.gradient};
  border: 2px solid ${({ theme }) => theme.toggleBorder};
  border-radius: 30px;
  cursor: pointer;
  display: flex;
  font-size: 0.5rem;
  justify-content: space-between;
  margin-left: auto;
  margin-right: 15px;
  overflow: hidden;
  padding: 0.2rem;
  position: relative;
  width: 4rem;
  height: 2rem;

  svg {
    height: auto;
    width: 1.2rem;
    transition: all 0.3s linear;

    &:first-child {
      transform: ${({ lightTheme }) =>
        lightTheme ? 'translateY(0)' : 'translateY(100px)'};
    }

    &:nth-child(2) {
      transform: ${({ lightTheme }) =>
        lightTheme ? 'translateY(-100px)' : 'translateY(0)'};
    }
  }
`

function ToogleTheme({ theme, toggleTheme }) {
  const isLight = theme === 'light'

  return (
    <ToggleContainer lightTheme={isLight} onClick={toggleTheme}>
      <Sun />
      <Moon />
    </ToggleContainer>
  )
}

export default ToogleTheme
