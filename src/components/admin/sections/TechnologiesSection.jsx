import { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../services/firebase";

// Importando os ícones estáticos
import htmlIcon from "../../../assets/imgs/html.svg";
import cssIcon from "../../../assets/imgs/css.svg";
import jsIcon from "../../../assets/imgs/javascript.svg";
import tsIcon from "../../../assets/imgs/typescript.svg";
import reactIcon from "../../../assets/imgs/react.svg";
import nextjsIcon from "../../../assets/imgs/nextjs.svg";
import nodejsIcon from "../../../assets/imgs/nodejs.svg";
import pythonIcon from "../../../assets/imgs/python.svg";
import csharpIcon from "../../../assets/imgs/csharp.svg";
import mysqlIcon from "../../../assets/imgs/mysql.svg";
import gitIcon from "../../../assets/imgs/git.svg";
import dotnetIcon from "../../../assets/imgs/dotnet.svg";
import tailwindIcon from "../../../assets/imgs/tailwind.svg";
import firebaseIcon from "../../../assets/imgs/firebase.svg";
import mongodbIcon from "../../../assets/imgs/mongodb.svg";
import githubIcon from "../../../assets/imgs/github.svg";
import linkedinIcon from "../../../assets/imgs/linkedin.svg";

export default function TechnologiesSection() {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [isAddingFrontend, setIsAddingFrontend] = useState(false);
  const [isAddingBackend, setIsAddingBackend] = useState(false);
  const [newTech, setNewTech] = useState({
    name: "",
    category: "",
    logoUrl: "",
  });
  const fileInputRef = useRef(null);
  
  // Função para obter o ícone correto baseado no nome da tecnologia
  const getIconByName = (name) => {
    if (!name) return null;
    
    // Normaliza o nome da tecnologia
    const techName = name.toLowerCase().trim();
    
    // Mapeamento de nomes para ícones importados
    const iconMap = {
      // HTML
      "html": htmlIcon,
      
      // CSS
      "css": cssIcon,
      
      // JavaScript
      "javascript": jsIcon,
      "js": jsIcon,
      
      // TypeScript
      "typescript": tsIcon,
      "ts": tsIcon,
      
      // React
      "react": reactIcon,
      "reactjs": reactIcon,
      
      // Next.js
      "nextjs": nextjsIcon,
      "next.js": nextjsIcon,
      "next": nextjsIcon,
      
      // Node.js
      "nodejs": nodejsIcon,
      "node.js": nodejsIcon,
      "node": nodejsIcon,
      
      // Python
      "python": pythonIcon,
      
      // C#
      "csharp": csharpIcon,
      "c#": csharpIcon,
      
      // MySQL
      "mysql": mysqlIcon,
      
      // Git
      "git": gitIcon,
      
      // .NET
      "dotnet": dotnetIcon,
      ".net": dotnetIcon,
      
      // Tailwind
      "tailwind": tailwindIcon,
      "tailwindcss": tailwindIcon,
      "tailwind css": tailwindIcon,
      
      // Firebase
      "firebase": firebaseIcon,
      
      // MongoDB
      "mongodb": mongodbIcon,
      "mongo": mongodbIcon,
      
      // GitHub
      "github": githubIcon,
      
      // LinkedIn
      "linkedin": linkedinIcon
    };
    
    // Retorna o ícone correspondente ou null se não encontrar
    return iconMap[techName] || null;
  };

  // Busca as tecnologias do Firestore
  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const techCollectionRef = collection(db, "technologies");
        const data = await getDocs(techCollectionRef);

        const techsData = data.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setTechnologies(techsData);
      } catch (error) {
        console.error("Erro ao carregar tecnologias:", error);
        setError("Erro ao carregar tecnologias. Tente novamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchTechnologies();
  }, []);

  // Filtra as tecnologias por categoria
  const frontendTechs = technologies.filter(
    (tech) => tech.category === "frontend"
  );
  const backendTechs = technologies.filter(
    (tech) => tech.category === "backend"
  );

  // Adiciona uma nova tecnologia
  const handleAddTechnology = async (category) => {
    if (!newTech.name.trim()) {
      setError("Nome da tecnologia é obrigatório");
      return;
    }

    try {
      setError("");

      // Preparar dados para salvar
      const techName = newTech.name.trim();
      const techData = {
        name: techName,
        category: category,
        // Armazenamos o nome normalizado para uso consistente
        normalizedName: techName.toLowerCase().replace(/\s+/g, "").replace(".", ""),
        // Se um arquivo foi carregado, usamos o URL, caso contrário, deixamos vazio
        logoUrl: newTech.logoUrl || ""
      };
      
      // Para casos especiais, armazenamos o nome normalizado correto
      if (techName.toLowerCase() === "c#") {
        techData.normalizedName = "csharp";
      } else if (techName.toLowerCase() === "node.js") {
        techData.normalizedName = "nodejs";
      } else if (techName.toLowerCase() === "next.js") {
        techData.normalizedName = "nextjs";
      } else if (techName.toLowerCase() === ".net") {
        techData.normalizedName = "dotnet";
      } else if (techName.toLowerCase() === "tailwind") {
        techData.normalizedName = "tailwindcss";
      } else if (techName.toLowerCase() === "tailwind css") {
        techData.normalizedName = "tailwindcss";
      }

      // Adicionar ao Firestore
      const docRef = await addDoc(collection(db, "technologies"), techData);

      // Atualizar o estado
      setTechnologies([...technologies, { id: docRef.id, ...techData }]);

      // Reset do formulário
      setNewTech({ name: "", category: "", logoUrl: "" });
      setIsAddingFrontend(false);
      setIsAddingBackend(false);

      setSuccess(`Tecnologia ${techData.name} adicionada com sucesso!`);

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Erro ao adicionar tecnologia:", error);
      setError("Erro ao adicionar tecnologia. Tente novamente.");
    }
  };

  // Remove uma tecnologia
  const handleRemoveTechnology = async (id) => {
    try {
      setError("");

      // Remover do Firestore
      const techDocRef = doc(db, "technologies", id);
      await deleteDoc(techDocRef);

      // Atualizar o estado
      const updatedTechs = technologies.filter((tech) => tech.id !== id);
      setTechnologies(updatedTechs);

      setSuccess("Tecnologia removida com sucesso!");

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Erro ao remover tecnologia:", error);
      setError("Erro ao remover tecnologia. Tente novamente.");
    }
  };

  // Gerencia o upload de logo
  const handleFileUpload = (e) => {
    // Na versão atual, apenas armazenamos o caminho da logo
    // Em uma implementação completa, deveria fazer upload para Firebase Storage
    const file = e.target.files[0];
    if (file) {
      // Em uma implementação real, faríamos upload para o Firebase Storage
      // e obteríamos a URL. Por enquanto, apenas simulamos isso.
      
      // Criamos um objeto URL para o arquivo local (apenas para preview)
      const logoUrl = URL.createObjectURL(file);
      setNewTech({ ...newTech, logoUrl });
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="space-y-3">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Tecnologias
      </h2>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          {success}
        </div>
      )}

      {/* Seção Frontend */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Frontend
          </h3>
          {!isAddingFrontend ? (
            <button
              onClick={() => setIsAddingFrontend(true)}
              className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
            >
              Adicionar
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsAddingFrontend(false)}
                className="px-3 py-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none text-sm"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {isAddingFrontend && (
          <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="mb-3">
              <label
                htmlFor="frontend-tech-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Nome da Tecnologia
              </label>
              <input
                type="text"
                id="frontend-tech-name"
                value={newTech.name}
                onChange={(e) =>
                  setNewTech({ ...newTech, name: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="Ex: React"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="frontend-tech-logo"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Logo (SVG)
              </label>
              <input
                type="file"
                id="frontend-tech-logo"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".svg"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Se não fornecido, tentaremos usar /assets/icons/[nome].svg
              </p>
            </div>
            <button
              onClick={() => handleAddTechnology("frontend")}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Salvar
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {frontendTechs.length > 0 ? (
            frontendTechs.map((tech) => (
              <div
                key={tech.id}
                className="flex flex-col items-center p-3 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  <img
                    src={getIconByName(tech.name) || tech.logoUrl}
                    alt={`${tech.name} logo`}
                    className="max-w-full max-h-full"
                    onError={(e) => {
                      console.error(`Erro ao carregar ícone para ${tech.name}`);
                      // Tenta identificar o ícone pelo alt text
                      const altText = e.target.alt.toLowerCase();
                      const techName = tech.name.toLowerCase();
                      
                      // Verifica especificamente por tecnologias problemáticas
                      if (techName.includes('firebase') || altText.includes('firebase')) {
                        e.target.src = firebaseIcon;
                      } else if (techName.includes('mongodb') || altText.includes('mongodb') || techName.includes('mongo')) {
                        e.target.src = mongodbIcon;
                      } else if (techName.includes('node') || altText.includes('node')) {
                        e.target.src = nodejsIcon;
                      } else if (tech.category === "frontend") {
                        e.target.src = reactIcon;
                      } else {
                        e.target.src = nodejsIcon;
                      }
                    }}
                  />
                </div>
                <p className="text-center font-medium">{tech.name}</p>
                <button
                  onClick={() => handleRemoveTechnology(tech.id)}
                  className="mt-2 text-xs text-red-600 hover:text-red-800"
                >
                  Remover
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-gray-500 dark:text-gray-400">
              Nenhuma tecnologia frontend cadastrada
            </p>
          )}
        </div>
      </div>

      {/* Seção Backend */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white">
            Backend
          </h3>
          {!isAddingBackend ? (
            <button
              onClick={() => setIsAddingBackend(true)}
              className="px-3 py-1 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 text-sm"
            >
              Adicionar
            </button>
          ) : (
            <div className="flex space-x-2">
              <button
                onClick={() => setIsAddingBackend(false)}
                className="px-3 py-1 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none text-sm"
              >
                Cancelar
              </button>
            </div>
          )}
        </div>

        {isAddingBackend && (
          <div className="mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
            <div className="mb-3">
              <label
                htmlFor="backend-tech-name"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Nome da Tecnologia
              </label>
              <input
                type="text"
                id="backend-tech-name"
                value={newTech.name}
                onChange={(e) =>
                  setNewTech({ ...newTech, name: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="Ex: Node.js"
              />
            </div>
            <div className="mb-3">
              <label
                htmlFor="backend-tech-logo"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Logo (SVG)
              </label>
              <input
                type="file"
                id="backend-tech-logo"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept=".svg"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
              />
              <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                Se não fornecido, tentaremos usar /assets/icons/[nome].svg
              </p>
            </div>
            <button
              onClick={() => handleAddTechnology("backend")}
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Salvar
            </button>
          </div>
        )}

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {backendTechs.length > 0 ? (
            backendTechs.map((tech) => (
              <div
                key={tech.id}
                className="flex flex-col items-center p-3 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="w-12 h-12 flex items-center justify-center mb-2">
                  <img
                    src={getIconByName(tech.name) || tech.logoUrl}
                    alt={`${tech.name} logo`}
                    className="max-w-full max-h-full"
                    onError={(e) => {
                      console.error(`Erro ao carregar ícone para ${tech.name}`);
                      // Tenta identificar o ícone pelo alt text
                      const altText = e.target.alt.toLowerCase();
                      const techName = tech.name.toLowerCase();
                      
                      // Verifica especificamente por tecnologias problemáticas
                      if (techName.includes('firebase') || altText.includes('firebase')) {
                        e.target.src = firebaseIcon;
                      } else if (techName.includes('mongodb') || altText.includes('mongodb') || techName.includes('mongo')) {
                        e.target.src = mongodbIcon;
                      } else if (techName.includes('node') || altText.includes('node')) {
                        e.target.src = nodejsIcon;
                      } else if (tech.category === "frontend") {
                        e.target.src = reactIcon;
                      } else {
                        e.target.src = nodejsIcon;
                      }
                    }}
                  />
                </div>
                <p className="text-center font-medium">{tech.name}</p>
                <button
                  onClick={() => handleRemoveTechnology(tech.id)}
                  className="mt-2 text-xs text-red-600 hover:text-red-800"
                >
                  Remover
                </button>
              </div>
            ))
          ) : (
            <p className="col-span-3 text-gray-500 dark:text-gray-400">
              Nenhuma tecnologia backend cadastrada
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
