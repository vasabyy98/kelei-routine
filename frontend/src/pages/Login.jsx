// import "../css/register.css";

function Login() {
  return (
    <>
      <section className="form">
        <div className="form__wrapper">
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
                placeholder="type your email here..."
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
                placeholder="type your password here..."
              />
            </form>
          </div>
          <div className="form__btns">
            <button type="submit" className="btn primary-btn">
              <span>Log in</span>
            </button>
          </div>
        </div>
        <div className="form__btns login-form absolute">
          <span>Don't have an account?</span>
          <button type="submit" className="btn primary-btn">
            <span>Create account</span>
          </button>
        </div>
      </section>
    </>
  );
}

export default Login;
