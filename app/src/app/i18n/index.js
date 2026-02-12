// app/src/app/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Idioma guardado o portugués por defecto
const saved = (typeof window !== 'undefined' && localStorage.getItem('lang')) || 'pt';

const resources = {
  pt: {
    translation: {
      auth: {
        loginTitle: 'Iniciar sessão',
        loginSubtitle: 'Bem-vindo de volta',
        email: 'E-mail',
        password: 'Senha',
        enter: 'Entrar',
        noAccount: 'Não tem conta?',
        register: 'Registre-se'
      }
    }
  },
  es: {
    translation: {
      auth: {
        loginTitle: 'Iniciar sesión',
        loginSubtitle: 'Bienvenido nuevamente',
        email: 'Correo electrónico',
        password: 'Contraseña',
        enter: 'Entrar',
        noAccount: '¿No tienes cuenta?',
        register: 'Regístrate'
      }
    }
  },
  en: {
    translation: {
      auth: {
        loginTitle: 'Sign in',
        loginSubtitle: 'Welcome back',
        email: 'Email',
        password: 'Password',
        enter: 'Enter',
        noAccount: "Don't have an account?",
        register: 'Sign up'
      }
    }
  }
};

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: saved,           // 🇵🇹 por defecto si no hay guardado
    fallbackLng: 'pt',
    interpolation: { escapeValue: false }
  });

export default i18n;