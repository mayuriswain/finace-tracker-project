import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Transaction from "./components/Transaction";
import { ThemeProvider, useTheme } from "./context/ThemeContext";
import "./App.css";
function App() {
  const Header = () => {
    const { darkMode, toggleTheme } = useTheme();
    return (
      <nav
        className={`navbar ${
          darkMode ? "navbar-dark bg-dark" : "navbar-light bg-light"
        } mb-3`}
      >
        <div className="container">
          <span className="navbar-brand">Personal Finance Tracker </span>
          <button className="btn btn-outline-secondary" onClick={toggleTheme}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
        </div>
      </nav>
    );
  };

  return (
    <ThemeProvider>
      <BrowserRouter>
    
        <Header />
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/transactions" element={<Transaction />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
