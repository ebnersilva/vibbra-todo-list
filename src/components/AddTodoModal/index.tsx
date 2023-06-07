import { useState } from "react";

import { toggleAddTodoModalOpened } from "../../store/app/appSlice";
import { useAppDispatch, useAppSelector } from "../../store/hooks";

import useTodo from '../../hooks/useTodo';

import FormGroup from "../FormGroup";
import Input from "../Input";
import Modal from "../Modal";
import Select from "../Select";
import ButtonPrimary from "../ButtonPrimary";

import { Form } from './styles';

export default function AddTodoModal() {
  const dispatch = useAppDispatch();
  
  const todos = useAppSelector(state => state.todos.data);
  const {isAddTodoModalOpened} = useAppSelector(state => state.app.data);

  const { addTodo } = useTodo();

  const [todoValue, setTodoValue] = useState('');
  const [parentTodo, setParentTodo] = useState('');

  function handleCloseAddTodoModal() {
    dispatch(toggleAddTodoModalOpened());
  }

  function clearForm() {
    setTodoValue('');
    setParentTodo('');
  }

  async function handleAddTodo() {
    const { status, message } = await addTodo(todoValue, parentTodo);

    if (!status) {
      alert(message)
      return;
    }

    dispatch(toggleAddTodoModalOpened());
    clearForm();
  }

  return (
    <Modal 
        title="CADASTRAR TODO"
        show={isAddTodoModalOpened} 
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

          {todos.length > 0 && (
            <FormGroup>
              <span>Informe o todo pai</span>
              <Select onChange={(e) => setParentTodo(e.target.value)}>
                <option value=''>Nenhum</option>
                {todos.map(todo => (
                  <option key={todo.id} value={todo.id}>{todo.task}</option>
                ))}
              </Select>
            </FormGroup>
          )}

          <FormGroup>
            <ButtonPrimary onClick={handleAddTodo}>
              SALVAR
            </ButtonPrimary>
          </FormGroup>
        </Form>
    </Modal>
  )
}