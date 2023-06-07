import { Container, ModalContainer,CloseButton, Header } from './styles'
import { AiOutlineClose } from "react-icons/ai";

interface IModal {
  title: string;
  show: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

export default function Modal({ title, show, onClose, children }: IModal) {
 
  function handleOnCloseModal() {
    onClose();
  }

  return (
    <Container show={show}>
      <ModalContainer>
        <Header>
          <span>{title}</span>
        </Header>
        <CloseButton onClick={handleOnCloseModal}>
          <AiOutlineClose />
        </CloseButton>

        {children}
        
      </ModalContainer>
    </Container>
  )
}