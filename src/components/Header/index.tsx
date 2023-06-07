import { Container, LeftCard, Title, ButtonToggle, AddButton } from './styles';
import { AiOutlineMenu, AiOutlineClose, AiFillPlusCircle } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTheme } from 'styled-components';
import { toggleAddTodoModalOpened, toggleSidebar } from '../../store/app/appSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const { isSidebarOpened } = useAppSelector(state => state.app.data);


  function handleOnClickHeader() {
    dispatch(toggleSidebar());
  }

  function handleAddTodo() {
    dispatch(toggleAddTodoModalOpened());
  }

  return (
    <Container>
      <LeftCard>
        <ButtonToggle onClick={handleOnClickHeader}>
          {isSidebarOpened && (
            <AiOutlineClose size={20} color={colors.black500} />
          )}

          {!isSidebarOpened && (
            <AiOutlineMenu size={20} color={colors.black500} />
          )}
        </ButtonToggle>
        
        <Title>Vibbra - Todo App</Title>
      </LeftCard>

      <AddButton onClick={handleAddTodo}>
        <AiFillPlusCircle size={20} color={colors.black500} />
      </AddButton>

    </Container>
  )
}