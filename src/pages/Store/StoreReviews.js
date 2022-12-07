import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import ReactStars from 'react-stars';
import variables from '../../styles/variables';
import StoreEachReview from './StroeEachReivew';

export default function StoreReviews({ myData, userId }) {
  const [reviewList, setReviewList] = useState();
  const [registerReview, setRegisterReview] = useState();
  const [registerScore, setRegisterScore] = useState(0.5);

  useEffect(() => {
    fetch('/data/reviewList.json')
      .then(res => res.json())
      .then(result => {
        setReviewList(result);
      });
    // //백엔드 fetch
    // fetch('백엔드 api')
    //   .then(res => res.json())
    //   .then(result => {
    //     setReviewList(result.review_list);
    //   });
  }, []);

  const addReview = e => {
    if (reviewList) {
      const prevReview = [...reviewList];
      prevReview.unshift({
        writerImg: myData.writerImg,
        writerName: myData.writerName,
        rate: registerScore,
        reviewContent: registerReview,
      });
      fetch(`리뷰추가api주소`, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json;charset=utf-8',
          authorization: localStorage.getItem('TOKEN'),
        },
        body: JSON.stringify({
          rate: registerScore,
          reviewContent: registerReview,
        }),
      })
        .then(res => {
          if (res.status === 201) {
            setReviewList(prevReview);
            setRegisterReview('');
            setRegisterScore(0.5);
          } else {
            throw new Error('리뷰추가에 실패하였습니다.');
          }
        })
        .catch(error => alert(error));
    }
  };

  return (
    <WrapReviews>
      <WrapReviewInput>
        <Reviewinput
          onChange={e => {
            setRegisterReview(e.target.value);
          }}
          value={registerReview}
        />
        <WrapReviewBtn>
          <ReactStars
            onChange={e => {
              setRegisterScore(e);
            }}
            count={5}
            size={18}
            color2={'#ffd700'}
            value={registerScore}
          />
          <ReviewBtn
            onClick={e => {
              addReview(e);
            }}
          >
            리뷰등록
          </ReviewBtn>
        </WrapReviewBtn>
      </WrapReviewInput>

      <WrapReviewList>
        {reviewList &&
          reviewList.map((obj, index) => {
            return <StoreEachReview key={index} reviewInfo={obj} />;
          })}
      </WrapReviewList>
    </WrapReviews>
  );
}

const WrapReviews = styled.div`
  width: 100%;
`;
const WrapReviewInput = styled.div`
  display: flex;
  align-items: center;
`;
const Reviewinput = styled.textarea`
  width: 70%;
  height: 200px;
  margin: 0 80px 20px 50px;
  outline: none;
`;
const WrapReviewBtn = styled.div`
  ${variables.flex('column', 'auto', 'center')}
`;
const ReviewBtn = styled.div`
  margin-top: 20px;
  padding: 10px;
  border: 1px solid #888;
  cursor: pointer;
`;
const WrapReviewList = styled.div`
  margin-top: 30px;
`;
