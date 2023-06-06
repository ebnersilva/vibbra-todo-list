import { darken } from "polished";
import styled, { css } from "styled-components";

interface IContainerProps {
  isOpened: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: flex;
  flex-direction: column;
  width: 150px;

  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);
  
  margin-top: 10px;
  margin-bottom: 4px;

  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;

  background: #F2F2F2;

  transition: all 0.6s;

  ${props => !props.isOpened && css`
    transform: translateX(-312px);
  `}

`;

export const SidebarItem = styled.button`
  display: flex;
  background: ${props => props.theme.colors.gray200};

  align-items: center;

  margin-top: 12px;
  padding-left: 6px; 
  
  font-size: 16px;
  font-weight: 600;

  color: ${props => props.theme.colors.gray300};

  svg {
    color: ${props => props.theme.colors.gray300};
    font-size: 18px;
    margin-bottom: 1px;
    margin-right: 4px;
  }

  transition: all 0.3s;

  &:hover {
    color: ${({ theme }) => darken(0.03, theme.colors.black500)};

    svg {
      color: ${({ theme }) => darken(0.03, theme.colors.black500)};
    }
  }
`;