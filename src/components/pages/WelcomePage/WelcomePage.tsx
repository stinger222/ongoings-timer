import { ReactComponent as GitLogo } from "../../../assets/github.svg";
import { Trello } from "../../../constants/constants";
import styles from "./WelcomePage.module.css";

const handleLogIn = () => {
  Trello.authorize({
    type: 'redirect',
    name: 'Ongoings Timer',
    scope: {
      read: true,
      write: true
    },
    interactive: true,
    expiration: '30days',
    success: () => console.log('Successfully signed in!'),
    error: () => console.error('Can\'t sign in!')
  })
}

export default function WelcomePage() {

  return <div className={styles.wrapper}>
    <h1 className={styles.title}>Ongoings Timer</h1>
    <div className={styles.content}>


      <div className={`${styles.info_card} ${styles.info_card_left}`}>
        <h2 className={styles.info_card__title}>What Is This App??</h2>
        <div className={styles.info_card__desc}>
          Trello-based app for tracking <br />
          your anime (or not so) ongoings with <br />
          timer until next episode
        </div>
      </div>

      <div className={styles.sign_in_container}>
        <span className={styles.sign_in_link} onClick={handleLogIn}>Sign In</span>
        <br />
        with Trello to continue
      </div>

      <div className={`${styles.info_card} ${styles.info_card_right}`}>
        <h2 className={styles.info_card__title}>How To Use?</h2>
        <div className={styles.info_card__desc}>
          Just select the board and list <br />
          that app will use to grab info from <br />
          and where new cards will appear
        </div>
      </div>

    </div>
		
    <footer className={styles.footer}>
      <a href="https://github.com/stinger222/ongoings-timer" target="_blank" rel="noreferrer"> More info on GitHub </a>
      <GitLogo className={styles.git_logo}/>
    </footer>
    
  </div>
}
