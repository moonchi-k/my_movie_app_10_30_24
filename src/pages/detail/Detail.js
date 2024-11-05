import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieDetail } from "../../api";
import styled from "styled-components";

import { ORIGINAL_URL, noImg } from "../../constant/imgUrl";

import PageTitle from "../../components/PageTitle";
import Wrapper from "../../components/Wrapper";
import useScrollTop from "../../lib/useScrollTop";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
`;
const Bg = styled.div`
  width: 45%;
  height: 800px;
`;
const TitleWrap = styled.div`
  width: 50%;
  color: white;
  h3 {
    font-size: 70px;
    font-weight: 700;
    margin-bottom: 30px;
  }
  span {
    font-size: 18px;
    font-weight: 300;
  }
  ul {
    list-style: disc;
    margin: 15px 0px 10px 20px;

    li {
      font-size: 18px;
      margin-bottom: 10px;
    }
  }

  p {
    font-size: 18px;
    line-height: 30px;
    margin-top: 50px;
    opacity: 0.7;
    letter-spacing: 0;
  }
`;

const Detail = () => {
  const { id } = useParams();
  const [Data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useScrollTop();

  console.log(id);

  useEffect(() => {
    (async () => {
      try {
        const detailData = await movieDetail(id);
        setData(detailData);
        setIsLoading(false);
      } catch (error) {}
    })();
  }, [id]);

  // id값을 배열에 넣었다는건 id값이 변경될 때마다 안에있는 함수값을 실행하라는 뜻.

  movieDetail();

  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <>
          <PageTitle title={Data.title}></PageTitle>
          <Wrapper>
            <Container>
              <Bg
                style={{
                  background: `url(${
                    Data.poster_path ? ORIGINAL_URL + Data.poster_path : noImg
                  }) no-repeat center / cover`,
                }}
              />
              <TitleWrap>
                <h3>{Data.title}</h3>
                <span>{Math.round(Data.vote_average)}점</span> •{" "}
                <span>{Data.runtime}분</span> • <span>{Data.release_date}</span>
                <ul>
                  {Data.genres.map((genre) => (
                    <li key={genre.id}>{genre.name}</li>
                  ))}
                </ul>
                <p>{Data.overview}</p>
              </TitleWrap>
            </Container>
          </Wrapper>
        </>
      )}
    </>
  );
};

export default Detail;
