import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, SubTodosContainer } from './styles';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import Button from '../../components/Button';
import { useCallback, useEffect, useState } from 'react';
import { firebaseDatabase } from '../../services/firebase';
import { child, get, ref } from 'firebase/database';
import { ITodo, ITodoBody } from '../../store/todos/todosSlice';
import SubTodoCard from '../../components/SubTodoCard';
import useTodo from '../../hooks/useTodo';

export default function EditTodo() {
  const { todoId } = useParams();
  const navigate = useNavigate();

  const { updateTodo, desvinculateTodo, toggleTodo } = useTodo();

  const [todoValue, setTodoValue] = useState('');
  const [subTodos, setSubTodos] = useState<ITodo[]>([]);


  const chargeSubTodos = useCallback((todoIdParam: string) => {
    const dbRef = ref(firebaseDatabase);
    get(child(dbRef, `todos`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        const parsedTodos = Object.entries(data).map(([key, value]: any) => {
          const todoBody: ITodoBody = value; 
          
          return {
            id: key,
            ...todoBody
          };
        });

        const onlySubTodos = parsedTodos.filter(filteredTodo => filteredTodo.parentTodo === todoIdParam);

        setSubTodos(onlySubTodos)
          
        } else {
          console.log("No data available");
        }
    }).catch((error) => {
      console.error(error);
    });
  }, [])

  const chargeMainTodoData = useCallback((todoIdParam: string) => {
    const dbRef = ref(firebaseDatabase);
    get(child(dbRef, `todos/${todoIdParam}`)).then((snapshot) => {
      if (snapshot.exists()) {
        const data: ITodo = snapshot.val();

        setTodoValue(data.task);

      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });
  }, []);

  const handleUpdateTodo = async () => {
    if (!todoId) {
      alert('Id do todo inválido');
      return;
    }

    const { status, message } = await updateTodo(todoId, todoValue);

    if (!status) {
      alert(message)
      return;
    }

    navigate('/');
  }

  const handleToggleTodo = async (todoIdParam: string) => {
    if (!todoIdParam) {
      alert('Id do todo inválido');
      return;
    }

    if (!todoId) {
      alert('Id do todo selecionado inválido');
      return;
    }

    const { status, message } = await toggleTodo(todoIdParam);

    if (!status) {
      alert(message)
      return;
    }

    chargeSubTodos(todoId);
  }

  const handleDesvinculateTodo = async (todoId: string) => {
    const {status, message} = await desvinculateTodo(todoId)
    
    if (!status) {
      alert(message)
      return;
    }

    navigate('/')
  }

  useEffect(() => {
    if (!todoId) return;

    chargeMainTodoData(todoId);
    chargeSubTodos(todoId);

  }, [todoId, chargeMainTodoData, chargeSubTodos])


  return (
    <Container>
      <Form>
        <FormGroup>
          <Input 
            placeholder="Nome da tarefa" 
            onChange={(e) => setTodoValue(e.target.value)} 
            value={todoValue}
          />
        </FormGroup>


        {subTodos.length > 0 && (
          <SubTodosContainer>
            {subTodos.map(todo => (
              <SubTodoCard 
                isFinished={todo.isFinished}
                onFinishTask={() => handleToggleTodo(todo.id)}
                onDeleteButtonPressed={() => handleDesvinculateTodo(todo.id)}
                subTask={todo.parentTodo}
                task={todo.task}
                key={todo.id}
              />
            ))}
          </SubTodosContainer>
        )}
        

        <FormGroup>
          <Button onClick={handleUpdateTodo}>
            SALVAR
          </Button>
        </FormGroup>
      </Form>
    </Container>
  )

}