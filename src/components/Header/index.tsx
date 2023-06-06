import { Container, Title, ButtonToggle } from './styles';
import { AiOutlineMenu } from "react-icons/ai";
import { useAppDispatch } from '../../store/hooks';
import { incremented } from '../../store/counter/counterSlice';
import { useTheme } from 'styled-components';

export default function Header() {
  const { colors } = useTheme();

  const dispatch = useAppDispatch();


  function handleOnClickHeader() {
    dispatch(incremented());


  }

  return (
    <Container>
      <ButtonToggle onClick={handleOnClickHeader}>
        <AiOutlineMenu size={20} color={colors.black00} />
      </ButtonToggle>

      <Title>Vibbra - Todo App</Title>
    </Container>
  )
}