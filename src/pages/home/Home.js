import { useEffect, useState } from "react";
import { nowPlaying, popular, topRated, upComing } from "../../api";
import styled from "styled-components";
import { mainStyle } from "../../GlobalStyled";
import { ORIGINAL_URL } from "../../constant/imgUrl";

const MainBanner = styled.section`
  height: 80vh;
  background: url(${ORIGINAL_URL}${(props) => props.$coverImg}) no-repeat center /
    cover;
  padding: 0 ${mainStyle.moPadding};
  position: relative;
  @media screen and (min-width: 450px) {
    padding: 0 ${mainStyle.pcPadding};
  }
`;

const TitleWrap = styled.div`
  width: 100%;
  position: absolute;
  bottom: 150px;
  left: 0;
  color: #fff;
  padding: 0 ${mainStyle.moPadding};

  h3 {
    font-size: 35px;
    font-weight: 700;
    margin-bottom: 20px;
  }

  p {
    font-size: 14px;
    line-height: 20px;
    opacity: 0.7;
  }

  @media screen and (min-width: 450px) {
    padding: 0 ${mainStyle.pcPadding};
    width: 60%;

    h3 {
      font-size: 50px;
    }

    p {
      font-size: 18px;
      line-height: 25px;
    }
  }
`;

const Home = () => {
  const [nowData, setNowData] = useState();
  //   유즈이펙트 안의 변수를 함수 바깥으로 끌어내기 위함.
  // setNowData를 통해서 now를 nowData에 저장할 수 있게 됨
  const [popData, setPopData] = useState();
  const [topData, setTopData] = useState();
  const [upData, setupData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // 렌더링될 때 딱 한 번만 실행될 수 있게끔 해줌, 무한적으로 불러오는 것을 막아줌
    (async () => {
      // 비동기 작업 위함
      try {
        const { results: now } = await nowPlaying();
        const { results: pop } = await popular();
        const { results: top } = await topRated();
        const { results: up } = await upComing();

        // 비동기해야하는 함수 앞에 async
        //   기다려야하는 함수 앞에 await
        //   비구조화로 results라는 객체를 바로 가져옴. 변수로 안만들고

        setNowData(now);
        setPopData(pop);
        setTopData(top);
        setupData(up);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    })();
    // 함수를 소괄호로 감싸고 소괄호를 붙여주면 호출까지 끝
  }, []);
  //   첫번째는 콜백함수, 두번째는 배열
  console.log(nowData);
  console.log(popData);
  console.log(topData);
  console.log(upData);

  return (
    <div>
      {isLoading ? (
        "loading..."
      ) : (
        <MainBanner $coverImg={nowData[0]?.backdrop_path}>
          <TitleWrap>
            <h3>{nowData[0]?.title}</h3>
            <p>{nowData[0]?.overview.slice(0, 100) + "..."}</p>
          </TitleWrap>
        </MainBanner>
      )}
    </div>
  );
};

export default Home;

//   최초로 데이터를 받을 때는 promise로 받게 된다.
// promise=비동기

// 예외

//
