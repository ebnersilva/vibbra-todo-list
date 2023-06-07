import styled from 'styled-components';

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

export const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column ;

  background: ${props => props.theme.colors.black00};

  border-radius: 8px;


  width: 60%;

  padding: 40px;
`;

export const SubTodosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: 100%;

  overflow-y: auto;

  margin: 12px;
`;
