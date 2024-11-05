import styled from "styled-components";
import { Link } from "react-router-dom";
import { mainStyle } from "../GlobalStyled";
import { useEffect, useRef } from "react";

const Container = styled.header`
  width: 100%;
  padding: 20px ${mainStyle.pcPadding};
  display: flex;
  justify-content: space-between;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 100;
  @media screen and (max-width: 650px) {
    padding: 20px ${mainStyle.mobilePadding};
  }
`;

const Logo = styled.h3`
  font-size: 26px;
  font-weight: 700;
  a {
    color: crimson;
  }
`;

const Menu = styled.ul`
  display: flex;
  li {
    margin-left: 150px;
    @media screen and (max-width: 650px) {
      margin-left: 50px;
    }
    a {
      color: #fff;
    }
  }
`;

const Header = () => {
  const headerRef = useRef();
  const scrollHandler = () => {
    const pageY = window.scrollY;
    const current = headerRef.current;
    console.log(pageY);
    console.log(current);

    if (pageY >= 400) {
      current.style.position = "fixed";
      current.style.backgroundColor = "rgba(0,0,0,0.5)";
      current.style.backdropFilter = "blur(10px)";
    } else {
      current.style.position = "absolute";
      current.style.backgroundColor = "transparent";
      current.style.backdropFilter = "blur(0px)";
    }
  };
  useEffect(() => {
    return window.addEventListener("scroll", scrollHandler);
  });
  return (
    <Container ref={headerRef}>
      <Logo>
        <Link to={"/"}>GJFLEX</Link>
      </Logo>

      <Menu>
        <li>
          <Link to={"/"}>Home</Link>
        </li>
        <li>
          <Link to={"/search"}>Search</Link>
        </li>
      </Menu>
    </Container>
  );
};

export default Header;
