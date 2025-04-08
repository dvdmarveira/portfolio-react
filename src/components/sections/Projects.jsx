import { useState } from "react";
import { Link } from "react-scroll";
import enersiImg from "../../assets/imgs/enersi1.png";
import salaosenacImg from "../../assets/imgs/salaosenac1.png";
import recifenciaImg from "../../assets/imgs/recifencia1.png";
import arrowIcon from "../../assets/imgs/arrow.png";
import arrowDarkIcon from "../../assets/imgs/arrow_dark.png";
import arrowRight from "../../assets/imgs/arrowright.png";
import arrowRightDark from "../../assets/imgs/arrowright_dark.png";
import arrowLeft from "../../assets/imgs/arrowleft.png";
import arrowLeftDark from "../../assets/imgs/arrowleft_dark.png";

const Projects = ({ theme }) => {
  const projects = [
    {
      title: "Enersi",
      img: enersiImg,
      description:
        "Projeto desenvolvido com o propósito de conectar pessoas que desejam utilizar energia limpa a empresas parceiras que oferecem os seus serviços a preços acessíveis.",
      github: "https://www.github.com/dvdmarveira",
      figma:
        "https://www.figma.com/proto/cs5qXx8dpzrwS9h8DbBcBz/Untitled?node-id=0-1&p=f&t=t4M7lfAQyG7Nvd8z-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=2%3A65&show-proto-sidebar=1",
    },
    {
      title: "Salão Senac",
      img: salaosenacImg,
      description:
        "Plataforma para o salão de beleza do SENAC que integra agendamento online, registro detalhado de serviços, previsão de retorno e feedback dos clientes.",
      github: "https://www.github.com/dvdmarveira",
      figma: "https://www.figma.com/",
    },
    {
      title: "Recifência",
      img: recifenciaImg,
      description:
        "Plataforma com o propósito de impulsionar a arte local, oferecendo visibilidade aos artistas e conectando-os a possíveis contratantes, seja para eventos, shows etc.",
      github: "https://github.com/dvdmarveira/residencia-recifen",
      figma:
        "https://www.figma.com/proto/Fj6KUqp9yevh7zpptNmxbf/Untitled?node-id=0-1&p=f&t=P25MKdFODkksIkft-0&scaling=scale-down&content-scaling=fixed&page-id=0%3A1&starting-point-node-id=116%3A2&show-proto-sidebar=1",
    },
  ];

  const [current, setCurrent] = useState(0);

  const nextSlide = () => {
    setCurrent((prev) => (prev + 1) % projects.length);
  };

  const previousSlide = () => {
    setCurrent((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section
      id="projects"
      className="relative flex flex-col items-center justify-start min-h-screen px-4"
    >
      <p className="section__text__p1">Conheça alguns dos meus</p>
      <h1 className="title text-5xl mb-10">Projetos</h1>

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
                <div className="bg-white dark:bg-[var(--primary-color-2)] overflow-hidden rounded-3xl border border-transparent dark:border-[var(--container-border)] shadow-sm">
                  <div className="flex justify-center w-full overflow-hidden">
                    <img
                      src={project.img}
                      alt={project.title}
                      className="w-[60%] h-[60%] rounded-2xl object-cover"
                    />
                  </div>

                  <div className="p-6">
                    <h2 className="text-xl font-medium mb-3 text-center">
                      {project.title}
                    </h2>
                    <p className="text-sm text-gray-700 dark:text-[var(--secondary-color)] mb-6">
                      {project.description}
                    </p>

                    <div className="flex justify-center gap-4">
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-transparent border-2 border-gray-300 dark:border-[var(--container-border)] rounded-xl text-gray-700 dark:text-[var(--secondary-color)] text-sm font-bold hover:bg-gray-500
                hover:text-white hover:border-transparent dark:hover:bg-gray-800 transition-colors"
                      >
                        Github
                      </a>
                      <a
                        href={project.figma}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-6 py-2 bg-transparent border-2 border-gray-300 dark:border-[var(--container-border)] rounded-xl text-gray-700 dark:text-[var(--secondary-color)] text-sm font-bold hover:bg-gray-500
                hover:text-white hover:border-transparent dark:hover:bg-gray-800 transition-colors"
                      >
                        Figma
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Botão para passar o slide */}
          <button
            onClick={previousSlide}
            className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
          >
            <img
              src={theme === "dark" ? arrowLeftDark : arrowLeft}
              alt="Previous"
              className="w-5 h-5"
            />
          </button>
          <button
            onClick={nextSlide}
            className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-100 dark:bg-gray-700 p-2 rounded-full hover:bg-gray-300 dark:hover:bg-gray-600 transition"
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
              className="bg-white dark:bg-[var(--primary-color-2)] overflow-hidden rounded-3xl border border-transparent dark:border-[var(--container-border)] shadow-sm hover:shadow-md transition-all"
            >
              <div className="flex justify-center w-full overflow-hidden">
                <img
                  src={project.img}
                  alt={project.title}
                  className="w-[50%] h-[50%] rounded-2xl object-cover"
                />
              </div>

              <div className="p-6">
                <h2 className="text-xl font-medium mb-3 text-center">
                  {project.title}
                </h2>
                <p className="text-sm text-gray-700 dark:text-[var(--secondary-color)] mb-6">
                  {project.description}
                </p>

                <div className="flex justify-center gap-4">
                  <a
                    href={project.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-transparent border-2 border-gray-300 dark:border-[var(--container-border)] rounded-xl text-gray-700 dark:text-[var(--secondary-color)] text-sm font-bold hover:bg-gray-500
            hover:text-white hover:border-transparent dark:hover:bg-gray-800 transition-colors"
                  >
                    Github
                  </a>
                  <a
                    href={project.figma}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-2 bg-transparent border-2 border-gray-300 dark:border-[var(--container-border)] rounded-xl text-gray-700 dark:text-[var(--secondary-color)] text-sm font-bold hover:bg-gray-500
            hover:text-white hover:border-transparent dark:hover:bg-gray-800 transition-colors"
                  >
                    Figma
                  </a>
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
        className="flex w-full justify-end mt-5 mb-5 md:mr-28"
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
