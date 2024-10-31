import { useEffect, useState } from "react";
import { nowPlaying, popular, topRated, upComing } from "../../api";

const Home = () => {
  const [nowData, setNowData] = useState();
  const [popData, setPopData] = useState();
  const [topData, setTopData] = useState();
  const [upData, setupData] = useState();

  useEffect(() => {
    (async () => {
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
      } catch (error) {
        console.log(error);
      }
    })();
  }, []);
  //   첫번째는 콜백함수, 두번째는 배열
  console.log(nowData);
  console.log(popData);
  console.log(topData);
  console.log(upData);

  return <div>Home</div>;
};

export default Home;

//   최초로 데이터를 받을 때는 promise로 받게 된다.
// promise=비동기

// 예외
try {
} catch (error) {}
