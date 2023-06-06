import { Container, Title, ButtonToggle } from './styles';
import { AiOutlineMenu, AiOutlineClose } from "react-icons/ai";
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { useTheme } from 'styled-components';
import { toggleSidebar } from '../../store/app/appSlice';

export default function Header() {
  const dispatch = useAppDispatch();
  const { colors } = useTheme();

  const { isSidebarOpened } = useAppSelector(state => state.app.data);


  function handleOnClickHeader() {
    dispatch(toggleSidebar());
  }

  return (
    <Container>
      <ButtonToggle onClick={handleOnClickHeader}>
        {isSidebarOpened && (
          <AiOutlineClose size={20} color={colors.black500} />
        )}

        {!isSidebarOpened && (
          <AiOutlineMenu size={20} color={colors.black500} />
        )}
      </ButtonToggle>

      <Title>Vibbra - Todo App</Title>
    </Container>
  )
}