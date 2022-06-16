import { useState, useEffect } from "react";
import { FaUser } from "react-icons/fa";
// import "../css/register.css";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const { name, email, password } = formData;

  const onChange = () => {};

  return (
    <>
      <section className="form">
        <div className="form__wrapper">
          <div className="form__group">
            <header className="form__heading">
              <span className="heading">name</span>
            </header>
            <form>
              <input
                type="text"
                className="form__control"
                id="name"
                name="name"
                value={name}
                placeholder="type your name here..."
                onChange={onChange}
              />
            </form>
          </div>
          <div className="form__group">
            <header className="form__heading">
              <span className="heading">email adress</span>
            </header>
            <form>
              <input
                type="email"
                className="form__control"
                id="email"
                name="email"
                value={email}
                placeholder="type your email here..."
                onChange={onChange}
              />
            </form>
          </div>
          <div className="form__group">
            <header className="form__heading">
              <span className="heading">password</span>
            </header>
            <form>
              <input
                type="password"
                className="form__control"
                id="password"
                name="password"
                value={password}
                placeholder="type your password here..."
                onChange={onChange}
              />
            </form>
          </div>
        </div>
        <div className="form__btns absolute">
          <button type="submit" className="btn secondary-btn">
            <span>←</span>
          </button>
          <button type="submit" className="btn primary-btn">
            <span>Create account</span>
          </button>
        </div>
      </section>
    </>
  );
}

export default Register;
