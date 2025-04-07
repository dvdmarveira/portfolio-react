import { useState, useEffect } from "react";
import AOS from "aos";
import Navbar from "./components/layout/Navbar";
import Profile from "./components/sections/Profile";
import About from "./components/sections/About";
import Experience from "./components/sections/Experience";
import Projects from "./components/sections/Projects";
import Contact from "./components/sections/Contact";
import Footer from "./components/layout/Footer";

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
    <>
      <Navbar toggleTheme={toggleTheme} theme={theme} />
      <main>
        <Profile />
        <About theme={theme} />
        <Experience theme={theme} />
        <Projects theme={theme} />
        <Contact theme={theme} />
      </main>
      <Footer />
    </>
  );
}

export default App;
