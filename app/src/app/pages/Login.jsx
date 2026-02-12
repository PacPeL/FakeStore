import { Link } from 'react-router-dom';

export default function Login() {
  return (
    <section className="auth-page">
      <div className="auth-container">
        <h1 className="auth-title">Iniciar sesión</h1>
        <p className="auth-subtitle">Bienvenido nuevamente</p>

        <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
          <label className="form-group">
            <span className="form-label">Correo electrónico</span>
            <input
              type="email"
              className="form-input"
              placeholder="correo@ejemplo.com"
              required
            />
          </label>

          <label className="form-group">
            <span className="form-label">Contraseña</span>
            <input
              type="password"
              className="form-input"
              placeholder="••••••••"
              required
              minLength={6}
            />
          </label>

          <button className="btn-primary" type="submit">Entrar</button>
        </form>

        <div className="auth-footer">
          <span>¿No tienes cuenta?</span>{' '}
          <Link to="/register" className="auth-link">Regístrate</Link>
        </div>
      </div>
    </section>
  );
}

