import { Link } from "react-scroll";
import sobreMimImg from "../../assets/imgs/sobremim.png";
import experienceIcon from "../../assets/imgs/experience.png";
import experienceDarkIcon from "../../assets/imgs/experience_dark.png";
import educationIcon from "../../assets/imgs/education.png";
import educationDarkIcon from "../../assets/imgs/education_dark.png";
import arrowIcon from "../../assets/imgs/arrow.png";
import arrowDarkIcon from "../../assets/imgs/arrow_dark.png";
import { Trophy, MortarboardFill } from "react-bootstrap-icons";

const About = ({ theme }) => {
  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-start min-h-screen px-4"
    >
      <p className="section__text__p1 mb-2">Saiba mais</p>
      <h1 className="title text-5xl mb-8 md:mb-16">Sobre mim</h1>

      <div className="flex flex-col md:flex-row w-full max-w-6xl justify-between items-center gap-4 md:gap-16">
        {/* Imagem de perfil */}
        <div className="w-full md:w-1/3 flex justify-center">
          <img
            src={sobreMimImg}
            alt="Foto do perfil"
            className="w-64 h-64 md:w-80 md:h-80 rounded-3xl object-cover"
          />
        </div>

        {/* Cards e texto */}
        <div className="w-full md:w-2/3 flex flex-col justify-center">
          {/* Cards */}
          <div className="flex flex-row md:grid-cols-2 gap-4 md:gap-8 mb-4 md:justify-center">
            {/* Card Experiência */}
            <div className="bg-white dark:bg-[var(--primary-color-2)] p-3 md:p-6 rounded-3xl border border-[var(--container-border)] shadow-sm flex flex-col items-center">
              <div className="w-12 h-6 flex items-center justify-center mb-2">
                <Trophy className="text-2xl text-[var(--secondary-color)]" />
              </div>
              <h3 className="text-lg font-medium mb-1">Experiência</h3>
              <p className="text-center">1+ ano</p>
              <p className="text-center text-sm">
                Projetos acadêmicos e competições
              </p>
            </div>

            {/* Card Formação */}
            <div className="bg-white dark:bg-[var(--primary-color-2)] p-3 md:p-6 rounded-3xl border border-[var(--container-border)] shadow-sm flex flex-col items-center">
              <div className="w-12 h-6 flex items-center justify-center mb-2">
                <MortarboardFill className="text-2xl text-[var(--secondary-color)]" />
              </div>
              <h3 className="text-lg font-medium mb-1">Formação</h3>
              <p className="text-center">SENAC</p>
              <p className="text-center text-sm">
                Análise e Desenvolvimento de Sistemas
              </p>
            </div>
          </div>

          {/* Texto de Bio */}
          <div className="text-container">
            <p className="text-[var(--secondary-color-2)] text-justify">
              Proatividade e curiosidade são características que me definem,
              tanto na área em que atuo quanto na forma como encaro a vida.
              Explorar novos aprendizados e buscar evolução constante são
              pilares fundamentais para o meu crescimento pessoal e
              profissional, acreditando sempre que dedicação e esforço são a
              base para bons resultados.
            </p>
          </div>
        </div>
      </div>

      <Link
        to="experience"
        spy={true}
        smooth={true}
        // offset={-80}
        duration={500}
        className="flex w-full justify-end mt-5 mb-5 md:mt-20 md:mr-28"
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

export default About;
