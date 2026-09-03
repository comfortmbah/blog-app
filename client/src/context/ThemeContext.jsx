import { createContext, useEffect, useReducer } from "react";
import PropTypes from 'prop-types'
import { initialTheme, themeReducer } from "../reducers/themeReducer";


export const ThemeContext = createContext();

function ThemeProvider({ children }) {
  const [state, dispatch] = useReducer(themeReducer, initialTheme);

  useEffect(() => {
    localStorage.setItem("theme", state.theme)

    document.documentElement.classList.toggle("dark", state.theme === "dark");

  }, [state.theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: state.theme,
        dispatch,
      }}
    >
      {children}
    </ThemeContext.Provider>
  )

}

ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};


export default ThemeProvider