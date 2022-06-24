import React from "react";
import { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logout, reset } from "../features/auth/authSlice";

import styles from "../css/home.module.css";
import btnStyles from "../css/buttons.module.css";

function Home() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user } = useSelector((state) => state.auth);

  const onLogout = () => {
    dispatch(logout());
    dispatch(reset());
    navigate("/");
  };

  useEffect(() => {
    if (!user) {
      navigate("/");
    }
  }, [user, navigate]);

  return (
    <>
      <section className={styles.content__wrapper}>
        <header className={styles.home__header}>
          <div className={styles.home__left}>
            <div className={styles.home__greeting}>
              <span>hello</span>
            </div>
            <span className={styles.home__username}>{user && user.name}</span>
          </div>
          <div className={btnStyles.form__btns}>
            <button onClick={onLogout} className={`${btnStyles.btn} ${btnStyles.secondaryBtn}`}>
              <span>log out</span>
            </button>
          </div>
        </header>
        <div className={styles.home__main}>
          <p className={styles.home__p}>
            Are you ready to make new PRs? Choose your workout plan and start crushing it!
          </p>
          <svg
            id={styles.home__arrow}
            width="58"
            height="75"
            viewBox="0 0 58 75"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M57.6407 47.74L55.4147 45.514L30.7167 68.198V0.993998H27.3247V68.198L2.6267 45.514L0.400703 47.74L29.0207 74.24L57.6407 47.74Z"
              fill="#141414"
            />
          </svg>
          <div className={btnStyles.form__btns}>
            <Link to={"/create-plan"}>
              <button className={`${btnStyles.btn} ${btnStyles.primaryBtn}`}>
                <span>create plan</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
