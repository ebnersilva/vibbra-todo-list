import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  height: 100vh;
  width: 100%;

  flex-direction: column;
`;

export const Main = styled.div`
  display: flex;
  
  flex: 1;

  /* background: yellow; */
`;

export const ContentContainer = styled.div`
  display: flex;
  flex: 1;
  p {
    background: transparent;
  }
`;
