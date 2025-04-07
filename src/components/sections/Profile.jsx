import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { Linkedin, Github, FileEarmarkPersonFill } from "react-bootstrap-icons";
import profileImg from "../../assets/imgs/perfil.png";
import cvFile from "../../assets/imgs/cv.pdf";

const Profile = () => {
  const typedElement = useRef(null);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: ["Desenvolvedor", "Freelancer"],
      typeSpeed: 100,
      backSpeed: 50,
      backDelay: 2000,
      loop: true,
    });

    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section
      id="profile"
      // className="flex justify-center gap-20 h-[80vh] mb-40 pt-16 mx-40 box-border min-h-fit"
      className="flex flex-col md:flex-row justify-start md:justify-center gap-6 md:gap-20 min-h-[80vh] mb-40 md:mb-40 pt-4 md:pt-16 mx-4 md:mx-40 box-border"
    >
      <div className="section__pic-container flex h-[250px] w-[250px] self-center text-center">
        <img src={profileImg} alt="Deyvid Marques foto do perfil" />
      </div>

      <div className="section__text self-center text-start" data-aos="zoom-out">
        <h1 className="title text-[3.2rem] font-bold text-[var(--secondary-color)]">
          Deyvid Marques
        </h1>
        <p className="flex justify-center md:justify-start mt-3 mb-5">
          <span
            ref={typedElement}
            className="typed border-b-2 border-[#0563bb] text-[1.3125rem] text-[var(--terciary-color)] tracking-[1px] mt-[0.3125rem]"
          ></span>
          <span
            className="typed-cursor typed-cursor--blink"
            aria-hidden="true"
          ></span>
        </p>
        <div
          id="socials-container"
          className="flex justify-center md:justify-start  gap-4"
        >
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open(
                "https://www.linkedin.com/in/deyvidmarques",
                "_blank"
              );
            }}
            title="LinkedIn"
          >
            <Linkedin className="text-2xl text-[color-mix(in_srgb,var(--terciary-color),transparent_30%)] hover:text-[#0563bb]" />
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open("https://www.github.com/dvdmarveira", "_blank");
            }}
            title="Github"
          >
            <Github className="text-2xl text-[color-mix(in_srgb,var(--terciary-color),transparent_30%)] hover:text-[#0563bb]" />
          </a>
          <a
            href="#"
            onClick={(e) => {
              e.preventDefault();
              window.open(cvFile, "_blank");
            }}
            title="Currículo"
          >
            <FileEarmarkPersonFill className="text-2xl text-[color-mix(in_srgb,var(--terciary-color),transparent_30%)] hover:text-[#0563bb]" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Profile;
