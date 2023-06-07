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

  position: relative;
  
  background: ${props => props.theme.colors.black00};
  
  border-radius: 8px;

  padding: 20px;
  width: 60%;
`;

export const SubTodosContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;

  width: 100%;
  max-height: 300px;

  overflow-y: scroll;

  margin-bottom: 30px;
  padding-top: 20px;
  padding-bottom: 20px;
`;
