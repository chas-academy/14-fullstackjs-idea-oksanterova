import styled from "styled-components/macro";

export const borderAndShadow = props => `
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  border: 1px #ccc solid;
  border-radius: 6px;
`;

export const BookBtn = styled.button`
  width: 300px;
  height: 50px;
  color: #fff;
  font-size: 18px;
  font-weight: 800;
  background-color: #ad1d45;
  border-radius: 6px;
  cursor: pointer;
  margin: 10px 0 10px 0;

  :hover {
    opacity: 0.8;
  }

  @media (max-width: 500px) {
    width: 200px;
    height: 40px;
    font-size: 14px;
    font-weight: 800;
  }
`;

export const Name = styled.div`
  font-weight: 700;
  color: #44000d;
  cursor: pointer;
`;

export const BigName = styled(Name)`
  font-size: 32px;
  font-weight: 800;
  margin-right: 40px;
  @media (max-width: 400px) {
    font-size: 24px;
  }
`;

export const BigLoginName = styled(BigName)`
  margin: 15px;
`;
