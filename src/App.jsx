import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { app, db } from "./services/firebase.js";
import { getDocs, collection } from "firebase/firestore";
import AOS from "aos";
import { AuthProvider } from "./contexts/AuthContext";
import PrivateRoute from "./components/auth/PrivateRoute";
import Login from "./components/auth/Login";
import AdminDashboard from "./components/admin/AdminDashboard";
import Navbar from "./components/layout/Navbar";
import Profile from "./components/sections/Profile";
import About from "./components/sections/About";
import Technologies from "./components/sections/Technologies";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";
import { initializeFirestoreData } from "./services/initializeFirestore";

function App() {
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme || "light";
  });

  useEffect(() => {
    // Inicializar AOS para animações
    AOS.init({
      duration: 600,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  }, []);

  useEffect(() => {
    // Aplicar tema ao corpo do documento
    if (theme === "dark") {
      document.body.setAttribute("theme", "dark");
    } else {
      document.body.removeAttribute("theme");
    }
    // Salvar tema no localStorage
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "dark" ? "light" : "dark"));
  };

  return (
    <Router>
      <AuthProvider>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route
            path="/admin"
            element={
              <PrivateRoute>
                <AdminDashboard />
              </PrivateRoute>
            }
          />
          <Route
            path="/"
            element={
              <>
                <Navbar toggleTheme={toggleTheme} theme={theme} />
                <main>
                  <Profile />
                  <About theme={theme} />
                  <Technologies theme={theme} />
                  <Projects theme={theme} />
                  <Contact theme={theme} />
                </main>
                <Footer />
              </>
            }
          />
        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;
