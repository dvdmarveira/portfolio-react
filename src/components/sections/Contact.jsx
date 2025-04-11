import { Linkedin } from "react-bootstrap-icons";
import emailIcon from "../../assets/imgs/email.png";
import emailDarkIcon from "../../assets/imgs/email_dark.png";

const Contact = ({ theme }) => {
  return (
    <section
      id="contact"
      // className="flex justify-center flex-col pt-16 mx-40 box-border min-h-fit"
      className="flex justify-center flex-col md:pt-16 py-20 mx-4 md:mx-40 box-border"
    >
      <p className="section__text__p1">Entre em</p>
      <h1 className="title">Contato</h1>
      <div
        // className="contact-info-upper-container flex justify-center rounded-[2rem] border border-[var(--container-border)] bg-[var(--background-color)] mx-auto my-8 p-2"
        className="flex flex-col md:flex-row justify-left rounded-[2rem] border border-[var(--container-border)] bg-[var(--background-color)] mx-auto my-8 p-2"
      >
        <div className="contact-info-container flex items-left justify-center gap-2 m-4">
          <img
            src={theme === "dark" ? emailDarkIcon : emailIcon}
            alt="Icone de e-mail"
            className="icon contact-icon email-icon h-10 cursor-default"
          />
          <p className="text-lg">
            <a
              href="mailto:dvdmarveira@gmail.com"
              className="text-[var(--secondary-color-2)]"
            >
              dvdmarveira@gmail.com
            </a>
          </p>
        </div>
        <div className="contact-info-container flex items-center justify-center gap-2 m-2">
          <Linkedin className="text-[1.7rem] text-[var(--primary-color-black)]" />
          <p className="text-lg">
            <a
              href="#"
              onClick={(e) => {
                e.preventDefault();
                window.open(
                  "https://www.linkedin.com/in/deyvidmarques",
                  "_blank"
                );
              }}
              className="text-[var(--secondary-color-2)]"
            >
              LinkedIn
            </a>
          </p>
        </div>
      </div>
    </section>
  );
};

export default Contact;
