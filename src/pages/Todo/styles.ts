import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;

  flex-direction: column;

  align-items: center;
  justify-content: center;

  p {
    color: #000;
  }
`;

export const TodosContainer = styled.div`
  display: flex;
  width: 80%;
  justify-content: center;

  margin-top: 10px;

  flex-direction: row;

  flex-wrap: wrap;
`

export const EmptyDataText = styled.span`
  font-size: 18px;
  color: ${props => props.theme.colors.black500};
`;

export const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column ;

  width: 90%;
`;