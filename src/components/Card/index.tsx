import { Container, HasSubTodoContainer, TodoTitle, Option } from './styles'
import { AiFillCheckSquare, AiFillDelete, AiFillEdit } from "react-icons/ai";

interface ICardProps {
  task: string;
  parentTodo: string;
  isFinished: boolean;

  onFinishTask: () => void;
  onUpdateOptionPressed: () => void;
  onDeleteOptionPressed: () => void;
}
export default function Card({ task, parentTodo, isFinished, onFinishTask, onUpdateOptionPressed, onDeleteOptionPressed }: ICardProps) {
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

      <Option onClick={onDeleteOptionPressed}>
        <AiFillDelete />
      </Option>

    </Container>
  )
}