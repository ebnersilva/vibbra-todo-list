import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;

  background: ${props => props.theme.colors.black00};

  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
  
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
`;

export const SectionContent = styled.div`
  display: flex;

  align-items: center;
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

export const Button = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  height: 30px;
  width: 40px;
  margin-right: 20px;

  border-radius: 8px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);

  transition: all 0.3s;

  &:hover {
    background: ${({ theme }) => darken(0.03, theme.colors.black00)};
  }
`;