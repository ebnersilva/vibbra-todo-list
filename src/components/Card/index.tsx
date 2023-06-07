import { Container, HasSubTodoContainer, TodoTitle, OptionsContainer, Option, Footer } from './styles'
import { AiFillCheckSquare, AiFillDelete, AiFillEdit } from "react-icons/ai";

interface ICardProps {
  task: string;
  parentTodo: string;
  isFinished: boolean;
  ownerEmail: string;
  isMine: boolean;

  onFinishTask: () => void;
  onUpdateOptionPressed: () => void;
  onDeleteOptionPressed: () => void;
}
export default function Card({ task, parentTodo, isFinished, ownerEmail, isMine, onFinishTask, onUpdateOptionPressed, onDeleteOptionPressed }: ICardProps) {

  return (
    <Container>  
      <TodoTitle>{task}</TodoTitle>

      <OptionsContainer>
        <Option onClick={onUpdateOptionPressed}>
          <AiFillEdit />
        </Option>

        {parentTodo && (
          <HasSubTodoContainer>
            <span>Esse todo tem sub todos</span>
          </HasSubTodoContainer>
        )}

        {isMine && (
          <Option onClick={onDeleteOptionPressed}>
            <AiFillDelete />
          </Option>
        )}

        <Option onClick={onFinishTask}>
          {isFinished && (
            <AiFillCheckSquare />
          )}
        </Option>
      </OptionsContainer>

      <Footer>
        <span>Criado por {ownerEmail}</span>
      </Footer>
    </Container>
  )
}