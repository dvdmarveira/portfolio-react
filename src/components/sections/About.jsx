import { useState, useEffect } from "react";
import { Link } from "react-scroll";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../services/firebase";
import sobreMimImg from "../../assets/imgs/sobremim.png";
import experienceIcon from "../../assets/imgs/experience.png";
import experienceDarkIcon from "../../assets/imgs/experience_dark.png";
import educationIcon from "../../assets/imgs/education.png";
import educationDarkIcon from "../../assets/imgs/education_dark.png";
import arrowIcon from "../../assets/imgs/arrow.png";
import arrowDarkIcon from "../../assets/imgs/arrow_dark.png";
import { Trophy, MortarboardFill } from "react-bootstrap-icons";

const About = ({ theme }) => {
  const [aboutData, setAboutData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const aboutCollectionRef = collection(db, "about");
        const data = await getDocs(aboutCollectionRef);

        if (!data.empty) {
          setAboutData(data.docs[0].data());
        }
      } catch (error) {
        console.error("Erro ao carregar dados do Sobre:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  return (
    <section
      id="about"
      className="relative flex flex-col items-center justify-start px-4 pb-20"
    >
      <p className="section__text__p1">Saiba mais</p>
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
            <div className="bg-[var(--primary-color-2)] dark:bg-[var(--primary-color-2)] p-3 md:p-6 rounded-3xl border border-[var(--container-border)] shadow-sm flex flex-col items-center">
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
            <div className="bg-[var(--primary-color-2)] dark:bg-[var(--primary-color-2)] p-3 md:p-6 rounded-3xl border border-[var(--container-border)] shadow-sm flex flex-col items-center">
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
            {loading ? (
              <div className="animate-pulse">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6 mb-2"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-4/6"></div>
              </div>
            ) : (
              <p className="text-[var(--secondary-color-2)] text-justify">
                {aboutData?.description ||
                  "Proatividade e curiosidade são características que me definem, " +
                    "tanto na área em que atuo quanto na forma como encaro a vida. " +
                    "Explorar novos aprendizados e buscar evolução constante são " +
                    "pilares fundamentais para o meu crescimento pessoal e " +
                    "profissional, acreditando sempre que dedicação e esforço são a " +
                    "base para bons resultados."}
              </p>
            )}
          </div>
        </div>
      </div>

      <Link
        to="experience"
        spy={true}
        smooth={true}
        // offset={-80}
        duration={500}
        className="hidden md:flex w-full justify-end mt-5 mb-5 md:mt-20 md:mr-28"
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
