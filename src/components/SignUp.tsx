import React, { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';

interface SignUpProps {
  onNavigate: (view: 'login' | 'landing') => void;
}

interface SignUpForm {
  email: string;
  password: string;
  confirmPassword: string;
  acceptTerms: boolean;
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Datos de registro:', formData);
  };

  return (
    <div className="auth-background">
      <div className="auth-card">
        <button 
          className="back-button"
          onClick={() => onNavigate('landing')}
        >
          ← Volver al Inicio
        </button>

        <div className="auth-header">
          <h1 className="auth-title">Únete a EvaluoTrack</h1>
          <p className="auth-subtitle">Crea tu cuenta para comenzar</p>
        </div>

        <form onSubmit={handleSubmit} className="auth-form">
          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@email.com"
            required
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Mín. 8 caracteres"
            required
          />

          <Input
            label="Confirmar Contraseña"
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleInputChange}
            placeholder="Vuelve a escribir tu contraseña"
            required
          />

          <div className="checkbox-group">
            <label className="checkbox-label">
              <input
                type="checkbox"
                name="acceptTerms"
                checked={formData.acceptTerms}
                onChange={handleInputChange}
                required
              />
              <span className="checkmark"></span>
              Acepto los Términos de Servicio
            </label>
          </div>

          <Button type="submit" variant="primary" className="auth-button">
            REGISTRARSE
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Ya tienes una cuenta?{' '}
            <button 
              className="link-button"
              onClick={() => onNavigate('login')}
            >
              Iniciar Sesión
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;