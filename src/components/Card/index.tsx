import { Container, HasSubTodoContainer, TodoTitle, Option } from './styles'
import { AiFillCheckSquare, AiFillEdit } from "react-icons/ai";

interface ICardProps {
  task: string;
  parentTodo: string;
  isFinished: boolean;

  onFinishTask: () => void;
  onUpdateOptionPressed: () => void;
}
export default function Card({ task, parentTodo, isFinished, onFinishTask, onUpdateOptionPressed }: ICardProps) {
  return (
    <Container>
      <Option onClick={onFinishTask}>
        {isFinished && (
          <AiFillCheckSquare />
        )}
      </Option>
        
      <TodoTitle>{task}</TodoTitle>

      <Option onClick={onUpdateOptionPressed}>
        <AiFillEdit />
      </Option>

      {parentTodo && (
        <HasSubTodoContainer>
          <span>Esse todo tem sub todos</span>
        </HasSubTodoContainer>
      )}


    </Container>
  )
}