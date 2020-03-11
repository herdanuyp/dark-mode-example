import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  background: ${({ theme }) => theme.colors.overlay};
  transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(-100%)')};
  height: 100%;
  width: 100%;
  text-align: left;
  padding: 1rem;
  position: fixed;
  top: 0;
  left: 0;
  transition: transform 0.3s ease-in-out;
  z-index: 1;

  a {
    font-size: 2rem;
    text-transform: uppercase;
    padding: 2rem 0;
    font-weight: bold;
    letter-spacing: 0.5rem;
    color: ${({ theme }) => theme.colors.primary};
    text-decoration: none;
    transition: color 0.3s linear;
    @media (max-width: ${({ theme }) => theme.mobile}) {
      font-size: 1.5rem;
      text-align: center;
    }
    &:hover {
      box-shadow: 3px 3px 4px 0px #92922e, -3px -3px 4px 0px #00adff59;
    }
  }
`

const OverlayMenu = ({ open, ...props }) => {
  const isHidden = open ? true : false
  const tabIndex = isHidden ? 0 : -1

  return (
    <StyledMenu open={open} aria-hidden={!isHidden} {...props}>
      <Link to='/' tabIndex={tabIndex}>
        <span aria-hidden='true'>🏠</span>
        dashboard
      </Link>
      <Link to='/start-share-idea-or-project' tabIndex={tabIndex}>
        <span aria-hidden='true'>💡</span>
        Share your briliant idea
      </Link>
    </StyledMenu>
  )
}

export default OverlayMenu
