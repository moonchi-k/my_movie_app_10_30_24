import { useEffect, useState } from "react";
import { nowPlaying, popular, topRated, upComing } from "../../api";
import Loading from "../../components/Loading";
import Banner from "./components/Banner";

import "swiper/css";
import Movies from "./components/Movies";

import PageTitle from "../../components/PageTitle";
import useScrollTop from "../../lib/useScrollTop";

const Home = () => {
  const [nowData, setNowData] = useState();
  //   유즈이펙트 안의 변수를 함수 바깥으로 끌어내기 위함.
  // setNowData를 통해서 now를 nowData에 저장할 수 있게 됨
  const [popData, setPopData] = useState();
  const [topData, setTopData] = useState();
  const [upData, setupData] = useState();
  const [isLoading, setIsLoading] = useState(true);
  useScrollTop();

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
        <Loading />
      ) : (
        <>
          <PageTitle title="Home"></PageTitle>
          {nowData && (
            <div>
              <Banner Data={nowData} />

              <Movies data={nowData} title={"현재상영중"}></Movies>
              <Movies data={popData} title={"인기상영작"}></Movies>
              <Movies data={topData} title={"상위랭킹작"}></Movies>
              <Movies data={upData} title={"개봉예정작"}></Movies>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Home;

//   최초로 데이터를 받을 때는 promise로 받게 된다.
// promise=비동기

// 예외

//
