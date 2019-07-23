import React, { useState } from "react";
import styled from "styled-components/macro";
import logo from "../../assets/logo.png";
import { withRouter } from "react-router";
import Flex from "styled-flex-component";
import { Link } from "react-router-dom";

const InputWrapper = styled.div`
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  background-color: #fff;
  width: 300px;
  height: 40px;
  border-radius: 6px;
  padding-left: 10px;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
`;

const Input = styled.input`
  height: 30px;
  font-size: 16px;
  margin: 4px 2px 0px 12px;
  border: 0;
  outline: none;
  flex: 1;
`;

const Logo = styled.div`
  margin-top: 0px;
  width: 48px;
  height: 40px;
  background: url(${logo}) center left no-repeat;
`;

const SearchBtn = styled.button`
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAz1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACZY6YEAAAARHRSTlMAAQQGBwwPEBETFBUXGBwlJigtLzIzNDU2PUVGR0lKT1RYXmlrcHF1eH6GiIuSnqOlpq2ytMXR19nc3uLm6O3v8fX7/YYkc88AAADbSURBVBgZbcEJWwFRAIbR75pkkhaKkqQZWtCiZNJC4v3/v6mZ22z1zDmKuUfn7cOS/jFnb1iPNeVVXkndGqX2vsmZKLG1AIKmI+MONsCNYnfA2MiqfgK7sraBiRLVDTzIugTKSg2AkiLPMFXGBQ4UeYe+MgZoK7ICXznAhSIzGCnjAKeKDGFplGoBO4rUga4SJoAPWWYO633FxkBPvxrAumsUKj8BX0axa0LLkd+fYnlKXPGXp0RjTuy+Q8hTwtSHs9Xixa9Ix4Q8FWgS6qlAi5BRgRMIVKjWcfQD+2MzzparWKkAAAAASUVORK5CYII=)
    no-repeat center;
  border: 0;
  cursor: pointer;
  width: 40px;
  height: 40px;
`;

function SmallSearch({ history }) {
  const [text, setText] = useState("");

  function handleSubmit(e) {
    history.push({
      pathname: "/search",
      search: "?q=" + text
    });
    e.preventDefault();
  }

  return (
    <Flex>
      <Link to="/">
        <Logo />
      </Link>
      <form onSubmit={handleSubmit}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="Search for a restaurant or a place"
            value={text}
            onChange={e => setText(e.target.value)}
          />
          <SearchBtn />
        </InputWrapper>
      </form>
    </Flex>
  );
}

export default withRouter(SmallSearch);
