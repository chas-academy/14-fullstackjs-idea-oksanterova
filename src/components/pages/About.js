import React from "react";
import styled from "styled-components/macro";
import logo_black from "../../assets/logo_black.png";
import { withRouter } from "react-router";
import { borderAndShadow, BigLoginName } from "../Common";

export default withRouter(About);

const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  max-width: 60%;
  @media (max-width: 700px) {
    max-width: 95%;
  }
`;

const BlackLogo = styled.div`
  margin-top: -10px;
  width: 185px;
  height: 185px;
  background: url(${logo_black}) center no-repeat;
  background-size: cover;
  padding-right: 10px;
  @media (max-width: 400px) {
    width: 90px;
    height: 90px;
  }
`;

const Body = styled.div`
  align-text: center;
  margin: 20px;
  font-size: 16px;
  line-height: 1.5;

  @media (max-width: 400px) {
    font-size: 14px;
  }
`;

function About() {
  return (
    <Wrapper>
      <BigLoginName>About us</BigLoginName>
      <BlackLogo />
      <Body>
        Tablespoon is a very small, but proud web application that is designed
        to show how you can spend your summer holidays wisely. Using such
        technologies as React, Node.js and GraphQL, I created an application
        that can be developed into a complete and convenient booking system. The
        task was performed by me as the last report on the knowledge gained
        before the imminent start of my internship. I tried to show my skills
        and, at the same time, to prepare myself for work duties using similar
        technologies. I hope you will like it! <br /> &copy; 2019 Oksana
        Kanterova
      </Body>
    </Wrapper>
  );
}
