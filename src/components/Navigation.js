import React, { useContext } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { ThemeContext } from '../context/darkModeProvider'
import ToggleTheme from './Toogle'
import Burger from './StyledBurger'
import OverlayMenu from './OverlayMenu'

const NavbarWrapper = styled.nav`
  display: grid;
  grid: auto-flow / 100px 1fr 100px;
  grid-template-areas: 'logo nav darkMode';
`

const NavLinks = styled.ul`
  grid-area: nav;
  place-self: center end;
  padding: 0;
  list-style-type: none;
  width: 120px;
  margin-right: 20px;

  & li {
    &:after {
      content: '';
      display: block;
      border-bottom: 2px solid ${({ theme }) => theme.colors.primary};
      width: 0;
      transition: 1s ease;
    }

    &:hover:after {
      width: 100%;
    }
  }
`

function Navbar({ children }) {
  const [open, setOpen] = React.useState(false)
  const menuId = 'main-menu'
  const [isSmallScreen, setIsSmallScreen] = React.useState(false)
  const { theme, toggleTheme, componentMounted } = useContext(ThemeContext)

  React.useEffect(() => {
    const mediaQuery = window.matchMedia('(max-width: 768px)')
    mediaQuery.addListener(handleMediaQueryChange)
    handleMediaQueryChange(mediaQuery)

    return () => {
      mediaQuery.removeListener(handleMediaQueryChange)
    }
  }, [])

  const handleMediaQueryChange = (mediaQuery) => {
    if (mediaQuery.matches) {
      setIsSmallScreen(true)
    } else {
      setIsSmallScreen(false)
    }
  }

  if (!componentMounted) return <div />

  return (
    <NavbarWrapper>
      <Burger open={open} setOpen={setOpen} aria-controls={menuId} />
      <OverlayMenu open={open} setOpen={setOpen} id={menuId} />

      <NavLinks>
        <li>
          <Link to='/start-share-idea-or-project'>Share your idea</Link>
        </li>
      </NavLinks>
      <ToggleTheme toggleTheme={toggleTheme} theme={theme} />
    </NavbarWrapper>
  )
}

export default Navbar
