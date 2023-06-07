import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  height: 100vh;
`;

export const Title = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: ${props => props.theme.colors.black500};
  margin-bottom: 10px;
`;

export const LoginButton = styled.div`
  display: flex;
  width: 200px;
  height: 80px;

  background: ${props => props.theme.colors.black500};

  align-items: center;
  justify-content: center;

  border-radius: 4px;

  span {
    font-size: 12px;
    color: ${props => props.theme.colors.black00};
    font-weight: 600;
  }
`;

export const Form = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

  width: 500px;

  margin-bottom: 50px;
`;

export const BottonText = styled.button`
  display: flex;
  margin-top: 20px;
  
  font-weight: 600;
  color: ${props => props.theme.colors.black500}
`;
