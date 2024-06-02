'use client';
import { instance } from '../../utils/axios';
import { ChangeEvent, useState } from 'react';

export default function SignUp() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState({
    newPassword: '',
    cloneNewPassword: '',
  });
  const [checkList, setCheckList] = useState({
    valildationEmail: false,
    valildationPassword: false,
  });

  // TODO: hook으로 빼기
  const valildationEmail = async () => {
    if (email === '' || email.includes('@') === false) {
      return;
    }
    // TODO: 왜 안되는지 나중에 체크
    await instance
      .post('/auth/email', { email })
      .then(() => {
        setCheckList({ ...checkList, valildationEmail: true });
      })
      .catch((err) => {
        // TODO: 에러 처리
        console.log('잘못된 이메일입니다.');
      });
  };

  const setNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, newPassword: e.target.value });
    if (password.newPassword === password.cloneNewPassword) {
      setCheckList({ ...checkList, valildationPassword: true });
    }
  };

  const setCloneNewPassword = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword({ ...password, cloneNewPassword: e.target.value });
    if (password.newPassword === password.cloneNewPassword) {
      setCheckList({ ...checkList, valildationPassword: true });
    }
  };

  const submitAll = async () => {
    if (!checkList.valildationEmail || !checkList.valildationPassword) {
      console.log('모든 항목을 확인해주세요.');
      return;
    }

    await instance
      .post('/auth/signup', { email, password })
      .then(() => {
        console.log('회원가입이 완료되었습니다.');
      })
      .catch((err) => {
        console.log('회원가입에 실패했습니다.');
      });
  };

  return (
    <div>
      <h1>Sign Up</h1>
      <h2>email</h2>
      <input
        type='email'
        placeholder='email'
        onChange={(e) => setEmail(e.target.value)}
        autoFocus
      />
      <button onClick={valildationEmail}>이메일 검사</button>
      {checkList.valildationEmail && <p>이메일이 확인되었습니다.</p>}
      {/* TODO: 비밀번호 일치 여부 색으로 표현 */}
      <h2>비밀번호</h2>
      <input type='password' placeholder='password' onChange={setNewPassword} />
      <input
        type='password'
        placeholder='password'
        onChange={setCloneNewPassword}
      />
      <button onClick={submitAll}>Submit</button>
    </div>
  );
}
