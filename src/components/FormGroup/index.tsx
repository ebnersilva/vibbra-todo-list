import { Container } from './styles';

interface IFormGroupProps {
  children: React.ReactNode;
}

export default function FormGroup({children}: IFormGroupProps) {
  return (
    <Container>
      {children}
    </Container>
  )
}