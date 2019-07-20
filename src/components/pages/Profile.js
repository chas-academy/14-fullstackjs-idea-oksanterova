import React from "react";
import styled from "styled-components/macro";
import { withRouter } from "react-router";
import { borderAndShadow } from "./Reservation";
import { BigLoginName } from "./Login";

export default withRouter(Profile);

const Wrapper = styled.div`
  ${borderAndShadow};
  background-color: #fff;
  padding: 5px;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  width: 600px;
`;

function Profile() {
  return (
    <Wrapper>
      <BigLoginName>Hello there!</BigLoginName>
    </Wrapper>
  );
}
