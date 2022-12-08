import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { APIS } from '../../config';
import variables from '../../styles/variables';

export default function KakaoLogin() {
  const navigate = useNavigate();
  const location = useLocation();
  const KAKAO_CODE = location.search.split('=')[1];

  useEffect(() => {
    fetch(`${APIS.ipAddress}/users/kakaoLogin?code=${KAKAO_CODE}`, {
      method: 'GET',
    })
      .then(res => res.json())
      .then(data => {
        localStorage.setItem('TOKEN', data.userData.accessToken);
        if (data.userData.isMember === true) {
          navigate('/?category=');
        } else {
          navigate('/signup');
        }
      });
  }, []);

  const completionWord = '로그인 중입니다...';
  const [loginStatus, setLoginStatus] = useState('');
  const [count, setCount] = useState(0);

  useEffect(() => {
    const typingInterval = setInterval(() => {
      setLoginStatus(prevStatusValue => {
        let result = prevStatusValue
          ? prevStatusValue + completionWord[count]
          : completionWord[0];
        setCount(count + 1);
        if (count >= completionWord.length) {
          setCount(0);
          setLoginStatus('');
        }
        return result;
      });
    }, 200);
    return () => {
      clearInterval(typingInterval);
    };
  });

  return <KakaoLoginWrap>{loginStatus}</KakaoLoginWrap>;
}

const KakaoLoginWrap = styled.div`
  width: 100%;
  height: 600px;
  padding-top: 100px;
  font-size: 40px;
  font-weight: bold;
  color: #882dc4;
  ${variables.flex('column', 'center', 'center')};
`;
