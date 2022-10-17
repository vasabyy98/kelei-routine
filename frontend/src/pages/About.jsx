import React, { useRef, useLayoutEffect } from "react";

import { Link } from "react-router-dom";

import { gsap } from "gsap";

import layout from "../css/layout.module.css";
import styles from "../css/about.module.css";
import header from "../css/header.module.css";
import nav from "../css/nav.module.css";

function About() {
  const staggerAnimationContainer = useRef();
  const navContainer = useRef();
  const aboutContainer = useRef();
  const tl = useRef();

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      tl.current = gsap
        .timeline()
        .fromTo(
          navContainer.current,
          {
            opacity: 0,
            yPercent: -100,
          },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1,
          },
          "+0.1"
        )
        .fromTo(
          ".animate__item",
          {
            opacity: 0,
            y: 25,
          },
          {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            duration: 1,
          },
          "+0.25"
        )
        .fromTo(
          aboutContainer.current,
          {
            opacity: 0,
            scale: 0.95,
            y: 20,
          },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            stagger: 0.2,
            duration: 1,
          },
          "+0.5"
        );
    }, staggerAnimationContainer);

    return () => ctx.revert();
  }, []);
  return (
    <>
      <section className={layout.content__wrapper}>
        <div className={` ${layout.threeRow__grid__layout}`}>
          <nav ref={navContainer} className={nav.nav}>
            <Link to="/">
              <span className={nav.arrow__link}>←</span>
            </Link>
          </nav>
          <div ref={staggerAnimationContainer} className={layout.flex__layout}>
            <header className={header.header}>
              <h2 className={`${header.heading__h2} ${"animate__item"}`}>About routine</h2>
              <p className={`${header.subheading} ${"animate__item"}`}>
                Learn what is rest-pause and how to perform it.
              </p>
            </header>
            <div ref={aboutContainer} className={styles.about__content}>
              <div className={styles.about__inner}>
                <h3>Source:</h3>
                <a
                  href="https://forum.bodybuilding.com/showthread.php?t=162992991"
                  className={nav.text__link}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  https://forum.bodybuilding.com/showthread.php?t=162992991
                </a>
              </div>
              <div className={styles.about__inner}>
                <h3>Disclaimer:</h3>
                <p>
                  Keep in mind that these recommendations are strictly hypertrophy orientated, they
                  don't apply to performance/sport specific goals.
                </p>
              </div>
              <div className={styles.about__inner}>
                <h3>In general the following is recommended:</h3>
                <p>
                  In regards to training/rest days keep things flexible and do not allocate specific
                  days to a split, for example a beginner should perform a full body workout every
                  time they're in the gym (regardless of what day of the week it is) and take rest
                  days whenever required.
                </p>
                <p>
                  Intermediate lifters should simply alternate between upper and lower workouts,
                  once again regardless of what day of the week their workouts happen to fall on and
                  taking rest days whenever required.
                </p>
                <p>
                  Advanced lifters should rotate through push, pull and leg workouts regardless of
                  what day of the week it is, if your last workout was a pull workout your next
                  workout should be a leg workout.
                </p>
                <p>
                  If you take a day off you simply pick up from where you left off, a minimum of 3
                  training days per week for beginners, a minimum of 4 training days per week for
                  intermediate lifters and a minimum of 5 training days per week for advanced
                  lifters. Generally speaking the more days per week you can train the faster your
                  progress will be because your average frequency and weekly volume will both be
                  higher.
                </p>
                <p>
                  Increasing your moderate rep (8-12RM) strength is the most efficient way to
                  promote hypertrophy, training to/near failure is important for promoting neural
                  strength adaptions, this is the primary reason rest-pause training is recommended.
                </p>
                <p>
                  You should take your first set to failure (as many full reps as possible, not
                  actually failing) and then rest long enough to allow 3-5 reps during each
                  subsequent rest-pause set until you reach your total rep target, for example if
                  your total rep target is 30 reps it might look like 10, 5, 5, 5, 5. If you can
                  perform more than 5 reps in your rest-pause sets you're simply resting too long
                  between sets, if you can't perform at least 3 reps you're not resting long enough.
                  Some people prefer 5 rep rest-pause sets for larger/compound exercises and 3 rep
                  rest-pause sets for smaller/isolation exercises, go with whatever feels best to
                  you.
                </p>
                <p>
                  You should add more weight once you can complete 12 reps in your first set, try
                  not to let the reps drop below 8, this usually occurs when you add too much
                  weight. You should use your first set of each exercise as your measure of
                  progress. For small exercises like side lateral raises it's acceptable to add more
                  weight once you can complete 15 reps rather than only 12 reps, with calf exercises
                  add more weight once you can complete 20 reps in your first set.
                </p>
                <p>
                  Lift (concentric) as fast as possible, the weights won't necessarily move fast but
                  you should still attempt to lift them as fast as possible, slow down the eccentric
                  (negative), not excessively but just enough to keep tension on the muscles.
                </p>
              </div>
              <div className={styles.about__inner}>
                <h3>In regards to exercise selection:</h3>
                <p>
                  Beginner: Bench press (wide grip), seated rows (elbows tucked), tricep pressdowns,
                  preacher curls, cable side lateral raises, front squats, Romanian deadlifts,
                  standing calf raises.
                </p>
                <p>
                  Intermediate: Bench press (wide grip), seated rows (elbows tucked),
                  flyes/crossovers, reverse flyes/crossovers, tricep pressdowns, preacher curls,
                  cable side lateral raises, front squats, Romanian deadlifts, leg extensions, leg
                  curls, standing calf raises, seated calf raises.
                </p>
                <p>
                  Advanced: Bench press (wide grip), seated rows (elbows tucked), incline bench
                  press, wide grip pull-ups, flyes/crossovers, reverse flyes/crossovers, tricep
                  pressdowns, preacher curls, cable side lateral raises, front squats, Romanian
                  deadlifts, leg press, hyperextensions, leg extensions, leg curls, standing calf
                  raises, seated calf raises.
                </p>
              </div>
              <div className={styles.about__inner}>
                <h3>Concerning volume recommendations:</h3>
                <ul className={styles.about__list}>
                  <li>Beginner - 30 reps per exercise</li>
                  <li>Intermediate - 40 reps per exercise</li>
                  <li>Advanced - 50 reps per exercise</li>
                </ul>
                <p>
                  These are only general guidelines, some of you might need even lower volume, some
                  of you might thrive on even higher volume. You can double those numbers for calf
                  exercises.
                </p>
              </div>
              <div className={styles.about__inner}>
                <h3>General nutrition advice is as follows:</h3>
                <ul className={styles.about__list}>
                  <li>Most of your protein should come from meat, eggs and dairy products.</li>
                  <li>Most of your carbs should come from complex sources.</li>
                  <li>
                    Don't be afraid of fat, you need ample amounts saturated fat, cholesterol and
                    arachidonic acid in your diet, full-fat dairy products and eggs are great
                    sources.
                  </li>
                </ul>
                <p>
                  In general a 3/1 week loading/deloading cycle is adviced, during a deload week you
                  should perform only your first set of each exercise, deloads serve to keep your
                  body and mind fresh for the long haul.
                </p>
              </div>
              <div className={styles.about__inner}>
                <h3>As for rough experience guides:</h3>
                <p>Intermediate:</p>
                <ul className={styles.about__list}>
                  <li>1 x BW x 10 reps bench press</li>
                  <li>1.25 x BW x 10 reps front squat</li>
                  <li>1.5 x BW x 10 reps Romanian deadlift</li>
                </ul>
                <p>Advanced:</p>
                <ul className={styles.about__list}>
                  <li>1.25 x BW x 10 reps bench press</li>
                  <li>1.5 x BW x 10 reps front squat</li>
                  <li>1.75 x BW x 10 reps Romanian deadlift</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
