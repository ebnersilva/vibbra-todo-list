import styled from "styled-components";

export const Container = styled.div`
  display: flex;
  flex: 1;

  background: ${props => props.theme.colors.primary};

  flex-direction: column;

  width: 100px;

  position: absolute;
  top: 50px;
  bottom: 0px;
`;

export const SidebarItem = styled.div`
  display: flex;
  background: transparent;
`;

export const ItemText = styled.span`
  display: flex;
  background: transparent;
`;