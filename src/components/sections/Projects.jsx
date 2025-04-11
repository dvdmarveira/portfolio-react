import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

// Importando imagens dos projetos originais
import enersiImg from "../../assets/imgs/enersi1.png";
import salaosenacImg from "../../assets/imgs/salaosenac1.png";
import recifenciaImg from "../../assets/imgs/recifencia1.png";

// Importando ícones para navegação
import arrowIcon from "../../assets/imgs/arrow.png";
import arrowDarkIcon from "../../assets/imgs/arrow_dark.png";
import arrowRight from "../../assets/imgs/arrowright.png";
import arrowRightDark from "../../assets/imgs/arrowright_dark.png";
import arrowLeft from "../../assets/imgs/arrowleft.png";
import arrowLeftDark from "../../assets/imgs/arrowleft_dark.png";

// Imagem de fallback para projetos sem imagem
import placeholderImg from "../../assets/imgs/placeholder-project.png";

const Projects = ({ theme }) => {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [current, setCurrent] = useState(0);

  // Função para obter a imagem correta para um projeto
  const getProjectImage = (projectName) => {
    if (!projectName) return placeholderImg;

    // Mapeamento de nomes de projetos para suas imagens
    const projectMap = {
      enersi: enersiImg,
      "salão senac": salaosenacImg,
      "salao senac": salaosenacImg,
      recifência: recifenciaImg,
      recifencia: recifenciaImg,
    };

    const normalizedName = projectName?.toLowerCase().trim();
    return projectMap[normalizedName] || placeholderImg;
  };

  // Projetos originais que serão mantidos
  const originalProjects = [
    {
      id: "original1",
      title: "Enersi",
      description:
        "Projeto desenvolvido com o propósito de conectar pessoas que desejam utilizar energia limpa a empresas parceiras que oferecem os seus serviços a preços acessíveis.",
      imageUrl: enersiImg,
      technologies: [],
      github: "https://www.github.com/dvdmarveira",
      figma:
        "https://www.figma.com/proto/cs5qXx8dpzrwS9h8DbBcBz/Untitled?node-id=0-1&p=f&t=t4M7lfAQyG7Nvd8z-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A65&show-proto-sidebar=1",
    },
    {
      id: "original2",
      title: "Salão Senac",
      description:
        "Plataforma para o salão de beleza do SENAC que integra agendamento online, registro detalhado de serviços, previsão de retorno e feedback dos clientes.",
      imageUrl: salaosenacImg,
      technologies: [],
      github: "https://www.github.com/dvdmarveira",
      figma: "https://www.figma.com/",
    },
    {
      id: "original3",
      title: "Recifência",
      description:
        "Plataforma com o propósito de impulsionar a arte local, oferecendo visibilidade aos artistas e conectando-os a possíveis contratantes, seja para eventos, shows etc.",
      imageUrl: recifenciaImg,
      technologies: [],
      github: "https://github.com/dvdmarveira/residencia-recifen",
      figma:
        "https://www.figma.com/proto/Fj6KUqp9yevh7zpptNmxbf/Untitled?node-id=0-1&p=f&t=P25MKdFODkksIkft-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=116%3A2&show-proto-sidebar=1",
    },
  ];

  // Buscar projetos do Firestore ao carregar o componente
  useEffect(() => {
    const fetchProjects = async () => {
      try {
        setLoading(true);
        const projectsCollectionRef = collection(db, "projects");
        const data = await getDocs(projectsCollectionRef);

        // Mapear os dados do Firestore
        const firestoreProjects = data.docs.map((doc) => {
          const projectData = doc.data();
          const projectTitle = projectData.title || "";

          // Verificar se é um dos projetos originais para usar a imagem correta
          let imageUrl = projectData.imageUrl || "";

          // Se não tiver URL ou a URL não for válida, usar a imagem baseada no título
          if (
            !imageUrl ||
            imageUrl.includes("blob:") ||
            imageUrl.includes("/src/assets/")
          ) {
            const projectImage = getProjectImage(projectTitle);
            if (projectImage) {
              imageUrl = projectImage;
            }
          }

          return {
            id: doc.id,
            ...projectData,
            imageUrl: imageUrl,
          };
        });

        // Criar uma cópia dos projetos originais para modificar
        const updatedOriginalProjects = [...originalProjects];

        // Atualizar os projetos originais com dados do Firestore (especialmente as tecnologias)
        firestoreProjects.forEach((firestoreProject) => {
          // Verificar se o projeto existe nos originais pelo título
          const originalIndex = updatedOriginalProjects.findIndex(
            (original) =>
              original.title.toLowerCase() ===
              firestoreProject.title.toLowerCase()
          );

          // Se encontrou um projeto original correspondente, atualizar suas tecnologias
          if (originalIndex !== -1) {
            // Garantir que technologies seja sempre um array
            let technologies = [];
            if (firestoreProject.technologies) {
              if (Array.isArray(firestoreProject.technologies)) {
                technologies = firestoreProject.technologies;
              } else if (typeof firestoreProject.technologies === "string") {
                technologies = firestoreProject.technologies
                  .split(",")
                  .map((tech) => tech.trim());
              }
            }

            // Atualizar as tecnologias do projeto original com as do Firestore
            updatedOriginalProjects[originalIndex].technologies = technologies;
          }
        });

        // Adicionar projetos do Firestore que não são duplicatas dos originais
        const combinedProjects = [...updatedOriginalProjects];
        firestoreProjects.forEach((firestoreProject) => {
          // Verificar se o projeto já existe nos originais pelo título
          const isDuplicate = updatedOriginalProjects.some(
            (original) =>
              original.title.toLowerCase() ===
              firestoreProject.title.toLowerCase()
          );

          if (!isDuplicate) {
            // Garantir que technologies seja sempre um array
            if (
              firestoreProject.technologies &&
              !Array.isArray(firestoreProject.technologies)
            ) {
              if (typeof firestoreProject.technologies === "string") {
                firestoreProject.technologies = firestoreProject.technologies
                  .split(",")
                  .map((tech) => tech.trim());
              } else {
                firestoreProject.technologies = [];
              }
            } else if (!firestoreProject.technologies) {
              firestoreProject.technologies = [];
            }
            combinedProjects.push(firestoreProject);
          }
        });

        setProjects(combinedProjects);
      } catch (error) {
        console.error("Erro ao carregar projetos:", error);
        setError(
          "Não foi possível carregar projetos adicionais. Exibindo apenas os projetos originais."
        );
        // Em caso de erro, usar apenas os projetos originais
        setProjects(originalProjects);
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center justify-start px-4 pb-20"
    >
      <p className="section__text__p1">Conheça alguns dos meus</p>
      <h1 className="title text-5xl mb-5 md:mb-10">Projetos</h1>

      {loading ? (
        <div className="w-full max-w-7xl flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900 dark:border-white"></div>
        </div>
      ) : error ? (
        <div className="w-full max-w-7xl text-center text-red-600 dark:text-red-400 mb-8">
          {error}
        </div>
      ) : null}

      <div className="w-full max-w-7xl">
        {/* Mobile Carrossel */}
        <div className="md:hidden relative w-full">
          <div className="flex justify-center items-center">
            {projects.map((project, index) => (
              <div
                key={index}
                className={`w-full transition-opacity duration-500 ${
                  index === current ? "block" : "hidden"
                }`}
              >
                <div className="bg-[var(--primary-color-2)] dark:bg-[var(--primary-color-2)] overflow-hidden rounded-3xl border border-transparent dark:border-[var(--container-border)] shadow-sm">
                  <div className="flex justify-center w-full overflow-hidden p-4">
                    <img
                      src={
                        typeof project.imageUrl === "string" &&
                        project.imageUrl.startsWith("http")
                          ? project.imageUrl
                          : project.imageUrl || getProjectImage(project.title)
                      }
                      alt={project.title}
                      className="w-auto h-40 rounded-2xl object-contain"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = placeholderImg;
                      }}
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-medium mb-3 text-center">
                      {project.title}
                    </h2>
                    <p className="text-sm text-[var(--secondary-color-2)] dark:text-[var(--secondary-color)] mb-4">
                      {project.description}
                    </p>

                    {/* Exibindo as tecnologias como tags */}
                    {project.technologies &&
                      project.technologies.length > 0 && (
                        <div className="flex flex-wrap justify-center gap-2 mb-4">
                          {project.technologies.map((tech, index) => (
                            <span
                              key={index}
                              className="px-2 py-1 bg-[var(--blue-light)] dark:bg-[var(--blue-light)] text-[var(--blue-primary)] dark:text-[var(--blue-primary)] rounded-full text-xs font-medium shadow-sm"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}

                    <div className="flex justify-center gap-4">
                      {project.github && (
                        <a
                          href={project.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-transparent border-2 border-gray-300 dark:border-[var(--container-border)] rounded-xl text-[var(--secondary-color-2)] dark:text-[var(--secondary-color)] text-sm font-bold hover:bg-gray-500
                  hover:text-white hover:border-transparent dark:hover:bg-gray-800 transition-colors"
                        >
                          Github
                        </a>
                      )}
                      {project.figma && (
                        <a
                          href={project.figma}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="px-6 py-2 bg-transparent border-2 border-gray-300 dark:border-[var(--container-border)] rounded-xl text-[var(--secondary-color-2)] dark:text-[var(--secondary-color)] text-sm font-bold hover:bg-gray-500
                  hover:text-white hover:border-transparent dark:hover:bg-gray-800 transition-colors"
                        >
                          Figma
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão para passar o slide */}
          <button
            onClick={previousSlide}
            className="absolute top-40 left-2 transform -translate-y-1/2 bg-[var(--primary-color-2)] dark:bg-[var(--primary-color-2)] p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <img
              src={theme === "dark" ? arrowLeftDark : arrowLeft}
              alt="Previous"
              className="w-5 h-5"
            />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-40 right-2 transform -translate-y-1/2 bg-[var(--primary-color-2)] dark:bg-[var(--primary-color-2)] p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <img
              src={theme === "dark" ? arrowRightDark : arrowRight}
              alt="Next"
              className="w-5 h-5"
            />
          </button>
        </div>

        {/* Grid normal para telas maiores */}
        <div className="hidden md:grid md:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <div
              key={index}
              className="bg-[var(--primary-color-2)] dark:bg-[var(--primary-color-2)] overflow-hidden rounded-3xl border border-transparent dark:border-[var(--container-border)] shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-center w-full overflow-hidden p-4">
                <img
                  src={
                    typeof project.imageUrl === "string" &&
                    project.imageUrl.startsWith("http")
                      ? project.imageUrl
                      : project.imageUrl || getProjectImage(project.title)
                  }
                  alt={project.title}
                  className="w-auto h-40 rounded-2xl object-contain"
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = placeholderImg;
                  }}
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-medium mb-3 text-center">
                  {project.title}
                </h2>
                <p className="text-sm text-[var(--secondary-color-2)] dark:text-[var(--secondary-color)] mb-4">
                  {project.description}
                </p>

                {/* Exibindo as tecnologias como tags */}
                {project.technologies && project.technologies.length > 0 && (
                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {project.technologies.map((tech, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[var(--blue-light)] dark:bg-[var(--blue-light)] text-[var(--blue-primary)] dark:text-[var(--blue-primary)] rounded-full text-xs font-medium shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                )}

                <div className="flex justify-center gap-4">
                  {project.github && (
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-transparent border-2 border-gray-300 dark:border-[var(--container-border)] rounded-xl text-[var(--secondary-color-2)] dark:text-[var(--secondary-color)] text-sm font-bold hover:bg-gray-500
              hover:text-white hover:border-transparent dark:hover:bg-gray-800 transition-colors"
                    >
                      Github
                    </a>
                  )}
                  {project.figma && (
                    <a
                      href={project.figma}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-transparent border-2 border-gray-300 dark:border-[var(--container-border)] rounded-xl text-[var(--secondary-color-2)] dark:text-[var(--secondary-color)] text-sm font-bold hover:bg-gray-500
              hover:text-white hover:border-transparent dark:hover:bg-gray-800 transition-colors"
                    >
                      Figma
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Link
        to="contact"
        spy={true}
        smooth={true}
        // offset={-80}
        duration={500}
        className="hidden md:flex w-full justify-end mt-5 mb-5 md:mr-28"
      >
        <img
          src={theme === "dark" ? arrowDarkIcon : arrowIcon}
          alt="Arrow icon"
          className="icon arrow w-6 h-6 cursor-pointer"
        />
      </Link>
    </section>
  );
};

export default Projects;
