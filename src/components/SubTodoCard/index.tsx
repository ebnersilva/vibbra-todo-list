import { Container, TodoTitle, Option, CheckboxContainer } from './styles'
import {  AiOutlineArrowsAlt, AiOutlineCheck } from "react-icons/ai";

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
      <TodoTitle>{task}</TodoTitle>

      <Option onClick={onDeleteButtonPressed}>
        <AiOutlineArrowsAlt />
        <span>Desvincular</span>
      </Option>

      <Option onClick={onFinishTask}>
        {isFinished && (
          <>
            <CheckboxContainer>
              <AiOutlineCheck />
            </CheckboxContainer>
            <span>Concluido</span>
          </>
        )}
        {!isFinished && (
          <>
          <CheckboxContainer />
          <span>Não concluído</span>
          </>
        )}  
      </Option>

    </Container>
  )
}