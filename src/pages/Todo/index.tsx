import { onValue, ref, set } from 'firebase/database';
import { Container } from './styles';
import { firebaseDatabase } from '../../services/firebase';

import { v4 as uuidv4 } from 'uuid'
import { ITodoBody, setData } from '../../store/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

export default function Todo() {
  const dispatch = useAppDispatch();

  const todos = useAppSelector(state => state.todos.data);


  function handleWriteTodo() {
    const id = uuidv4();

    set(ref(firebaseDatabase, `todos/${id}`), {
      task: `Todo ${id}`,
      subTask: '333333'
    });
  }


  function handleUpdate() {
    const starCountRef = ref(firebaseDatabase, 'todos');
    onValue(starCountRef, (snapshot) => {
      console.log('rodou')
      const data = snapshot.val();

      const parsedTodos = Object.entries(data).map(([key, value]: any) => {
        const todoBody: ITodoBody = value; 

        return {
          id: key,
          ...todoBody
        };
      });

      dispatch(setData(parsedTodos))
    });
    
  }


  return (
    <Container>
      <button onClick={handleWriteTodo}>
        Add Todo
      </button>

      <button onClick={handleUpdate}>
        Atualizar
      </button>


      <ul>
        {todos.map(todo => (
          <li>{todo.task}</li>
        ))}
        
      </ul>
    </Container>
  )
}