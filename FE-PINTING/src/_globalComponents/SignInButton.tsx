import Link from 'next/link';
import { useRecoilState } from 'recoil';
import { signInState } from '@/_globalAtoms/signIn';
import styles from '@/_globalStyles/SignInButton.module.scss';

export default function SignInButton() {
  const [isPintingSignIn, setIsPintingSignIn] = useRecoilState(signInState);

  if (!isPintingSignIn) {
    return (
      <Link href='/signIn' className={styles.signIn}>
        로그인
      </Link>
    );
  }

  const handleLogout = () => {
    setIsPintingSignIn(false);
  };

  return <button onClick={handleLogout}>로그아웃</button>;
}
