import React, { useState, useEffect } from "react";
import { Link } from "react-scroll";
import {
  Moon,
  Sun,
  House,
  Person,
  FileEarmarkCode,
  Images,
  Envelope,
} from "react-bootstrap-icons";

const Navbar = ({ theme, toggleTheme }) => {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 150) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <>
      <nav
        id="desktop-nav"
        className="hidden md:flex fixed w-full justify-center items-center top-0 z-40"
      >
        <div
          className={`navbar ${
            scrolled ? "w-screen transition-all duration-[3s] ease-out" : ""
          }`}
        >
          <ul
            id="nav-links"
            className={`flex gap-6 list-none text-2xl h-fit border-none py-4 ${
              scrolled
                ? "bg-[var(--background-color-2)] justify-center transition-all duration-[3s] ease-out"
                : "justify-center"
            }`}
          >
            <li>
              <Link
                to="profile"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out py-[5px] px-[10px]"
                activeClass="active"
                title="Início"
              >
                <House className="navicon" />
              </Link>
            </li>
            <li>
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out py-[5px] px-[10px]"
                activeClass="active"
                title="Sobre"
              >
                <Person className="navicon" />
              </Link>
            </li>
            <li>
              <Link
                to="experience"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out py-[5px] px-[10px]"
                activeClass="active"
                title="Tecnologias"
              >
                <FileEarmarkCode className="navicon" />
              </Link>
            </li>
            <li>
              <Link
                to="projects"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out py-[5px] px-[10px]"
                activeClass="active"
                title="Projetos"
              >
                <Images className="navicon" />
              </Link>
            </li>
            <li>
              <Link
                to="contact"
                spy={true}
                smooth={true}
                offset={-70}
                duration={500}
                className="text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out py-[5px] px-[10px]"
                activeClass="active"
                title="Contato"
              >
                <Envelope className="navicon" />
              </Link>
            </li>
            <li
              id="theme_mode"
              style={{ display: scrolled ? "none" : "block" }}
            >
              <span
                className="theme_mode cursor-pointer text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out py-[5px] px-[10px]"
                title="Tema"
                onClick={toggleTheme}
              >
                {theme === "dark" ? (
                  <Sun id="modeToggle" className="navicon" />
                ) : (
                  <Moon id="modeToggle" className="navicon" />
                )}
              </span>
            </li>
          </ul>
        </div>
      </nav>

      <nav
        id="hamburger-nav"
        className="flex justify-between items-center mt-5 mx-5 mb-14 md:hidden"
      >
        {/* Botão de tema à esquerda */}
        <button
          className="theme-toggle-mobile p-2 text-[var(--secondary-color)]"
          onClick={toggleTheme}
          aria-label="Alternar tema"
        >
          {theme === "dark" ? (
            <Sun className="text-2xl" />
          ) : (
            <Moon className="text-2xl" />
          )}
        </button>
        
        <div className="hamburger-menu relative inline-block">
          <div
            className={`hamburger-icon flex flex-col justify-between h-6 w-[30px] cursor-pointer ${
              menuOpen ? "open" : ""
            }`}
            onClick={toggleMenu}
          >
            <span
              className={`w-full h-[2px] bg-[var(--secondary-color)] transition-all duration-300 ease-in-out ${
                menuOpen
                  ? "transform rotate-45 translate-y-2.5 translate-x-[10px]"
                  : ""
              }`}
            ></span>
            <span
              className={`w-full h-[2px] bg-[var(--secondary-color)] transition-all duration-300 ease-in-out ${
                menuOpen ? "opacity-0" : "opacity-100"
              }`}
            ></span>
            <span
              className={`w-full h-[2px] bg-[var(--secondary-color)] transition-all duration-300 ease-in-out ${
                menuOpen
                  ? "transform -rotate-45 -translate-y-2.5 translate-x-[10px]"
                  : ""
              }`}
            ></span>
          </div>
          <div
            className={`menu-links absolute top-8 right-0 bg-[var(--nav-bg)] rounded-3xl w-fit overflow-hidden transition-all duration-300 ease-in-out ${
              menuOpen ? "max-h-[300px]" : "max-h-0"
            }`}
          >
            <li className="list-none">
              <Link
                to="#"
                spy={true}
                smooth={true}
                offset={-10}
                duration={500}
                className="block p-[10px] text-center text-xl text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Início
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="about"
                spy={true}
                smooth={true}
                offset={-50}
                duration={500}
                className="block p-[10px] text-center text-xl text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Sobre
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="experience"
                spy={true}
                smooth={true}
                // offset={-80}
                duration={500}
                className="block p-[10px] text-center text-xl text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Tecnologias
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="projects"
                spy={true}
                smooth={true}
                // offset={-80}
                duration={500}
                className="block p-[10px] text-center text-xl text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Projetos
              </Link>
            </li>
            <li className="list-none">
              <Link
                to="contact"
                spy={true}
                smooth={true}
                // offset={-80}
                duration={500}
                className="block p-[10px] text-center text-xl text-[var(--secondary-color)] no-underline transition-all duration-300 ease-in-out"
                onClick={toggleMenu}
              >
                Contato
              </Link>
            </li>

          </div>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
