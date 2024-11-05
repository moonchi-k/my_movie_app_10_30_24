import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import Wrapper from "../../components/Wrapper";
import { searchMovie } from "../../api";
import { useState } from "react";
import { W500, noImg } from "../../constant/imgUrl";
import PageTitle from "../../components/PageTitle";

const ConWrap = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  row-gap: 50px;
  column-gap: 30px;
`;
const Con = styled.div`
  a {
    color: white;
  }
  /* background-color: lightblue; */
  h3 {
    margin-top: 10px;
    font-size: 18px;
  }
  height: 415px;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;
const Form = styled.form`
  input {
    all: unset;
    width: 100%;
    height: 50px;
    border: 1px solid rgba(255, 255, 255, 0.4);
    box-sizing: border-box;
    padding: 0 20px;
    &::placeholder {
      font-size: 18px;
    }
  }
`;

const Search = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [term, setTerm] = useState();

  const onSearch = async (data) => {
    console.log("ttt");
    const { search: keyword } = data;

    try {
      const { results } = await searchMovie(keyword);
      console.log(results);
      setTerm(results);
    } catch (error) {
      console.log("error: " + error);
    }
  };
  // 엔터쳤을 때 실행하는고

  return (
    <>
      <PageTitle title="Search"></PageTitle>
      <Wrapper>
        <Form onSubmit={handleSubmit(onSearch)}>
          <input
            {...register("search", {
              required: "영화 제목은 필수입니다.",
            })}
            type="text"
            placeholder="영화 제목을 검색하세요."
          />
        </Form>
        {term && (
          <ConWrap>
            {term.map((data) => (
              <Con key={data.id}>
                <Link to={`/detail/${data.id}`}>
                  <img
                    src={data.poster_path ? W500 + data.poster_path : noImg}
                    alt={data.title}
                  />
                  <h3>{data.title}</h3>
                </Link>
              </Con>
            ))}
          </ConWrap>
        )}
      </Wrapper>
    </>
  );
};

export default Search;

// https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlz1nScKxKQoZhQOAhiPMx6bjBSwJ9boR0Lw&s
