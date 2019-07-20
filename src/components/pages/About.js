import React from "react";
import styled from "styled-components/macro";
import logo_black from "../../assets/logo_black.png";
import { withRouter } from "react-router";
import { borderAndShadow } from "./Reservation";
import { BigName } from "./Business";

export default withRouter(About);

const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 20px;
`;

const BlackLogo = styled.div`
  margin-top: 10px;
  width: 185px;
  height: 185px;
  background: url(${logo_black}) no-repeat;
  padding-right: 30px;
`;

const Body = styled.div`
  align-text: center;
  margin: 20px;
  width: 700px;
  font-size: 16px;
  line-height: 1.5;
`;

function About() {
  return (
    <Wrapper>
      <BigName>About us</BigName>
      <BlackLogo />
      <Body>
        Tablespoon is a very small, but proud web application that is designed
        to show how you can spend your summer holidays wisely. Using such
        technologies as React, Node.js and GraphQL, I created an application
        that can be developed into a complete and convenient booking system. The
        task was performed by me as the last report on the knowledge gained
        before the imminent start of my internship. I tried to show my skills
        and, at the same time, to prepare myself for work duties using similar
        technologies. I hope you will like it! &copy; 2019 Oksana Kanterova
      </Body>
    </Wrapper>
  );
}
