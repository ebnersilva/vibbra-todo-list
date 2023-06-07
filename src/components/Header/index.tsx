import { Container, SectionContent, Title, ButtonToggle, Button } from './styles';
import { AiOutlineMenu, AiOutlineClose, AiFillPlusCircle, AiOutlineLogout } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTheme } from 'styled-components';
import { toggleAddTodoModalOpened, toggleSidebar } from '../../store/app/appSlice';
import { signOut } from 'firebase/auth';
import { auth } from '../../services/firebase';

export default function Header() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const { isSidebarOpened } = useAppSelector(state => state.app.data);
  const { userLoggedIn } = useAppSelector(state => state.auth.data);

  function handleOnClickHeader() {
    dispatch(toggleSidebar());
  }

  function handleAddTodo() {
    dispatch(toggleAddTodoModalOpened());
  }

  async function handleLogout() {
    await signOut(auth);
  }

  return (
    <Container>
      <SectionContent>
        <ButtonToggle onClick={handleOnClickHeader}>
          {isSidebarOpened && (
            <AiOutlineClose size={20} color={colors.black500} />
          )}

          {!isSidebarOpened && (
            <AiOutlineMenu size={20} color={colors.black500} />
          )}
        </ButtonToggle>
        
        <Title>Vibbra - Todo App - Usuário Logado: {userLoggedIn?.email}</Title>
      </SectionContent>


      <SectionContent>
        <Button onClick={handleAddTodo}>
          <AiFillPlusCircle size={20} color={colors.black500} />
        </Button>

        <Button onClick={handleLogout}>
          <AiOutlineLogout size={20} color={colors.black500} />
        </Button>
      </SectionContent>

    </Container>
  )
}