import styled, { createGlobalStyle, css } from "styled-components";
import { normalize } from "styled-normalize"

export const GlobalStyles = createGlobalStyle`
  ${normalize}

  * {
    text-decoration: none;
    cursor: none;
  }

  html {
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    font-size: 16px;
  }

  body {
    font-size: 16px;
    font-family: 'Montserrat', 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${props => props.theme.background};
    overscroll-behavior: none;
    overflow-x: hidden;
  }

`


export const Container = styled.div`
  position: relative;

  flex-grow: 1;
  margin: 0 auto;
  padding: 0 32px;
  width: auto;
  height: 100%;

  @media (min-width: 1024px) {
    max-width: 960px;
  }
  @media (min-width: 1216px) {
    max-width: 1024px;
  }

  ${props => props.fluid && css`
    padding: 0;
    margin: 0;
    max-width: 100%;
  `}
`

export const Flex = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  ${props => props.spaceBetween && css`
    justify-content: space-between;
  `}
  ${props => props.flexEnd && css`
    justify-content: flex-end;
  `}
  ${props => props.alignTop && css`
    align-items: flex-start;
  `}
  ${props => props.noHeight && css`
    height: 0;
  `}
`

export const Cursor = styled.div`
  position: fixed;
  top: 400px;
  left: 400px;
  width: 30px;
  height: 30px;
  background: ${props => props.theme.red};
  border-radius: 100%;
  transform: translate(-50%, -50%);
  transition: all .1s ease-in-out;
  transition-property: width, height, border;
  will-change: width, height, transform, border;
  pointer-events: none;
  z-index: 999;

  &.hovered {
    background: transparent !important;
    width: 50px;
    height: 50px;
    border: 4px solid ${props => props.theme.red}
  }

  &.pointer {
    border: 4px solid ${props => props.theme.text} !important;
  }

  &.nav-open {
    background: ${props => props.theme.text}
  }

  &.locked {
    background: transparent !important;
    width: 50px;
    height: 50px;
    border: 4px solid ${props => props.theme.red};
    top: ${props => props.theme.top} !important;
    left: ${props => props.theme.left} !important;
  }
`
