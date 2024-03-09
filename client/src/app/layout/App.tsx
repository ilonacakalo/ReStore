import { useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";

function App() {
const [darkMode, setDarkMode] = useState(false);
const paleteType = darkMode ? "dark" : "light";
const theme = createTheme({
  palette: {
    mode: paleteType,
    background: {
      default: paleteType === "light" ? "#eaeaea" : "#121212"
    }
  }
})

function handleThemeChange() {
  setDarkMode(!darkMode);
}

  return (
    <>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Header darkMode={darkMode} handleThemeChange={handleThemeChange} />
      <Container>
      <Outlet />
      </Container>
    </ThemeProvider>
    </>
  );
}

export default App;
