import { darken } from 'polished';
import styled from 'styled-components';

interface IContainerProps {
  show: boolean;
}

export const Container = styled.div<IContainerProps>`
  display: ${({show}) => (show ? 'flex' : 'none')};
  align-items: center;
  justify-content: center;

  position: absolute;
  height: 100vh;
  width:100vw;

  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  
  background: rgba(0,0,0,0.6);
  backdrop-filter: blur(5px);
`;

export const ModalContainer = styled.div`
  display: flex;
  align-items: center;

  flex-direction: column;

  position: relative;

  min-height: 250px;
  width: 80%;
  padding: 20px;

  background: ${props => props.theme.colors.gray200};

  border-radius: 8px;

  transition: all 0.3s;
`;

export const Header = styled.div`
  display: flex;
  height: 100px;
  width: 100%;

  align-items: center;
  justify-content: center;

  justify-content: flex-start;

  span {
    width: 100%;
    font-size: 20px;
    font-weight: bold;
    text-align: center;
  }
`;


export const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;

  background: ${props => props.theme.colors.black00};

  height: 30px;
  width: 40px;

  position: absolute;
  right: 10px;
  top: 10px;

  border-radius: 8px;
  box-shadow: 0px 5px 10px 0px rgba(0, 0, 0, 0.2);

  transition: all 0.3s;

  &:hover {
    background: ${({ theme }) => darken(0.03, theme.colors.black00)};
  }

  svg {
    font-size: 20px;
    color: ${props => props.theme.colors.gray300};
  }
`;