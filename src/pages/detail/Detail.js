import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { movieDetail } from "../../api";
import styled from "styled-components";
import { mainStyle } from "../../GlobalStyled";
import { ORIGINAL_URL } from "../../constant/imgUrl";

const Container = styled.div`
  padding: 160px ${mainStyle.pcPadding};
  display: flex;
  justify-content: space-between;
`;
const Bg = styled.div`
  width: 45%;
  height: 800px;
  background-color: lightgray;
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

  movieDetail();

  return (
    <>
      {isLoading ? (
        "loading"
      ) : (
        <Container>
          <Bg
            style={{
              background: `URL(${ORIGINAL_URL}${Data.poster_path}) no-repeat center / cover`,
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
      )}
    </>
  );
};

export default Detail;
