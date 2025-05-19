import React from "react";
import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import logo from "../../assets/LesVivienda.png";

const navItems = [
  { name: "Inicio", path: "/", bgColor: "#E60100", color: "white" },
  { name: "Vivienda", path: "/vivienda", bgColor: "#FF8F00", color: "black" },
  { name: "Propuestas", path: "/propuestas", bgColor: "#FFEF01", color: "black" },
  { name: "Valores", path: "/valores", bgColor: "#00821B", color: "white" },
  { name: "Perfil", path: "/perfil", bgColor: "#004BFF", color: "white" },
  { name: "Contacto", path: "/contacto", bgColor: "#780089", color: "white" },
];

export default function Navbar() {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Les Vivienda Logo" className={styles.logo} />
      </div>

      <div className={styles.links}>
        {navItems.map(({ name, path, bgColor, color }) => (
          <Link
            key={name}
            to={path}
            className={styles.navLink}
            style={{ backgroundColor: bgColor, color }}
          >
            {name}
          </Link>
        ))}
      </div>

      <div className={styles.searchLogin}>
        <input
          type="text"
          placeholder="Buscar..."
          className={styles.searchInput}
        />
        <Link to="/login" className={styles.loginButton}>Login</Link>
      </div>
    </nav>
  );
}
