import React, { createContext, useReducer, useContext } from 'react'

// Define the context
const GlobalStateContext = createContext()
const GlobalDispatchContext = createContext()

//  Reducer

const globalReducer = (state, action) => {
  switch (action.type) {
    case 'TOGGLE_THEME': {
      return {
        ...state,
        currentTheme: action.theme
      }
    }

    case 'CURSOR_TYPE': {
      return {
        ...state,
        cursorType: action.cursorType,
      }
    }

    default: {
      throw new Error('Unhandled action type')
    }
  }
}

// Provider 

export const GlobalProvider = ({ children }) => {
  const [state, dispatch] = useReducer(globalReducer, {
    currentTheme: localStorage.getItem('theme') || 'dark',
    cursorType: false,
    cursorStyles: ['pointer', 'hovered', 'locked']
  })

  return (
    <GlobalDispatchContext.Provider value={dispatch}>
      <GlobalStateContext.Provider value={state}>
        {children}
      </GlobalStateContext.Provider>
    </GlobalDispatchContext.Provider>
  )
}

// custom hook to use dispatch and state
export const useGlobalStateContext = () => useContext(GlobalStateContext)
export const useGlobalDispatchContext = () => useContext(GlobalDispatchContext)