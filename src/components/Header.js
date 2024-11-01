import styled from "styled-components";
import { Link } from "react-router-dom";
import { mainStyle } from "../GlobalStyled";

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
  return (
    <Container>
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
