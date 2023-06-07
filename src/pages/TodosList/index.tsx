import { onValue, ref, remove } from 'firebase/database';
import { Container, TodosContainer, EmptyDataText } from './styles';
import { firebaseDatabase } from '../../services/firebase';

import { ITodo, ITodoBody, setData } from '../../store/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import ParentTodoCard from '../../components/ParentTodoCard';
import { useCallback, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import useTodo from '../../hooks/useTodo';
import { toast } from 'react-toastify';
import AddTodoModal from '../../components/AddTodoModal';

export default function TodosList() {
  const navigate = useNavigate();

  const dispatch = useAppDispatch();

  const { toggleTodo } = useTodo();


  const todos = useAppSelector(state => state.todos.data);
  const { userLoggedIn } = useAppSelector(state => state.auth.data);

  async function handleDeleteTodo(todoId: string) {
    if (!todoId) {
      alert('Id inválido')
      return;
    }

    const refCards = ref(firebaseDatabase, `todos/${todoId}`);
    await remove(refCards);
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
            <ParentTodoCard 
              key={todo.id} 
              task={todo.task} 
              parentTodo={todo.parentTodo} 
              isFinished={todo.isFinished}
              ownerEmail={todo.ownerEmail}
              isMine={isMine}
              onFinishTask={() => handleMakeTodoFinished(todo)}
              onUpdateOptionPressed={() => navigate(`edit-todo/${todo.id}`)}
              onDeleteOptionPressed={() => handleDeleteTodo(todo.id)}
              onShareOptionPressed={() => navigate(`share-todo/${todo.id}`)}
            />
          )
        })}
      </TodosContainer>

      <AddTodoModal />

    </Container>
  )
}