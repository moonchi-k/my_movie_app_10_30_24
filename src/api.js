// Respones headers: 요청할 때 PARAMS(매개변수) 말고도 다르게 해서 요청(토큰, 사용자 정보 등)을
// 보낼 수 있는 공간
// 페치 메서드는 url, options 포함
// Node.js 패치 설치 버전 낮춰서

const fetch = require("node-fetch");
// 임포트랑 똑같음, 페치를 가지고 온 것

const baseUrl = "https://api.themoviedb.org/3/";
const options = {
  method: "GET",
  //   get형식과 post형식이 있음
  //   네트웤, 패치, 헤더에서 확인가능 요청 메서드
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJhMzNkOTNkOTI2NmQ5NDEwYTJjZTVlMjg5MGYzZGVkYSIsIm5iZiI6MTczMDI3MDU5NC41NjMwMTM4LCJzdWIiOiI2NzIxYjM1OTE4MGIwYTVhYjkwYzEzNTIiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.-yHv_JBWP1uIjZHOnM33wdqTvmpL67IaQYUtN2GYl4I",
    //   내 api키
  },
};

// const url = `${baseUrl}movie/now_playing?language=ko-kr`;
// nowplaying의 url과 요청해야하는 매개변수

const url = (urlName) => {
  // 괄호 안에 urlName이 들어갈거다
  return baseUrl + `${urlName}?language=ko-kr`;
  //   이런 형식으로 return 될 거다
};

// url이 매번 바뀌니까 함수로 만들어줌.

export const nowPlaying = () =>
  fetch(url("movie/now_playing"), options).then((res) => res.json());
// 요청하는 함수를 따로 만듬. 요청하는 함수를 호출할 때마다 데이터를 받을 수 있도록
// then 이전, 요청이 완료된 것이고 요청 하고 난 다음은 then 이후
// then 메서드: 응답받는 데이터가 res에 저장되고, json으로 반환해라.
// 네트워크, 패치, 헤더에서 확인가능. 콘텐트 타입 제이슨

export const popular = () =>
  fetch(url("movie/popular"), options).then((res) => res.json());

export const topRated = () =>
  fetch(url("movie/top_rated"), options).then((res) => res.json());

export const upComing = () =>
  fetch(url("movie/upcoming"), options).then((res) => res.json());

export const movieDetail = (id) => {
  console.log(id);
  return fetch(url(`movie/${id}`), options).then((res) => res.json());
};

export const searchMovie = (keyword) => {
  console.log(keyword);
  const searchUrl =
    baseUrl +
    `search/movie?query=${keyword}&include_adult=false&language=ko-kr`;
  return fetch(searchUrl, options).then((res) => res.json());
};
