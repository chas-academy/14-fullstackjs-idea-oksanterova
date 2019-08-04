import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components/macro";
import logo from "../../assets/logo.png";
import { withRouter } from "react-router";

const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  padding: 10px;
`;

const InputWrapper = styled.div`
  position: relative;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  background-color: #fff;
  width: 520px;
  height: 53px;
  border-radius: 6px;
  padding-left: 10px;
`;

const Input = styled.input`
  height: 30px;
  font-size: 16px;
  width: 500px;
  margin: 10px 5px 0px 12px;
  border: 0;
  outline: none;
`;

const Search = styled.div`
  position: absolute;
  left: 80px;
  top: 200px;
  display: flex;
  flex-flow: row wrap;
  justify-content: space-around;
`;

const Logo = styled.div`
  margin-top: 10px;
  width: 185px;
  height: 36px;
  background: url(${logo}) no-repeat;
  padding-right: 30px;
`;

const SearchBtn = styled.button`
  position: absolute;
  height: 53px;
  width: 53px;
  background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABgAAAAYCAMAAADXqc3KAAAAz1BMVEUAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACZY6YEAAAARHRSTlMAAQQGBwwPEBETFBUXGBwlJigtLzIzNDU2PUVGR0lKT1RYXmlrcHF1eH6GiIuSnqOlpq2ytMXR19nc3uLm6O3v8fX7/YYkc88AAADbSURBVBgZbcEJWwFRAIbR75pkkhaKkqQZWtCiZNJC4v3/v6mZ22z1zDmKuUfn7cOS/jFnb1iPNeVVXkndGqX2vsmZKLG1AIKmI+MONsCNYnfA2MiqfgK7sraBiRLVDTzIugTKSg2AkiLPMFXGBQ4UeYe+MgZoK7ICXznAhSIzGCnjAKeKDGFplGoBO4rUga4SJoAPWWYO633FxkBPvxrAumsUKj8BX0axa0LLkd+fYnlKXPGXp0RjTuy+Q8hTwtSHs9Xixa9Ix4Q8FWgS6qlAi5BRgRMIVKjWcfQD+2MzzparWKkAAAAASUVORK5CYII=)
    no-repeat center;
  border: 0;
  cursor: pointer;
  right: 0px;
  top: 0px;
`;

function Homepage({ history }) {
  const search = useRef(null);

  useEffect(() => {
    search.current.focus();
  }, []);

  const [text, setText] = useState("");

  return (
    <Wrapper>
      <Search>
        <Logo />
        <InputWrapper>
          <form
            onSubmit={e =>
              history.push({
                pathname: "/search",
                search: "?q=" + text
              })
            }
          >
            <Input
              type="text"
              placeholder="Search for a restaurant or a place"
              value={text}
              ref={search}
              onChange={e => setText(e.target.value)}
            />
            <SearchBtn type="submit" />
          </form>
        </InputWrapper>
      </Search>
    </Wrapper>
  );
}

export default withRouter(Homepage);
