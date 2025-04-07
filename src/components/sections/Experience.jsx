import { Link } from "react-scroll";
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
import arrowIcon from "../../assets/imgs/arrow.png";
import arrowDarkIcon from "../../assets/imgs/arrow_dark.png";

const Experience = ({ theme }) => {
  return (
    <section
      id="experience"
      className="relative flex flex-col items-center justify-start min-h-screen py-2 px-4"
    >
      <p className="section__text__p1 mb-2">Maior afinidade com as demais</p>
      <h1 className="title text-5xl mb-8 md:mb-16">Tecnologias</h1>

      <div className="flex flex-col w-fit md:flex-row md:w-full max-w-6xl justify-center items-stretch gap-4 md:gap-12">
        {/* Frontend Card */}
        <div className="w-fit bg-white dark:bg-[var(--primary-color-2)] p-8 rounded-3xl border-2 border-[var(--container-border)] shadow-sm">
          <h2 className="text-3xl font-medium mb-8 text-center">Frontend</h2>

          <div className="flex flex-row justify-center gap-16 w-[316px]">
            <div className="grid items-start gap-y-8">
              {/* HTML */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit items-center justify-center">
                  <img src={htmlIcon} alt="HTML icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  HTML
                </h3>
              </div>

              {/* TypeScript */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img src={tsIcon} alt="TypeScript icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  TypeScript
                </h3>
              </div>

              {/* CSS */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img src={cssIcon} alt="CSS icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  CSS
                </h3>
              </div>
            </div>
            <div className="grid items-start gap-y-8">
              {/* React */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img src={reactIcon} alt="React icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  React
                </h3>
              </div>

              {/* JavaScript */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img src={jsIcon} alt="JavaScript icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  JavaScript
                </h3>
              </div>

              {/* Next.js */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img
                    src={nextjsIcon}
                    alt="Next.js icon"
                    className="h-7 w-7"
                  />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  NextJS
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Backend Card */}
        <div className="w-fit bg-white dark:bg-[var(--primary-color-2)] p-8 rounded-3xl border-2 border-[var(--container-border)] shadow-sm">
          <h2 className="text-3xl font-medium mb-8 text-center">Backend</h2>

          <div className="flex flex-row justify-center gap-24 w-[316px]">
            <div className="grid items-start gap-y-8">
              {/* Node.js */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img
                    src={nodejsIcon}
                    alt="Node.js icon"
                    className="h-7 w-7"
                  />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  NodeJS
                </h3>
              </div>

              {/* MySQL */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img src={mysqlIcon} alt="MySQL icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  MySQL
                </h3>
              </div>

              {/* Python */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img src={pythonIcon} alt="Python icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  Python
                </h3>
              </div>
            </div>
            <div className="grid items-start gap-y-8">
              {/* Git */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img src={gitIcon} alt="Git icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  Git
                </h3>
              </div>

              {/* C# */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img src={csharpIcon} alt="C# icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  C#
                </h3>
              </div>

              {/* .NET */}
              <div className="flex items-center gap-2 w-fit">
                <div className="w-fit h-fit flex items-center justify-center">
                  <img src={dotnetIcon} alt=".NET icon" className="h-7 w-7" />
                </div>
                <h3 className="text-base text-[var(--terciary-color)] font-bold">
                  .NET
                </h3>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Link
        to="projects"
        spy={true}
        smooth={true}
        // offset={-80}
        duration={500}
        className="flex w-full justify-end mt-5 mb-5 md:mt-28 md:mr-28"
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
