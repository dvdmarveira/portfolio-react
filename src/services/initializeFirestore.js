import { db } from "./firebase";
import { collection, addDoc, getDocs } from "firebase/firestore";

// Função para verificar se uma coleção já tem documentos
async function hasDocuments(collectionName) {
  const querySnapshot = await getDocs(collection(db, collectionName));
  return !querySnapshot.empty;
}

// Função para inicializar os dados
export async function initializeFirestoreData() {
  try {
    // Inicializar dados do "Sobre"
    if (!(await hasDocuments("about"))) {
      await addDoc(collection(db, "about"), {
        description:
          "Desenvolvedor Full Stack apaixonado por criar soluções inovadoras e experiências digitais excepcionais.",
        skills: [
          "React",
          "Node.js",
          "JavaScript",
          "TypeScript",
          "Firebase",
          "TailwindCSS",
        ],
      });
      console.log('Dados do "Sobre" inicializados com sucesso');
    }

    // Inicializar dados de tecnologias
    if (!(await hasDocuments("technologies"))) {
      // Tecnologias Frontend
      const frontendTechnologies = [
        {
          name: "HTML",
          category: "frontend",
          logoUrl: "/assets/icons/html.svg",
        },
        { name: "CSS", category: "frontend", logoUrl: "/assets/icons/css.svg" },
        {
          name: "JavaScript",
          category: "frontend",
          logoUrl: "/assets/icons/javascript.svg",
        },
        {
          name: "TypeScript",
          category: "frontend",
          logoUrl: "/assets/icons/typescript.svg",
        },
        {
          name: "React",
          category: "frontend",
          logoUrl: "/assets/icons/react.svg",
        },
        {
          name: "NextJS",
          category: "frontend",
          logoUrl: "/assets/icons/nextjs.svg",
        },
      ];

      // Tecnologias Backend
      const backendTechnologies = [
        {
          name: "NodeJS",
          category: "backend",
          logoUrl: "/assets/icons/nodejs.svg",
        },
        {
          name: "MySQL",
          category: "backend",
          logoUrl: "/assets/icons/mysql.svg",
        },
        {
          name: "Python",
          category: "backend",
          logoUrl: "/assets/icons/python.svg",
        },
        { name: "Git", category: "backend", logoUrl: "/assets/icons/git.svg" },
        {
          name: "C#",
          category: "backend",
          logoUrl: "/assets/icons/csharp.svg",
        },
        {
          name: ".NET",
          category: "backend",
          logoUrl: "/assets/icons/dotnet.svg",
        },
      ];

      // Adicionar tecnologias frontend
      for (const tech of frontendTechnologies) {
        await addDoc(collection(db, "technologies"), tech);
      }

      // Adicionar tecnologias backend
      for (const tech of backendTechnologies) {
        await addDoc(collection(db, "technologies"), tech);
      }

      console.log("Dados de tecnologias inicializados com sucesso");
    }

    // Inicializar dados de Experiência
    if (!(await hasDocuments("experiences"))) {
      const experiences = [
        {
          position: "Desenvolvedor Full Stack",
          company: "Empresa XYZ",
          startDate: "Jan 2022",
          endDate: "Presente",
          description:
            "Desenvolvimento de aplicações web utilizando React, Node.js e Firebase.",
          technologies: ["React", "Node.js", "Firebase", "MongoDB"],
        },
        {
          position: "Desenvolvedor Frontend",
          company: "Empresa ABC",
          startDate: "Jun 2020",
          endDate: "Dez 2021",
          description:
            "Criação de interfaces responsivas e otimização de performance.",
          technologies: ["React", "JavaScript", "CSS", "HTML"],
        },
      ];

      for (const experience of experiences) {
        await addDoc(collection(db, "experiences"), experience);
      }
      console.log("Dados de Experiência inicializados com sucesso");
    }

    // Inicializar dados de Projetos
    if (!(await hasDocuments("projects"))) {
      const projects = [
        {
          title: "Portfólio Pessoal",
          description:
            "Portfólio desenvolvido com React, TailwindCSS e Firebase.",
          technologies: ["React", "TailwindCSS", "Firebase"],
          githubUrl: "https://github.com/seu-usuario/portfolio",
          imageUrl: "https://via.placeholder.com/150",
        },
        {
          title: "Sistema de Gerenciamento",
          description: "Sistema web para gerenciamento de tarefas e projetos.",
          technologies: ["React", "Node.js", "MongoDB"],
          githubUrl: "https://github.com/seu-usuario/sistema-gerenciamento",
          imageUrl: "https://via.placeholder.com/150",
        },
      ];

      for (const project of projects) {
        await addDoc(collection(db, "projects"), project);
      }
      console.log("Dados de Projetos inicializados com sucesso");
    }

    console.log("Todos os dados foram inicializados com sucesso!");
  } catch (error) {
    console.error("Erro ao inicializar dados:", error);
  }
}
