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

interface FormErrors {
    email?: string;
    password?: string;
    confirmPassword?: string;
    acceptTerms?: string;
    message?:string
}

const SignUp: React.FC<SignUpProps> = ({ onNavigate }) => {
  
  const [formData, setFormData] = useState<SignUpForm>({
    email: '',
    password: '',
    confirmPassword: '',
    acceptTerms: false
  });
  
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const validateForm = (): boolean => {
    const errors: FormErrors = {};

    // 1. Password Match Validation
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = 'Passwords do not match.';
      errors.message = 'Passwords do not match.'
    }
    
    // 2. Basic Required Field Checks (optional, but good practice)
    if (!formData.email) {
        errors.email = 'Email is required.';
        errors.message = 'Email is required.';

    }
    if (!formData.password) {
        errors.password = 'Password is required.';
        errors.message = 'Password is required.';

    }

    setFormErrors(errors);

    // Form is valid if the errors object is empty
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Post Request...")
    setFormErrors({});
    setSuccessMessage(null); // Reset success message too

    const isValid = validateForm();

    if (!isValid) {
      console.log('❌ Validation failed. Aborting submission.');
      return; // Stop the function if validation fails
    }

    try {
      const response = await fetch("http://localhost:3000/users/singup", {
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
      console.log("✅ Usuario creado:", data);
      setSuccessMessage("Usuario creado Validar to Email.")

    } catch (error) {
      console.error("❌ Error:", error);
    }
      // Delay navigation to let the user see the success message
    setTimeout(() => {
          onNavigate('login');
      }, 2000); // 2-second delay

    console.log('Datos de registro:', formData);
  };

  // ... (Your existing component structure and logic)

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
          
          {/* 🚨 API/SERVER ERROR DISPLAY 🚨 */}
          {formErrors.message && (
            <div className="error-message api-error">
              {formErrors.message}
            </div>
          )}

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="tu@email.com"
            required
            // Optional: You could pass formErrors.email as an 'error' prop to your <Input> component
          />

          <Input
            label="Contraseña"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Mín. 8 caracteres"
            required
            // Optional: You could pass formErrors.password as an 'error' prop
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
          
          {/* ⚠️ CONFIRM PASSWORD ERROR DISPLAY ⚠️ */}
          {formErrors.confirmPassword && (
            <p className="input-error-text">{formErrors.confirmPassword}</p>
          )}

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
            {/* ⚠️ TERMS ERROR DISPLAY (if you implement validation for this) ⚠️ */}
            {formErrors.acceptTerms && (
                <p className="input-error-text terms-error">{formErrors.acceptTerms}</p>
            )}
          </div>

          <Button type="submit" variant="primary" className="auth-button">
            REGISTRARSE
          </Button>

          {/* ✨ SUCCESS NOTIFICATION DISPLAY ✨ */}
          {successMessage && (
            <div className="notification success-message">
              {successMessage}
            </div>
          )}
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