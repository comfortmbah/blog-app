export const initialTheme = {
  theme: localStorage.getItem("theme") || "light",
};

export function themeReducer(state, action) {
  switch (action.type) {
    case "TOGGLE_THEME": 
      return {
        ...state, 
        theme: state.theme === "light" ? "dark" : "light",
      }
    
    default:
      return state;
  }
}

