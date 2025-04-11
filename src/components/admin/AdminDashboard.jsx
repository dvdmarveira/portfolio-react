import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import AboutSection from "./sections/AboutSection";
import ExperienceSection from "./sections/ExperienceSection";
import ProjectsSection from "./sections/ProjectsSection";
import TechnologiesSection from "./sections/TechnologiesSection";

// Importando ícones para o tema
import lightIcon from "../../assets/imgs/theme_light.png";
import darkIcon from "../../assets/imgs/theme_dark.png";

export default function AdminDashboard() {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  
  // Estado para gerenciar o tema, lendo diretamente do localStorage
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });
  
  // Atualiza o estado do tema quando o localStorage mudar
  useEffect(() => {
    const handleStorageChange = () => {
      const currentTheme = localStorage.getItem("theme") || "light";
      setTheme(currentTheme);
    };
    
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);
  
  // Monitora mudanças no tema do documento
  useEffect(() => {
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === "theme") {
          const newTheme = document.body.getAttribute("theme") || "light";
          setTheme(newTheme);
        }
      });
    });
    
    observer.observe(document.body, { attributes: true });
    return () => observer.disconnect();
  }, []);

  // Função para alternar o tema
  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    
    // Aplicar tema ao corpo do documento
    if (newTheme === "dark") {
      document.body.setAttribute("theme", "dark");
    } else {
      document.body.removeAttribute("theme");
    }
    
    // Salvar tema no localStorage
    localStorage.setItem("theme", newTheme);
    
    // Atualizar estado local
    setTheme(newTheme);
  };

  async function handleLogout() {
    try {
      await logout();
      navigate("/login");
    } catch (error) {
      console.error("Erro ao fazer logout:", error);
    }
  }

  return (
    <div className="min-h-screen bg-[var(--background-color)]">
      <nav className="bg-[var(--primary-color-2)] shadow-lg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-bold text-[var(--secondary-color)]">
                Painel Administrativo
              </h1>
            </div>
            <div className="flex items-center">
              <span className="text-[var(--secondary-color-2)] mr-4">
                {currentUser?.email}
              </span>
              {/* Botão de alternância de tema */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-full bg-[var(--blue-light)] mr-4 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--blue-primary)]"
                aria-label={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
              >
                <img 
                  src={theme === "dark" ? lightIcon : darkIcon} 
                  alt={theme === "dark" ? "Ativar modo claro" : "Ativar modo escuro"}
                  className="w-5 h-5"
                />
              </button>
              <button
                onClick={handleLogout}
                className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sair
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="space-y-6 text-[var(--secondary-color)]">
            <AboutSection />
            <TechnologiesSection />
            <ExperienceSection />
            <ProjectsSection />
          </div>
        </div>
      </main>
    </div>
  );
}
