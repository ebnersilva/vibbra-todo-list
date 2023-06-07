import { useState } from "react";

import { toggleAddSubTodoModalOpened } from "../../store/app/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import useTodo from '../../hooks/useTodo';

import FormGroup from "../FormGroup";
import Input from "../Input";
import Modal from "../Modal";
import ButtonPrimary from "../ButtonPrimary";

import { Form } from './styles';

interface IAddTodoModal {
  todoId: string;
  onSubTodoAdded: () => void;
}

export default function AddSubTodoModal({ todoId, onSubTodoAdded }: IAddTodoModal) {
  const dispatch = useAppDispatch();
  const {isAddSubTodoModalOpened} = useAppSelector(state => state.app.data);
  const { addTodo } = useTodo();

  const [todoValue, setTodoValue] = useState('');

  function handleCloseAddTodoModal() {
    dispatch(toggleAddSubTodoModalOpened());
  }

  function clearForm() {
    setTodoValue('');
  }

  async function handleAddTodo() {
    const { status, message } = await addTodo(todoValue, todoId);

    if (!status) {
      alert(message)
      return;
    }

    dispatch(toggleAddSubTodoModalOpened());
    onSubTodoAdded();
    clearForm();
  }

  return (
    <Modal 
        title="CADASTRAR SUB TODO"
        show={isAddSubTodoModalOpened} 
        onClose={handleCloseAddTodoModal}
      >
        <Form>
          <FormGroup>
            <span>Nome da tarefa</span>
            <Input 
              placeholder="Nome da tarefa" 
              onChange={(e) => setTodoValue(e.target.value)} 
              value={todoValue}
            />
          </FormGroup>

          <FormGroup>
            <ButtonPrimary onClick={handleAddTodo}>
              SALVAR
            </ButtonPrimary>
          </FormGroup>
        </Form>
    </Modal>
  )
}