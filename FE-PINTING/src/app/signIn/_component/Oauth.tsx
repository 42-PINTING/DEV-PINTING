import styles from '../_styles/Oauth.module.scss';

// TODO: api로 Outh 구현
function Google() {
  return <button className={styles.oauthBtn}>google</button>;
}

function Kakao() {
  return <button className={styles.oauthBtn}>kakao</button>;
}

const Oauth = { Google, Kakao };

export default Oauth;
