import { Container, TodoTitle, Option } from './styles'
import { AiFillCheckSquare, AiOutlineDelete } from "react-icons/ai";

interface ISubTodoCardProps {
  task: string;
  subTask: string;
  isFinished: boolean;

  onFinishTask: () => void;
  onDeleteButtonPressed: () => void;
}
export default function SubTodoCard({ task, isFinished, onFinishTask, onDeleteButtonPressed }: ISubTodoCardProps) {
  return (
    <Container>
      <Option onClick={onFinishTask}>
        {isFinished && (
          <AiFillCheckSquare />
        )}
      </Option>
        
      <TodoTitle>{task}</TodoTitle>

      <Option onClick={onDeleteButtonPressed}>
        <AiOutlineDelete />
      </Option>

    </Container>
  )
}