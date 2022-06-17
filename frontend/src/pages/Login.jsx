import { Link } from "react-router-dom";
import styles from "../css/signIn.module.css";
import btnStyles from "../css/buttons.module.css";

function Login() {
  return (
    <>
      <section className={styles.content__wrapper}>
        <div className={styles.form}>
          <div className={styles.form__group}>
            <header className={styles.form__heading}>
              <span className={styles.heading}>email adress</span>
            </header>
            <form>
              <input
                type="email"
                className={styles.form__control}
                id="email"
                name="email"
                placeholder="type your email here..."
              />
            </form>
          </div>
          <div className={styles.form__group}>
            <header className={styles.form__heading}>
              <span className={styles.heading}>password</span>
            </header>
            <form>
              <input
                type="password"
                className={styles.form__control}
                id="password"
                name="password"
                placeholder="type your password here..."
              />
            </form>
          </div>
          <div className={btnStyles.form__btns}>
            <Link to="/">
              <button
                type="submit"
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
              >
                <span>←</span>
              </button>
            </Link>
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>Log in</span>
            </button>
          </div>
        </div>
        <div className={`${btnStyles.form__btns} ${btnStyles.loginForm} ${btnStyles.absolute}`}>
          <span>Don't have an account?</span>
          <Link to="/register">
            <button type="submit" className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
              <span>Create account</span>
            </button>
          </Link>
        </div>
      </section>
    </>
  );
}

export default Login;
