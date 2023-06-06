import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  background: ${props => props.theme.colors.black00};

  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
  
  height: 50px;
  padding-left: 10px;
`;

export const Title = styled.span`
  margin-left: 20px;
  color: ${props => props.theme.colors.black500};
`;

export const ButtonToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 30px;
`;