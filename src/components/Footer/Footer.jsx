import React from "react";
import styles from "./Footer.module.css";
import youtubeLogo from "../../assets/logo-youtube.png";
import instagramLogo from "../../assets/logo-instagram.png";
import whatsappLogo from "../../assets/logo-watssap.png";
import linkedinLogo from "../../assets/logo-linkedin.png";
import telegramLogo from "../../assets/icono-telegram.png";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.left}>
        <Link to="/aviso-legal" className={styles.legalLink}>
          Aviso Legal
        </Link>
      </div>

      <div className={styles.center}>
        <p>© LesVivienda, 2025. Todos los derechos reservados.</p>
      </div>

      <div className={styles.right}>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
          <img src={youtubeLogo} alt="YouTube" />
        </a>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
          <img src={instagramLogo} alt="Instagram" />
        </a>
        <a href="https://wa.me/" target="_blank" rel="noopener noreferrer">
          <img src={whatsappLogo} alt="WhatsApp" />
        </a>
        <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
          <img src={linkedinLogo} alt="LinkedIn" />
        </a>
        <a href="https://telegram.org" target="_blank" rel="noopener noreferrer">
          <img src={telegramLogo} alt="Telegram" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
