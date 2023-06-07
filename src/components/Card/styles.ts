import { darken } from 'polished';
import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;

  background: ${props => props.theme.colors.black00};

  position: relative;

  width: 80%;
  height: 100px;

  border-radius: 8px;

  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);

  margin: 8px;

  transition: all 0.3s;

  &:hover {
    background: ${({ theme }) => darken(0.03, theme.colors.black00)};
  }
`;

export const TodoTitle = styled.span`
    color: ${props => props.theme.colors.black500};
    font-size: 18px;
    font-weight: bold;

    min-width: 60%;

    margin: 20px;
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
