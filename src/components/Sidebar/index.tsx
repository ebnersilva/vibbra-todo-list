import { useAppSelector } from '../../store/hooks';
import { Container, SidebarItem } from './styles';
import { AiOutlineHome, AiFillQuestionCircle } from "react-icons/ai";

export default function Sidebar() {
  const { isSidebarOpened } = useAppSelector(state => state.app.data)

  return (
    <Container isOpened={isSidebarOpened}>
      <SidebarItem>
        <AiOutlineHome   />
        Home
      </SidebarItem>

      <SidebarItem>
        <AiFillQuestionCircle />
        Sobre
      </SidebarItem>
    </Container>
  )
}