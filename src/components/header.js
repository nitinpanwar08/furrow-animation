import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'


import { HeaderNav, Logo, Menu } from '../styles/headerStyles'
import { Container, Flex } from '../styles/globalStyles'
import { useGlobalDispatchContext, useGlobalStateContext } from '../context/globalContext'
import useElementPosition from '../hooks/useElementPosition'

const Header = ({ hamburgerPosition, setHamburgerPosition, onCursor, setToggleMenu, toggleMenu }) => {
  const { currentTheme } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()
  const hamburger = useRef(null)
  const position = useElementPosition(hamburger)

  useEffect(() => {
    localStorage.setItem('theme', currentTheme)
  }, [currentTheme])

  const toggleTheme = () => {
    if (currentTheme === 'dark') {
      dispatch({
        type: 'TOGGLE_THEME',
        theme: 'light'
      })
    }
    if (currentTheme === 'light') {
      dispatch({
        type: 'TOGGLE_THEME',
        theme: 'dark'
      })
    }
  }

  const menuHover = () => {
    onCursor('locked')
    setHamburgerPosition({ x: position.x, y: position.y + 72 })
  }

  return (
    <HeaderNav
      animate={{ y: 0, opacity: 1 }}
      initial={{ y: -72, opacity: 0 }}
      transition={{ duration: 1, ease: [.6, 0.05, -0.01, 0.9] }}
    >
      <Container>
        <Flex spaceBetween noHeight>
          <Logo
            onMouseEnter={() => onCursor('hovered')}
            onMouseLeave={() => onCursor()}
          >
            <Link to='/'>FURR</Link>
            <span
              onClick={toggleTheme}
              onMouseEnter={() => onCursor('pointer')}
              onMouseLeave={() => onCursor()}
            ></span>
            <Link to='/'>W</Link>
          </Logo>
          <Menu
            ref={hamburger}
            onMouseLeave={() => onCursor()}
            onMouseEnter={menuHover}
            onClick={() => setToggleMenu(!toggleMenu)}
          >
            <button>
              <span></span>
              <span></span>
            </button>
          </Menu>
        </Flex>
      </Container>
    </HeaderNav>
  )
}

export default Header
