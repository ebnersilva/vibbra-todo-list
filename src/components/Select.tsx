import styled from "styled-components";

export default styled.select`
  width: 100%;
  border: 2px solid ${props => props.theme.colors.black00};
  background: ${props => props.theme.colors.black00};
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  height: 52px;
  border-radius: 4px;
  outline: none;
  padding: 0 16px;
  font-size: 16px;

  transition: border-color 0.2s ease-in;

  &:focus {
    border: 2px solid ${props => props.theme.colors.black500};
  } 
`;  