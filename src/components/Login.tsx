import React, { useState } from 'react';
import Button from './common/Button';
import Input from './common/Input';

interface LoginProps {
  onNavigate: (view: 'signup' | 'landing') => void;
}

interface LoginForm {
  email: string;
  password: string;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
  const [formData, setFormData] = useState<LoginForm>({
    email: '',
    password: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("http://localhost:3000/users/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData), // send formData as JSON
      });
  
      if (!response.ok) {
        throw new Error("Error creating user");
      }
  
      const data = await response.json();
      console.log("✅ Usuario Registrado:", data);
    } catch (error) {
      console.error("❌ Error:", error);
    }

    console.log('Datos de login:', formData);
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
          <h1 className="auth-title">¡Bienvenido de Nuevo!</h1>
          <p className="auth-subtitle">Ingresa a tu cuenta</p>
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
            placeholder="Ingresa tu contraseña"
            required
          />

          <div className="form-options">
            <button type="button" className="forgot-password">
              ¿Olvidaste tu contraseña?
            </button>
          </div>

          <Button type="submit" variant="primary" className="auth-button">
            INICIAR SESIÓN
          </Button>
        </form>

        <div className="auth-footer">
          <p>
            ¿Aún no tienes cuenta?{' '}
            <button 
              className="link-button"
              onClick={() => onNavigate('signup')}
            >
              Regístrate
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;