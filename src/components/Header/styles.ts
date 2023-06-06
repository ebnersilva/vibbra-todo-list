import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;

  background: ${props => props.theme.colors.secondary};
  
  height: 50px;
  padding-left: 10px;
`;

export const Title = styled.span`
  margin-left: 20px;
  color: ${props => props.theme.colors.black00};
`;

export const ButtonToggle = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 30px;
`;