// src/app/i18n/index.js
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Cargamos las traducciones en memoria (puedes separarlas si quieres)
const resources = {
  pt: {
    translation: {
      app: { title: "Loja", },
      auth: {
        loginTitle: "Iniciar sessão",
        loginSubtitle: "Bem-vindo de volta",
        email: "E-mail",
        password: "Senha",
        enter: "Entrar",
        noAccount: "Não tem conta?",
        register: "Registre-se",
        name: "Nome",
        createAccount: "Criar conta",
        haveAccount: "Já tem conta?",
        signIn: "Iniciar sessão"
      }
    }
  },
  es: {
    translation: {
      app: { title: "Tienda", },
      auth: {
        loginTitle: "Iniciar sesión",
        loginSubtitle: "Bienvenido nuevamente",
        email: "Correo electrónico",
        password: "Contraseña",
        enter: "Entrar",
        noAccount: "¿No tienes cuenta?",
        register: "Regístrate",
        name: "Nombre",
        createAccount: "Crear cuenta",
        haveAccount: "¿Ya tienes cuenta?",
        signIn: "Inicia sesión"
      }
    }
  },
  en: {
    translation: {
      app: { title: "Store", },
      auth: {
        loginTitle: "Sign in",
        loginSubtitle: "Welcome back",
        email: "Email",
        password: "Password",
        enter: "Enter",
        noAccount: "Don't have an account?",
        register: "Sign up",
        name: "Name",
        createAccount: "Create account",
        haveAccount: "Already have an account?",
        signIn: "Sign in"
      }
    }
  }
};

const STORAGE_KEY = 'lang';

const savedLang =
  (typeof window !== 'undefined' && localStorage.getItem(STORAGE_KEY)) || 'pt';

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: savedLang,         // 🇵🇹 por defecto si no existe
    fallbackLng: 'pt',
    interpolation: { escapeValue: false }
  });

export function setLang(lang) {
  localStorage.setItem(STORAGE_KEY, lang);
  i18n.changeLanguage(lang);
}

export default i18n;