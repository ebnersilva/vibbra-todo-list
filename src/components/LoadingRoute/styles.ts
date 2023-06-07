import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex: 1;
  height: 100vh;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.span`
  font-size: 20px;
  font-weight: 600;
  color: ${props => props.theme.colors.black500};
`;
