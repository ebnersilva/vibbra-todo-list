import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store/hooks';
import { Container, SidebarItem } from './styles';
import { AiOutlineHome, AiFillQuestionCircle } from "react-icons/ai";

export default function Sidebar() {
  const navigate = useNavigate()
  const { isSidebarOpened } = useAppSelector(state => state.app.data)

  return (
    <Container isOpened={isSidebarOpened}>
      <SidebarItem onClick={() => navigate('/')}>
        <AiOutlineHome   />
        Home
      </SidebarItem>

      <SidebarItem onClick={() => navigate('about')}>
        <AiFillQuestionCircle />
        Sobre
      </SidebarItem>
    </Container>
  )
}