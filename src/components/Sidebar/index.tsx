import { Container, ItemText, SidebarItem } from './styles';

export default function Sidebar() {
  return (
    <Container>
      <SidebarItem>
        <ItemText>Home</ItemText>
      </SidebarItem>

      <SidebarItem>
        <ItemText>Sobre</ItemText>
      </SidebarItem>
    </Container>
  )
}