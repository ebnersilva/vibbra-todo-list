import { darken } from 'polished';
import styled from 'styled-components';

export default styled.button`
  width: 100%;
  height: 52px;
  border: none;
  background: ${props => props.theme.colors.primary };
  font-size: 16px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.04);
  font-weight: bold;
  color: ${props => props.theme.colors.black00};
  border-radius: 4px;

  transition: background 0.2s ease-in;

  &:hover {
    background: ${({ theme }) => darken(0.03, theme.colors.primary )};
  }

  &:active {
    background: ${({ theme }) => darken(0.05, theme.colors.primary )};
  }
`;
