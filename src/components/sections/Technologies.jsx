import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";

// Importando os ícones estáticos
import htmlIcon from "../../assets/imgs/html.svg";
import cssIcon from "../../assets/imgs/css.svg";
import jsIcon from "../../assets/imgs/javascript.svg";
import tsIcon from "../../assets/imgs/typescript.svg";
import reactIcon from "../../assets/imgs/react.svg";
import nextjsIcon from "../../assets/imgs/nextjs.svg";
import nodejsIcon from "../../assets/imgs/nodejs.svg";
import pythonIcon from "../../assets/imgs/python.svg";
import csharpIcon from "../../assets/imgs/csharp.svg";
import mysqlIcon from "../../assets/imgs/mysql.svg";
import gitIcon from "../../assets/imgs/git.svg";
import dotnetIcon from "../../assets/imgs/dotnet.svg";
import tailwindIcon from "../../assets/imgs/tailwind.svg";
import firebaseIcon from "../../assets/imgs/firebase.svg";
import mongodbIcon from "../../assets/imgs/mongodb.svg";
import githubIcon from "../../assets/imgs/github.svg";
import linkedinIcon from "../../assets/imgs/linkedin.svg";
import arrowIcon from "../../assets/imgs/arrow.png";
import arrowDarkIcon from "../../assets/imgs/arrow_dark.png";

const Experience = ({ theme }) => {
  const [technologies, setTechnologies] = useState([]);
  const [loading, setLoading] = useState(true);

  // Função para obter o ícone correto baseado no nome da tecnologia
  const getIconByName = (tech) => {
    if (!tech || !tech.name) return null;

    // Normaliza o nome da tecnologia
    const techName = tech.name.toLowerCase().trim();

    // Mapeamento de nomes para ícones importados
    const iconMap = {
      // HTML
      html: htmlIcon,

      // CSS
      css: cssIcon,

      // JavaScript
      javascript: jsIcon,
      js: jsIcon,

      // TypeScript
      typescript: tsIcon,
      ts: tsIcon,

      // React
      react: reactIcon,
      reactjs: reactIcon,

      // Next.js
      nextjs: nextjsIcon,
      "next.js": nextjsIcon,
      next: nextjsIcon,

      // Node.js
      nodejs: nodejsIcon,
      "node.js": nodejsIcon,
      node: nodejsIcon,

      // Python
      python: pythonIcon,

      // C#
      csharp: csharpIcon,
      "c#": csharpIcon,

      // MySQL
      mysql: mysqlIcon,

      // Git
      git: gitIcon,

      // .NET
      dotnet: dotnetIcon,
      ".net": dotnetIcon,

      // Tailwind
      tailwind: tailwindIcon,
      tailwindcss: tailwindIcon,
      "tailwind css": tailwindIcon,

      // Firebase
      firebase: firebaseIcon,

      // MongoDB
      mongodb: mongodbIcon,
      mongo: mongodbIcon,

      // GitHub
      github: githubIcon,

      // LinkedIn
      linkedin: linkedinIcon,
    };

    // Retorna o ícone correspondente ou null se não encontrar
    return iconMap[techName] || null;
  };

  useEffect(() => {
    const fetchTechnologies = async () => {
      try {
        const techCollectionRef = collection(db, "technologies");
        const data = await getDocs(techCollectionRef);

        const techsData = data.docs.map((doc) => {
          const techData = doc.data();

          return {
            id: doc.id,
            ...techData,
          };
        });

        setTechnologies(techsData);
      } catch (error) {
        console.error("Erro ao carregar tecnologias:", error);
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
  return (
    <section
      id="experience"
      className="relative flex flex-col items-center justify-start min-h-screen px-4 pb-20"
    >
      <p className="section__text__p1">Maior afinidade com as demais</p>
      <h1 className="title text-5xl mb-8 md:mb-16">Tecnologias</h1>

      <div className="flex flex-col w-fit md:flex-row md:w-full max-w-6xl justify-center items-stretch gap-4 md:gap-12">
        {/* Frontend Card */}
        <div className="w-fit bg-[var(--primary-color-2)] dark:bg-[var(--primary-color-2)] p-8 rounded-3xl border-2 border-[var(--container-border)] shadow-sm">
          <h2 className="text-3xl font-medium mb-8 text-center">Frontend</h2>

          {loading ? (
            <div className="flex justify-center w-full py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--terciary-color)]"></div>
            </div>
          ) : frontendTechs.length > 0 ? (
            <div className="flex flex-row justify-center gap-16 w-[316px]">
              <div className="grid items-start gap-y-8">
                {frontendTechs
                  .slice(0, Math.ceil(frontendTechs.length / 2))
                  .map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-2 w-fit"
                    >
                      <div className="w-fit h-fit flex items-center justify-center">
                        <img
                          src={getIconByName(tech) || tech.logoUrl}
                          alt={`${tech.name} icon`}
                          className="h-7 w-7"
                          onError={(e) => {
                            console.error(
                              `Erro ao carregar ícone para ${tech.name}`
                            );
                            // Tenta identificar o ícone pelo alt text
                            const altText = e.target.alt.toLowerCase();
                            const techName = tech.name.toLowerCase();

                            // Verifica especificamente por tecnologias problemáticas
                            if (
                              techName.includes("firebase") ||
                              altText.includes("firebase")
                            ) {
                              e.target.src = firebaseIcon;
                            } else if (
                              techName.includes("mongodb") ||
                              altText.includes("mongodb") ||
                              techName.includes("mongo")
                            ) {
                              e.target.src = mongodbIcon;
                            } else if (
                              techName.includes("node") ||
                              altText.includes("node")
                            ) {
                              e.target.src = nodejsIcon;
                            } else if (tech.category === "frontend") {
                              e.target.src = reactIcon;
                            } else {
                              e.target.src = nodejsIcon;
                            }
                          }}
                        />
                      </div>
                      <h3 className="text-base text-[var(--terciary-color)] font-bold">
                        {tech.name}
                      </h3>
                    </div>
                  ))}
              </div>
              <div className="grid items-start gap-y-8">
                {frontendTechs
                  .slice(Math.ceil(frontendTechs.length / 2))
                  .map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-2 w-fit"
                    >
                      <div className="w-fit h-fit flex items-center justify-center">
                        <img
                          src={getIconByName(tech) || tech.logoUrl}
                          alt={`${tech.name} icon`}
                          className="h-7 w-7"
                          onError={(e) => {
                            console.error(
                              `Erro ao carregar ícone para ${tech.name}`
                            );
                            // Tenta identificar o ícone pelo alt text
                            const altText = e.target.alt.toLowerCase();
                            const techName = tech.name.toLowerCase();

                            // Verifica especificamente por tecnologias problemáticas
                            if (
                              techName.includes("firebase") ||
                              altText.includes("firebase")
                            ) {
                              e.target.src = firebaseIcon;
                            } else if (
                              techName.includes("mongodb") ||
                              altText.includes("mongodb") ||
                              techName.includes("mongo")
                            ) {
                              e.target.src = mongodbIcon;
                            } else if (
                              techName.includes("node") ||
                              altText.includes("node")
                            ) {
                              e.target.src = nodejsIcon;
                            } else if (tech.category === "frontend") {
                              e.target.src = reactIcon;
                            } else {
                              e.target.src = nodejsIcon;
                            }
                          }}
                        />
                      </div>
                      <h3 className="text-base text-[var(--terciary-color)] font-bold">
                        {tech.name}
                      </h3>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">
              Nenhuma tecnologia frontend cadastrada
            </p>
          )}
        </div>

        {/* Backend Card */}
        <div className="w-fit bg-[var(--primary-color-2)] dark:bg-[var(--primary-color-2)] p-8 rounded-3xl border-2 border-[var(--container-border)] shadow-sm">
          <h2 className="text-3xl font-medium mb-8 text-center">Backend</h2>

          {loading ? (
            <div className="flex justify-center w-full py-8">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-[var(--terciary-color)]"></div>
            </div>
          ) : backendTechs.length > 0 ? (
            <div className="flex flex-row justify-center gap-24 w-[316px]">
              <div className="grid items-start gap-y-8">
                {backendTechs
                  .slice(0, Math.ceil(backendTechs.length / 2))
                  .map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-2 w-fit"
                    >
                      <div className="w-fit h-fit flex items-center justify-center">
                        <img
                          src={getIconByName(tech) || tech.logoUrl}
                          alt={`${tech.name} icon`}
                          className="h-7 w-7"
                          onError={(e) => {
                            console.error(
                              `Erro ao carregar ícone para ${tech.name}`
                            );
                            // Tenta identificar o ícone pelo alt text
                            const altText = e.target.alt.toLowerCase();
                            const techName = tech.name.toLowerCase();

                            // Verifica especificamente por tecnologias problemáticas
                            if (
                              techName.includes("firebase") ||
                              altText.includes("firebase")
                            ) {
                              e.target.src = firebaseIcon;
                            } else if (
                              techName.includes("mongodb") ||
                              altText.includes("mongodb") ||
                              techName.includes("mongo")
                            ) {
                              e.target.src = mongodbIcon;
                            } else if (
                              techName.includes("node") ||
                              altText.includes("node")
                            ) {
                              e.target.src = nodejsIcon;
                            } else if (tech.category === "frontend") {
                              e.target.src = reactIcon;
                            } else {
                              e.target.src = nodejsIcon;
                            }
                          }}
                        />
                      </div>
                      <h3 className="text-base text-[var(--terciary-color)] font-bold">
                        {tech.name}
                      </h3>
                    </div>
                  ))}
              </div>
              <div className="grid items-start gap-y-8">
                {backendTechs
                  .slice(Math.ceil(backendTechs.length / 2))
                  .map((tech) => (
                    <div
                      key={tech.id}
                      className="flex items-center gap-2 w-fit"
                    >
                      <div className="w-fit h-fit flex items-center justify-center">
                        <img
                          src={getIconByName(tech) || tech.logoUrl}
                          alt={`${tech.name} icon`}
                          className="h-7 w-7"
                          onError={(e) => {
                            console.error(
                              `Erro ao carregar ícone para ${tech.name}`
                            );
                            // Tenta identificar o ícone pelo alt text
                            const altText = e.target.alt.toLowerCase();
                            const techName = tech.name.toLowerCase();

                            // Verifica especificamente por tecnologias problemáticas
                            if (
                              techName.includes("firebase") ||
                              altText.includes("firebase")
                            ) {
                              e.target.src = firebaseIcon;
                            } else if (
                              techName.includes("mongodb") ||
                              altText.includes("mongodb") ||
                              techName.includes("mongo")
                            ) {
                              e.target.src = mongodbIcon;
                            } else if (
                              techName.includes("node") ||
                              altText.includes("node")
                            ) {
                              e.target.src = nodejsIcon;
                            } else if (tech.category === "frontend") {
                              e.target.src = reactIcon;
                            } else {
                              e.target.src = nodejsIcon;
                            }
                          }}
                        />
                      </div>
                      <h3 className="text-base text-[var(--terciary-color)] font-bold">
                        {tech.name}
                      </h3>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <p className="text-center py-4 text-gray-500">
              Nenhuma tecnologia backend cadastrada
            </p>
          )}
        </div>
      </div>

      <Link
        to="projects"
        spy={true}
        smooth={true}
        // offset={-80}
        duration={500}
        className="hidden md:flex w-full justify-end md:mt-20 md:mr-28"
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

export default Experience;
