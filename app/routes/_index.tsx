import type { MetaFunction } from "@remix-run/node";
import { Link } from "@remix-run/react";
import { useState } from "react";
import "../styles/index.css";

export const meta: MetaFunction = () => {
  return [
    { title: "Derma AI" },
    { name: "description", content: "Derma AI" },
    { name: "viewport", content: "width=device-width, initial-scale=1" }
  ];
};

export default function Index() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <div className="logo-container">
          {/* Logo izquierdo */}
          <div className="logo">
            <img
              src="/derma-bg-remo.png"
              alt="Dermatoss Logo"
              className="logo-image"
            />
          </div>
          {/* Logo derecho */}
          <div className="logo">
            <img
              src="/Logo_del_ITESM.svg"
              alt="ITESM Logo"
              className="logo-image itesm-logo"
            />
          </div>
        </div>

        {/* Botón móvil */}
        <div className="mobile-menu-button">
          <button 
            onClick={() => setMenuOpen(!menuOpen)}
            className="hamburger-button"
          >
            <div className={`hamburger-line ${menuOpen ? 'first-line-open' : ''}`}></div>
            <div className={`hamburger-line ${menuOpen ? 'middle-line-open' : ''}`}></div>
            <div className={`hamburger-line ${menuOpen ? 'last-line-open' : ''}`}></div>
          </button>
        </div>

        {/* Enlace desktop */}
        <Link
          to="classifier"
          className="cta-button desktop-only"
        >
          Prueba Ahora
        </Link>
      </header>

      {/* Menú móvil */}
      {menuOpen && (
        <div className="mobile-menu">
          <Link
            to="classifier"
            className="cta-button"
            onClick={() => setMenuOpen(false)}
          >
            Prueba Ahora
          </Link>
        </div>
      )}

      {/* Contenido principal */}
      <main className="main-content">
        <div className="content-grid">
          {/* Imagen */}
          <div className="image-container">
            <img
              src="/DermaAIBg.png"
              alt="Derma AI Logo"
              className="main-image"
            />
          </div>
          
          {/* Texto */}
          <div className="text-container">
            <span className="description-text">
              Descubre una herramienta innovadora diseñada para ayudar
              a profesores, padres y estudiantes a identificar y
              clasificar lesiones primarias dermatológicas
            </span>
            <span className="description-text">
              ¡Pruébalo ahora y descubre lo fácil que puede ser el
              aprendizaje!
            </span>
            <Link
              to="classifier"
              className="cta-button large-cta"
            >
              Prueba Ahora
            </Link>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="footer">
        <span className="footer-text">
          Esta herramienta es de uso educativo únicamente.
        </span>
      </footer>
    </div>
  );
}