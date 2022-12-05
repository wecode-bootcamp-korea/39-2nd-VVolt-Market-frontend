/*global kakao*/
import React from 'react';
import { useState } from 'react';
import styled from 'styled-components';
import variables from '../../styles/variables';
import PopupPostCode from './SearchAddress/PopupPostCode';

export default function Signup() {
  // 팝업창 상태 관리
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  // 상점 이름 값 관리
  const [marketName, setMarketName] = useState('');
  // 주소 값 관리
  const [fullAddress, setFullAddress] = useState('');
  const [zoneCode, setZoneCode] = useState('');
  const [detailAddress, setDetailAddress] = useState('');
  // 위도 경도 값 관리
  const [lat, setLat] = useState('');
  const [long, setLong] = useState('');

  const handleAddress = (fullAddr, zipCode) => {
    let geocoder = new kakao.maps.services.Geocoder();
    let callback = function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        setLat(result[0].x);
        setLong(result[0].y);
      }
    };

    geocoder.addressSearch(fullAddr, callback);
    setFullAddress(fullAddr);
    setZoneCode(zipCode);
  };

  return (
    <Wrapper>
      <Title>회원가입</Title>
      <SubTitle>* 상점 이름</SubTitle>
      <InputWrapper>
        <InPutName
          type="text"
          placeholder="상점 이름을 만들어 주세요"
          value={marketName}
          onChange={e => setMarketName(e.target.value)}
        />
      </InputWrapper>
      <SubTitle>* 주소</SubTitle>
      <InputWrapper>
        <InputZipCode
          placeholder="우편번호"
          onChange={e => setZoneCode(e.target.value)}
          value={zoneCode}
          disabled
        />
        <Button onClick={() => setIsPopupOpen(true)}>검색</Button>
        {isPopupOpen && (
          <PopupPostCode
            closePopup={() => setIsPopupOpen(false)}
            handleAddress={handleAddress}
          />
        )}
        <InPutAdress
          placeholder="기본주소"
          value={fullAddress}
          onChange={e => setFullAddress(e.target.value)}
          disabled
        />

        <InPutAdress
          placeholder="상세주소"
          defalutvalue={detailAddress}
          onChange={e => setDetailAddress(e.target.value)}
        />
      </InputWrapper>
      <SignUpButton>가입하기</SignUpButton>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  ${variables.flex('column', '', '')};
  width: 300px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 25px;
  text-align: center;
  margin-bottom: 40px;
`;

const SubTitle = styled.p`
  font-size: 14px;
  text-align: left;
  color: orange;
  margin-left: 10px;
`;

const InputWrapper = styled.div`
  ${variables.flex('row', '', 'center')}
  flex-wrap: wrap;
  width: 100%;
  padding: 10px;
  margin-bottom: 20px;
`;

const InPutName = styled.input`
  width: 300px;
  height: 35px;
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const InputZipCode = styled.input`
  width: 100px;
  height: 35px;
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const Button = styled.button`
  width: 60px;
  height: 35px;
  border: 1px solid transparent;
  border-radius: 5px;
  margin-left: 5px;
  background-color: #f9e000;
`;

const InPutAdress = styled.input`
  width: 300px;
  height: 35px;
  margin-top: 5px;
  padding: 10px;
  border: 1px solid #d5d5d5;
  border-radius: 5px;
  &:focus {
    outline: none;
  }
`;

const SignUpButton = styled.button`
  width: 280px;
  height: 50px;
  border: 1px solid transparent;
  border-radius: 5px;
  margin: 30px 0px 0px 10px;
  background-color: #f9e000;
`;
