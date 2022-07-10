import React from "react";

import { Link } from "react-router-dom";

import layout from "../css/layout.module.css";
import styles from "../css/about.module.css";
import btnStyles from "../css/buttons.module.css";

function About() {
  return (
    <>
      <section className={styles.content__wrapper}>
        <div className={layout.flex__layout}>
          <header className={styles.about__header}>
            <span>about</span>
          </header>
          <div className={styles.about__content}>
            <p>
              My goal is to provide a framework and general guidelines for lifters of any experience
              level, knowing how to efficiently progress through the different stages
              (beginner/intermediate/advanced) can potentially save a lifter years of training time,
              what might otherwise take 10 years might take only 5 years if approached properly.
              Keep in mind that my recommendations are strictly hypertrophy orientated, they don't
              apply to performance/sport specific goals.
            </p>
            <p>
              I believe that training frequency is far more important for beginner/intermediate
              lifters and less important for advanced lifters, as such my recommendations will
              reflect this. In general I recommend the following:
            </p>
            <p className={styles.about__paragraph}>
              <span>Beginner = Full body routine</span>
              <span>Intermediate = 2 day split (upper/lower)</span>
              <span>Advanced = 3 day split (push/pull/legs)</span>
            </p>
            <p>
              In regards to training/rest days I prefer to keep things flexible and not allocate
              specific days (Monday for example) to a split, for example a beginner should perform a
              full body workout every time they're in the gym (regardless of what day of the week it
              is) and take rest days whenever required. Intermediate lifters should simply alternate
              between upper and lower workouts, once again regardless of what day of the week their
              workouts happen to fall on and taking rest days whenever required. Advanced lifters
              should rotate through push, pull and leg workouts regardless of what day of the week
              it is, if your last workout was a pull workout your next workout should be a leg
              workout.
            </p>
            <p>
              If you take a day off you simply pick up from where you left off, I recommend a
              minimum of 3 training days per week for beginners, a minimum of 4 training days per
              week for intermediate lifters and a minimum of 5 training days per week for advanced
              lifters. Generally speaking the more days per week you can train the faster your
              progress will be because your average frequency and weekly volume will both be higher.
            </p>
            <p>
              I believe that increasing your moderate rep (10RM etc) strength is the most efficient
              way to promote hypertrophy, I also believe that training to/near failure is important
              for promoting neural strength adaptions, this is the primary reason why I recommend
              rest-pause training.
            </p>
            <p>
              For most exercises I prefer the 8-12 rep range (calves 15-20), you should take your
              first set to failure (as many full reps as possible, not actually failing) and then
              rest long enough to allow 3-5 reps during each subsequent rest-pause set until you
              reach your total rep target, for example if your total rep target is 30 reps it might
              look like 10, 5, 5, 5, 5. If you can perform more than 5 reps in your rest-pause sets
              you're simply resting too long between sets, if you can't perform at least 3 reps
              you're not resting long enough. Some people prefer 5 rep rest-pause sets for
              larger/compound exercises and 3 rep rest-pause sets for smaller/isolation exercises,
              go with whatever feels best to you.
            </p>
            <p>
              You should add more weight once you can complete 12 reps in your first set, try not to
              let the reps drop below 8, this usually occurs when you add too much weight. You
              should use your first set of each exercise as your measure of progress. For small
              exercises like side lateral raises it's acceptable to add more weight once you can
              complete 15 reps rather than only 12 reps, with calf exercises I recommend adding more
              weight once you can complete 20 reps in your first set.
            </p>
            <p>
              I also recommend lifting (concentric) as fast as possible, the weights won't
              necessarily move fast but you should still attempt to lift them as fast as possible, I
              recommend slowing down the eccentric (negative), not excessively but just enough to
              keep tension on the muscles.
            </p>
            <p>
              In regards to exercise selection it's practically impossible to recommend exercises
              suitable for everyone so I'll simply include my personal selections for the sake of
              example, you can substitute exercises that don't agree with you or exercises you
              simply don't have the necessary equipment to perform.
            </p>
            <p>
              Beginner: Bench press (wide grip), seated rows (elbows tucked), tricep pressdowns,
              preacher curls, cable side lateral raises, front squats, Romanian deadlifts, standing
              calf raises
            </p>
            <p>
              Intermediate: Bench press (wide grip), seated rows (elbows tucked), flyes/crossovers,
              reverse flyes/crossovers, tricep pressdowns, preacher curls, cable side lateral
              raises, front squats, Romanian deadlifts, leg extensions, leg curls, standing calf
              raises, seated calf raises.
            </p>
            <p>
              Advanced: Bench press (wide grip), seated rows (elbows tucked), incline bench press,
              wide grip pull-ups, flyes/crossovers, reverse flyes/crossovers, tricep pressdowns,
              preacher curls, cable side lateral raises, front squats, Romanian deadlifts, leg
              press, hyperextensions, leg extensions, leg curls, standing calf raises, seated calf
              raises.
            </p>
            <p>Concerning volume recommendations I'd say:</p>
            <p>
              Beginner = 20-30 total reps per exercise Intermediate = 30-40 total reps per exercise
              Advanced = 40-50 total reps per exercise
            </p>
            <p>
              These are only general guidelines, some of you might need even lower volume, some of
              you might thrive on even higher volume. You can double those numbers for calf
              exercises.
            </p>
            <p>My general nutrition advice is as follows:</p>
            <p className={styles.about__paragraph}>
              <span>Most of your protein should come from meat, eggs and dairy products.</span>
              <span> Most of your carbs should come from complex sources.</span>
              <span>
                Don't be afraid of fat, you need ample amounts saturated fat, cholesterol and
                arachidonic acid in your diet, full-fat dairy products and eggs are great sources.
              </span>
            </p>
            <p>
              In general I recommend a 3/1 week loading/deloading cycle, during a deload week you
              should perform only your first set of each exercise, deloads serve to keep your body
              and mind fresh for the long haul, even if you don't feel as though you need to deload
              I recommend that you still do.
            </p>
            <p>As for rough experience guides I'd say something like:</p>
            <p className={styles.about__paragraph}>
              <span>Intermediate = 1 x BW x 10 reps bench press</span>
              <span> 1.25 x BW x 10 reps front squat</span>
              <span>1.5 x BW x 10 reps Romanian deadlift</span>
              <span>Advanced = 1.25 x BW x 10 reps benchpress</span>
              <span>1.5 x BW x 10 reps front squat</span>
              <span>1.75 x BW x 10 reps Romanian deadlift</span>
            </p>
          </div>
          <div className={`${btnStyles.form__btns} ${btnStyles.fixed}`}>
            <Link to="/">
              <button
                type="submit"
                className={`${btnStyles.btn} ${btnStyles.secondaryBtn} ${btnStyles.arrowBtn}`}
              >
                <span>←</span>
              </button>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

export default About;
