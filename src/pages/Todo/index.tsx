import { onValue, ref, remove, update } from 'firebase/database';
import { Container, Form, TodosContainer, EmptyDataText } from './styles';
import { firebaseDatabase } from '../../services/firebase';

import { ITodo, ITodoBody, setData } from '../../store/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Card from '../../components/Card';
import { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { toggleAddTodoModalOpened } from '../../store/app/appSlice';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Select from '../../components/Select';
import { useNavigate } from 'react-router-dom';

import useTodo from '../../hooks/useTodo';
import { toast } from 'react-toastify';

export default function Todo() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { addTodo, toggleTodo } = useTodo();

  const [todoValue, setTodoValue] = useState('');
  const [parentTodo, setParentTodo] = useState('');

  const todos = useAppSelector(state => state.todos.data);
  const {isAddTodoModalOpened} = useAppSelector(state => state.app.data);
  const { userLoggedIn } = useAppSelector(state => state.auth.data);

  function clearForm() {
    setTodoValue('');
    setParentTodo('');
  }

  function handleCloseAddTodoModal() {
    dispatch(toggleAddTodoModalOpened());
  }

  async function handleDeleteTodo(todoId: string) {
    if (!todoId) {
      alert('Id inválido')
      return;
    }

    const refCards = ref(firebaseDatabase, `todos/${todoId}`);
    await remove(refCards);
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

  const handleMakeTodoFinished = async (todo: ITodo) => {
    const { status, message } = await toggleTodo(todo.id);

    if (!status) {
      toast.error(message);
      return;
    }

    toast.success('Dados alterados com sucesso!')
  }

  const handleRefresh = useCallback(() => {
    const todosRef = ref(firebaseDatabase, 'todos');

    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        dispatch(setData([]))
        return;
      }

      const parsedTodos = Object.entries(data).map(([key, value]: any) => {
        const todoBody: ITodoBody = value; 

        return {
          id: key,
          ...todoBody
        };
      });

      const onlyParentTodos = parsedTodos.filter(todo => todo.parentTodo === '').sort((a, b) => Number(a.createdAt) - Number(b.createdAt));

      dispatch(setData(onlyParentTodos))
    });
    
  }, [dispatch]);

  useEffect(() => {
    handleRefresh();
  }, [handleRefresh])


  return (
    <Container>
      <TodosContainer>
        {todos.length === 0 && (
          <EmptyDataText>Nenhum todo cadastrado</EmptyDataText>
        )}

        {todos.map(todo => {
          if (!userLoggedIn) return;

          const isMine = todo.ownerEmail === userLoggedIn.email;

          return (
            <Card 
              key={todo.id} 
              task={todo.task} 
              parentTodo={todo.parentTodo} 
              isFinished={todo.isFinished}
              ownerEmail={todo.ownerEmail}
              isMine={isMine}
              onFinishTask={() => handleMakeTodoFinished(todo)}
              onUpdateOptionPressed={() => navigate(`edit-todo/${todo.id}`)}
              onDeleteOptionPressed={() => handleDeleteTodo(todo.id)}
            />
          )
        })}
      </TodosContainer>

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
            <Button onClick={handleAddTodo}>
              SALVAR
            </Button>
          </FormGroup>
        </Form>
      </Modal>

    </Container>
  )
}