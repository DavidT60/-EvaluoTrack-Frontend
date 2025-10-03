import React from 'react';
import Button from './common/Button';

interface LandingProps {
  onNavigate: (view: 'login' | 'signup') => void;
}

const Landing: React.FC<LandingProps> = ({ onNavigate }) => {
  return (
    <div className="landing-container">
      <div className="landing-background">
        <div className="landing-content">
          <div className="logo-section">
            <h1 className="main-title">EVALUOTRACK</h1>
            <p className="subtitle">La Evolución de la Medición y la Tasación</p>
          </div>
          
          <div className="hero-section">
            <h2 className="hero-title">
              Optimiza tus Proyectos de Medición y Valoración Inmobiliaria
            </h2>
          </div>

          <div className="cta-section">
            <div className="button-group">
              <Button 
                variant="primary" 
                onClick={() => onNavigate('signup')}
                className="cta-button"
              >
                REGISTRARSE
              </Button>
              <Button 
                variant="secondary" 
                onClick={() => onNavigate('login')}
                className="cta-button"
              >
                INICIAR SESIÓN
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;