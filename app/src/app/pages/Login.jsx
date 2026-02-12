import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/pages/_login.scss";

const Login = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!form.email || !form.password) {
      return setError("Todos los campos son obligatorios.");
    }

    // 🔥 Fake login
    if (form.email === "admin@fake.com" && form.password === "1234") {
      localStorage.setItem("user", JSON.stringify(form));
      navigate("/");
    } else {
      setError("Credenciales incorrectas.");
    }
  };

  return (
    <div className="login">
      <div className="login__card">
        <h2>FakeStore</h2>
        <p>Inicia sesión para continuar</p>

        <form onSubmit={handleSubmit}>
          <input
            type="email"
            name="email"
            placeholder="Correo"
            value={form.email}
            onChange={handleChange}
          />

          <input
            type="password"
            name="password"
            placeholder="Contraseña"
            value={form.password}
            onChange={handleChange}
          />

          {error && <span className="login__error">{error}</span>}

          <button type="submit">Ingresar</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
