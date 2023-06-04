import { Outlet } from 'react-router-dom';
import Header from '../../components/Header';
import Sidebar from '../../components/Sidebar';
import {Container, Main, ContentContainer} from './styles';

export default function Layout() {
  return (
    <Container>
      <Header />

      <Main>
        <Sidebar />

        <ContentContainer>
          <Outlet />
        </ContentContainer>
      </Main>
    </Container>
  )
}