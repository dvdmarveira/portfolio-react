import { useState, useEffect, useRef } from "react";
import {
  collection,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../../services/firebase";

// Importando imagens dos projetos originais para referência
import enersiImg from "../../../assets/imgs/enersi1.png";
import salaosenacImg from "../../../assets/imgs/salaosenac1.png";
import recifenciaImg from "../../../assets/imgs/recifencia1.png";
import placeholderImg from "../../../assets/imgs/placeholder-project.png";

// Importando utilitários para manipulação de arquivos
import { createObjectURL } from "../../../utils/fileUtils";

// Função para obter a imagem correta para um projeto
const getProjectImage = (projectName) => {
  if (!projectName) return placeholderImg;
  
  // Mapeamento de nomes de projetos para suas imagens
  const projectMap = {
    "enersi": enersiImg,
    "salão senac": salaosenacImg,
    "salao senac": salaosenacImg,
    "recifência": recifenciaImg,
    "recifencia": recifenciaImg,
  };
  
  const normalizedName = projectName?.toLowerCase().trim();
  return projectMap[normalizedName] || placeholderImg;
};

export default function ProjectsSection() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  
  // Estados para adição/edição de projetos
  const [isAddingProject, setIsAddingProject] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editingProject, setEditingProject] = useState(null);
  
  // Estado para novo projeto
  const [newProject, setNewProject] = useState({
    title: "",
    description: "",
    imageUrl: "",
    technologies: "",
    github: "",
    figma: "",
  });
  
  const fileInputRef = useRef(null);

  useEffect(() => {
    fetchProjects();
  }, []);
  
  // Busca os projetos do Firestore
  const fetchProjects = async () => {
    setLoading(true);
    try {
      const projectsCollectionRef = collection(db, "projects");
      const data = await getDocs(projectsCollectionRef);

      const projectsData = data.docs.map((doc) => {
        const projectData = doc.data();
        const projectTitle = projectData.title || "";
        
        // Verificar se é um dos projetos originais para usar a imagem correta
        let imageUrl = projectData.imageUrl || "";
        
        // Se não tiver URL ou a URL não for válida, usar a imagem baseada no título
        if (!imageUrl || imageUrl.includes("blob:") || imageUrl.includes("/src/assets/")) {
          const projectImage = getProjectImage(projectTitle);
          if (projectImage) {
            imageUrl = projectImage;
          }
        }
        
        return {
          id: doc.id,
          ...projectData,
          imageUrl: imageUrl
        };
      });

      setProjects(projectsData);
    } catch (error) {
      console.error("Erro ao carregar projetos:", error);
      setError("Erro ao carregar projetos. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  // Gerencia o upload de imagem
  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Criamos um objeto URL para o arquivo local (apenas para preview)
      const imageUrl = URL.createObjectURL(file);
      
      // Em uma implementação real, faríamos upload para o Firebase Storage
      // Por enquanto, usamos o URL local para preview
      
      if (isEditing) {
        setEditingProject({ 
          ...editingProject, 
          imageUrl, 
          imageFile: file,
          // Armazenamos o nome do arquivo para referência
          imageName: file.name
        });
      } else {
        setNewProject({ 
          ...newProject, 
          imageUrl, 
          imageFile: file,
          // Armazenamos o nome do arquivo para referência
          imageName: file.name
        });
      }
    }
  };
  
  // Adiciona um novo projeto
  const handleAddProject = async () => {
    if (!newProject.title.trim()) {
      setError("Título do projeto é obrigatório");
      return;
    }

    try {
      setError("");

      // Preparar dados para salvar
      // Aqui estamos usando uma URL estática para o placeholder caso não haja imagem
      // Em uma implementação real, faríamos upload para o Firebase Storage
      const projectData = {
        title: newProject.title.trim(),
        description: newProject.description.trim(),
        // Usamos a imagem estática importada para os projetos conhecidos
        // Em um ambiente real, você faria upload para o Firebase Storage e usaria a URL retornada
        imageUrl: getProjectImage(newProject.title.trim()),
        imageName: newProject.imageName || "",
        // Processando as tecnologias: dividindo a string por vírgulas e removendo espaços em branco
        technologies: newProject.technologies ? newProject.technologies.split(',').map(tech => tech.trim()) : [],
        github: newProject.github || "",
        figma: newProject.figma || "",
        createdAt: new Date().toISOString(),
      };

      // Adicionar ao Firestore
      const docRef = await addDoc(collection(db, "projects"), projectData);

      // Atualizar o estado
      setProjects([...projects, { id: docRef.id, ...projectData }]);

      // Reset do formulário
      setNewProject({
        title: "",
        description: "",
        imageUrl: "",
        technologies: "",
        github: "",
        figma: "",
      });
      setIsAddingProject(false);

      setSuccess(`Projeto ${projectData.title} adicionado com sucesso!`);

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Erro ao adicionar projeto:", error);
      setError("Erro ao adicionar projeto. Tente novamente.");
    }
  };
  
  // Inicia a edição de um projeto
  const handleEdit = (project) => {
    // Guardamos a URL original da imagem para caso o usuário cancele a edição
    setEditingProject({
      ...project,
      originalImageUrl: project.imageUrl
    });
    setIsEditing(true);
  };
  
  // Cancela a edição
  const handleCancelEdit = () => {
    setEditingProject(null);
    setIsEditing(false);
  };
  
  // Salva as alterações de um projeto
  const handleUpdateProject = async () => {
    if (!editingProject || !editingProject.id) {
      setError("Projeto não encontrado");
      return;
    }

    if (!editingProject.title.trim()) {
      setError("Título do projeto é obrigatório");
      return;
    }

    try {
      setError("");

      // Processar tecnologias
      let technologies = [];
      if (editingProject.technologies) {
        if (typeof editingProject.technologies === 'string') {
          technologies = editingProject.technologies.split(',').map(tech => tech.trim()).filter(tech => tech);
        } else if (Array.isArray(editingProject.technologies)) {
          technologies = editingProject.technologies;
        }
      }

      // Preparar dados para atualizar
      const projectData = {
        title: editingProject.title.trim(),
        description: editingProject.description.trim(),
        // Usamos a imagem estática importada para os projetos conhecidos
        // Em um ambiente real, você faria upload para o Firebase Storage e usaria a URL retornada
        imageUrl: getProjectImage(editingProject.title.trim()),
        imageName: editingProject.imageName || "",
        technologies: technologies,
        github: editingProject.github || "",
        figma: editingProject.figma || "",
        updatedAt: new Date().toISOString(),
      };

      // Atualizar no Firestore
      const projectDocRef = doc(db, "projects", editingProject.id);
      await updateDoc(projectDocRef, projectData);

      // Atualizar o estado
      const updatedProjects = projects.map((project) =>
        project.id === editingProject.id
          ? { ...project, ...projectData }
          : project
      );
      setProjects(updatedProjects);

      // Reset do formulário
      setEditingProject(null);
      setIsEditing(false);

      setSuccess("Projeto atualizado com sucesso!");

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Erro ao atualizar projeto:", error);
      setError("Erro ao atualizar projeto. Tente novamente.");
    }
  };
  
  // Remove um projeto
  const handleDeleteProject = async (id) => {
    if (!window.confirm("Tem certeza que deseja excluir este projeto?")) {
      return;
    }
    
    try {
      setError("");

      // Remover do Firestore
      const projectDocRef = doc(db, "projects", id);
      await deleteDoc(projectDocRef);

      // Atualizar o estado
      const updatedProjects = projects.filter((project) => project.id !== id);
      setProjects(updatedProjects);

      setSuccess("Projeto removido com sucesso!");

      // Limpar mensagem de sucesso após 3 segundos
      setTimeout(() => setSuccess(""), 3000);
    } catch (error) {
      console.error("Erro ao remover projeto:", error);
      setError("Erro ao remover projeto. Tente novamente.");
    }
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/4"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {[1, 2].map((i) => (
              <div key={i} className="space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 shadow rounded-lg p-6">
      {/* Cabeçalho da seção */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Projetos
        </h2>
        {!isAddingProject && !isEditing && (
          <button
            onClick={() => setIsAddingProject(true)}
            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Adicionar Projeto
          </button>
        )}
      </div>

      {/* Mensagens de erro e sucesso */}
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

      {/* Formulário para adicionar novo projeto */}
      {isAddingProject && (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Adicionar Novo Projeto
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="project-title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Título *
              </label>
              <input
                type="text"
                id="project-title"
                value={newProject.title}
                onChange={(e) =>
                  setNewProject({ ...newProject, title: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="Ex: Meu Projeto"
                required
              />
            </div>

            <div>
              <label
                htmlFor="project-description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Descrição *
              </label>
              <textarea
                id="project-description"
                value={newProject.description}
                onChange={(e) =>
                  setNewProject({ ...newProject, description: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                rows="3"
                placeholder="Descreva seu projeto"
                required
              />
            </div>

            <div>
              <label
                htmlFor="project-image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Imagem do Projeto
              </label>
              <input
                type="file"
                id="project-image"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
              />
              <div className="mt-2">
                <img
                  src={newProject.imageUrl || getProjectImage(newProject.title) || placeholderImg}
                  alt="Preview"
                  className="h-32 w-auto object-contain rounded border border-gray-200 p-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImg;
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {newProject.imageName || "Nenhuma imagem selecionada. Imagem padrão será usada."}
                </p>
              </div>
            </div>
            
            <div>
              <label
                htmlFor="project-technologies"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Tecnologias (separadas por vírgula)
              </label>
              <input
                type="text"
                id="project-technologies"
                value={newProject.technologies}
                onChange={(e) =>
                  setNewProject({ ...newProject, technologies: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="React, Node.js, Firebase, etc."
              />
            </div>

            <div>
              <label
                htmlFor="project-github"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Link do GitHub
              </label>
              <input
                type="url"
                id="project-github"
                value={newProject.github}
                onChange={(e) =>
                  setNewProject({ ...newProject, github: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="https://github.com/seu-usuario/seu-projeto"
              />
            </div>

            <div>
              <label
                htmlFor="project-figma"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Link do Figma
              </label>
              <input
                type="url"
                id="project-figma"
                value={newProject.figma}
                onChange={(e) =>
                  setNewProject({ ...newProject, figma: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="https://figma.com/file/..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsAddingProject(false)}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                onClick={handleAddProject}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Formulário para editar projeto existente */}
      {isEditing && editingProject && (
        <div className="mb-6 p-4 border border-gray-200 dark:border-gray-700 rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-4">
            Editar Projeto: {editingProject.title}
          </h3>
          <div className="space-y-4">
            <div>
              <label
                htmlFor="edit-project-title"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Título *
              </label>
              <input
                type="text"
                id="edit-project-title"
                value={editingProject.title}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, title: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="Ex: Meu Projeto"
                required
              />
            </div>

            <div>
              <label
                htmlFor="edit-project-description"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Descrição *
              </label>
              <textarea
                id="edit-project-description"
                value={editingProject.description}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, description: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                rows="3"
                placeholder="Descreva seu projeto"
                required
              />
            </div>
            
            <div>
              <label
                htmlFor="edit-project-technologies"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Tecnologias (separadas por vírgula)
              </label>
              <input
                type="text"
                id="edit-project-technologies"
                value={typeof editingProject.technologies === 'string' ? 
                  editingProject.technologies : 
                  (Array.isArray(editingProject.technologies) ? 
                    editingProject.technologies.join(', ') : '')}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, technologies: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="React, Node.js, Firebase, etc."
              />
            </div>

            <div>
              <label
                htmlFor="edit-project-image"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Imagem do Projeto
              </label>
              <input
                type="file"
                id="edit-project-image"
                ref={fileInputRef}
                onChange={handleFileUpload}
                accept="image/*"
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
              />
              <div className="mt-2">
                <img
                  src={editingProject.imageUrl || getProjectImage(editingProject.title) || placeholderImg}
                  alt="Preview"
                  className="h-32 w-auto object-contain rounded border border-gray-200 p-2"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImg;
                  }}
                />
                <p className="text-xs text-gray-500 mt-1">
                  {editingProject.imageName || "Imagem atual do projeto"}
                </p>
              </div>
            </div>

            <div>
              <label
                htmlFor="edit-project-github"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Link do GitHub
              </label>
              <input
                type="url"
                id="edit-project-github"
                value={editingProject.github}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, github: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="https://github.com/seu-usuario/seu-projeto"
              />
            </div>

            <div>
              <label
                htmlFor="edit-project-figma"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Link do Figma
              </label>
              <input
                type="url"
                id="edit-project-figma"
                value={editingProject.figma}
                onChange={(e) =>
                  setEditingProject({ ...editingProject, figma: e.target.value })
                }
                className="px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:text-white w-full"
                placeholder="https://figma.com/file/..."
              />
            </div>

            <div className="flex justify-end space-x-3">
              <button
                onClick={handleCancelEdit}
                className="px-4 py-2 bg-gray-200 text-gray-800 dark:bg-gray-700 dark:text-gray-200 rounded-md hover:bg-gray-300 dark:hover:bg-gray-600 focus:outline-none"
              >
                Cancelar
              </button>
              <button
                onClick={handleUpdateProject}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
              >
                Atualizar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Lista de projetos */}
      {!isAddingProject && !isEditing && (
        <div>
          {projects.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <div
                  key={project.id}
                  className="border rounded-lg p-4 hover:shadow-md transition-shadow"
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <img
                      src={typeof project.imageUrl === 'string' && project.imageUrl.startsWith('http') 
                        ? project.imageUrl 
                        : getProjectImage(project.title)}
                      alt={project.title}
                      className="w-16 h-16 object-contain rounded"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImg;
                      }}
                    />
                  </div>
                  <p className="text-gray-600 dark:text-gray-300 mb-3">
                    {project.description}
                  </p>
                  
                  {/* Exibindo as tecnologias como tags */}
                  {project.technologies && project.technologies.length > 0 && (
                    <div className="mb-3 flex flex-wrap gap-2">
                      {project.technologies.map((tech, index) => (
                        <span 
                          key={index} 
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-full text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  )}
                  
                  <div className="flex flex-wrap gap-2 mb-3">
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm"
                      >
                        GitHub
                      </a>
                    )}
                    {project.figma && (
                      <a
                        href={project.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-indigo-600 dark:text-indigo-400 hover:underline text-sm ml-4"
                      >
                        Figma
                      </a>
                    )}
                  </div>
                  <div className="flex mt-4 space-x-2">
                    <button
                      onClick={() => handleEdit(project)}
                      className="px-3 py-1 bg-indigo-100 text-indigo-700 dark:bg-indigo-900 dark:text-indigo-200 rounded-md hover:bg-indigo-200 dark:hover:bg-indigo-800 text-sm"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleDeleteProject(project.id)}
                      className="px-3 py-1 bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-200 rounded-md hover:bg-red-200 dark:hover:bg-red-800 text-sm"
                    >
                      Excluir
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400">
              Nenhum projeto cadastrado
            </p>
          )}
        </div>
      )}
    </div>
  );
}
