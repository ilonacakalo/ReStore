import { useEffect, useState } from "react";
import Header from "./Header";
import { Container, CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useAppDispatch } from "../store/configureStore";
import { fetchCurrentUser } from "../../features/account/accountSlice";

function App() {
  const dispatch = useAppDispatch();
  const [darkMode, setDarkMode] = useState<boolean>(() => {
    // Initialize dark mode state from localStorage or default to false
    const storedDarkMode = localStorage.getItem('darkMode');
    return storedDarkMode ? JSON.parse(storedDarkMode) : false;
  });

  useEffect(() => {
    // Fetch current user on component mount
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  useEffect(() => {
    // Store dark mode state in localStorage
    localStorage.setItem('darkMode', JSON.stringify(darkMode));
  }, [darkMode]);

  function handleThemeChange() {
    // Toggle dark mode state
    setDarkMode(prevDarkMode => !prevDarkMode);
  }

  const paletteMode = darkMode ? "dark" : "light";
  const theme = createTheme({
    palette: {
      mode: paletteMode,
      background: {
        default: paletteMode === "light" ? "#eaeaea" : "#121212"
      }
    }
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <ToastContainer position="bottom-right" hideProgressBar theme="colored" />
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
