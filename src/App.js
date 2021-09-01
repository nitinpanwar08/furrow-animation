import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from "styled-components"

import { GlobalStyles } from "./styles/globalStyles"
import { useGlobalStateContext, useGlobalDispatchContext } from "./context/globalContext"

import Header from "./components/header"
import CustomCursor from './components/customCursor'
import Home from './pages/home'
import NavBar from './components/navbar'
import { useState } from 'react'
import Footer from './components/footer'


function App() {
  const [toggleMenu, setToggleMenu] = useState(false)
  const [hamburgerPosition, setHamburgerPosition] = useState({
    x: 0,
    y: 0
  })

  const darkTheme = {
    background: "#000",
    text: "#fff",
    red: '#ea291e',
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`
  }

  const lightTheme = {
    background: "#fff",
    text: "#000",
    red: '#ea291e',
    left: `${hamburgerPosition.x}px`,
    top: `${hamburgerPosition.y}px`
  }

  const { currentTheme, cursorStyles } = useGlobalStateContext()
  const dispatch = useGlobalDispatchContext()

  const onCursor = cursorType => {
    cursorType = (cursorStyles.includes(cursorType) && cursorType) || false
    dispatch({
      type: 'CURSOR_TYPE',
      cursorType: cursorType
    })
  }

  return (
    <ThemeProvider theme={currentTheme === 'dark' ? darkTheme : lightTheme}>
      <GlobalStyles />
      <CustomCursor toggleMenu={toggleMenu} />
      <Router>
        <Header hamburgerPosition={hamburgerPosition} setHamburgerPosition={setHamburgerPosition} onCursor={onCursor} toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} />
        <NavBar toggleMenu={toggleMenu} setToggleMenu={setToggleMenu} onCursor={onCursor} />
        <main>
          <Home onCursor={onCursor} />
        </main>
        <Footer onCursor={onCursor} />
      </Router>
    </ThemeProvider>
  );
}

export default App;
