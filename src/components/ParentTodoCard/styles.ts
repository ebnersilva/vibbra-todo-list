import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  background: ${props => props.theme.colors.black00};

  position: relative;

  width: 30%;
  height: 110px;
  margin: 6px;

  border-radius: 8px;

  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);

  transition: all 0.3s;

  &:hover {
    background: ${({ theme }) => darken(0.03, theme.colors.black00)};
  }

  @media (max-width: 425px) {
    width: 100%;
  }

  @media (max-width: 1024px) {
    width: 100%;
  }
`;

export const TodoTitle = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 10px;

  color: ${props => props.theme.colors.black500};
  font-size: 14px;
  font-weight: bold;
  width: 100%;
`;

export const OptionsContainer = styled.div`
  display: flex;
  width: 100%;

  align-items: center;
  justify-content: center;

  margin-bottom: 30px;
`;

export const Option = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.theme.colors.black00};

  height: 40px;
  width: 40px;
  margin-right: 10px;

  border-radius: 8px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);

  transition: all 0.3s;

  &:hover {
    background: ${({ theme }) => darken(0.03, theme.colors.black00)};
  }

  svg {
    font-size: 30px;
    color: ${props => props.theme.colors.black500};
  }
`;

export const HasSubTodoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.theme.colors.green500};

  width: 100%;

  position: absolute;
  bottom: 0;

  height: 14px;

  span {
    font-size: 10px;
    color: ${props => props.theme.colors.black00};
  }
`;

export const Footer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;

  position: absolute;
  bottom: 0;
  height: 18px;
  width: 100%;

  background: ${props => props.theme.colors.black500};

  span {
    font-size: 12px;
    color: ${props => props.theme.colors.black00};
  }
`;