import { useNavigate, useParams } from 'react-router-dom';
import { Container, Form, SubTodosContainer } from './styles';
import FormGroup from '../../components/FormGroup';
import Input from '../../components/Input';
import ButtonPrimary from '../../components/ButtonPrimary';
import ButtonSecondary from '../../components/ButtonSecondary';
import { useCallback, useEffect, useState } from 'react';
import { firebaseDatabase } from '../../services/firebase';
import { child, get, ref } from 'firebase/database';
import { ITodo, ITodoBody } from '../../store/todos/todosSlice';
import SubTodoCard from '../../components/SubTodoCard';
import useTodo from '../../hooks/useTodo';
import AddSubTodoModal from '../../components/AddSubTodoModal';
import { useAppDispatch } from '../../store/hooks';
import { toggleAddSubTodoModalOpened } from '../../store/app/appSlice';
import { toast } from 'react-toastify';

export default function EditTodo() {
  const dispatch = useAppDispatch();

  const { todoId } = useParams();
  const navigate = useNavigate();

  const { updateTodo, desvinculateTodo, toggleTodo } = useTodo();

  const [todoValue, setTodoValue] = useState('');
  const [subTodos, setSubTodos] = useState<ITodo[]>([]);


  const chargeSubTodos = useCallback( async (todoIdParam: string) => {
    const dbRef = ref(firebaseDatabase);

    try {
      const snapshot = await get(child(dbRef, `todos`));

      if (snapshot.exists()) {
        const data = snapshot.val();
          
        const parsedTodos = Object.entries(data).map(([key, value]: any) => {
          const todoBody: ITodoBody = value; 
          
          return {
            id: key,
            ...todoBody
          };
        });

        const onlySubTodos = parsedTodos.filter(filteredTodo => filteredTodo.parentTodo === todoIdParam).sort((a, b) => Number(a.createdAt) - Number(b.createdAt));

        console.log('Sub Todos: ', onlySubTodos)

        setSubTodos(onlySubTodos)
      }
    } catch (err) {
      toast.error('Falha ao carregar os sub todos');
    }
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
      toast.error('Id do TODO inválido');
      return;
    }

    const { status, message } = await updateTodo(todoId, todoValue);

    if (!status) {
      alert(message)
      return;
    }

    toast.success('Dados alterados com sucesso')
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

    await chargeSubTodos(todoId);

    toast.success('Dados alterados com sucesso!');
  }

  const handleDesvinculateTodo = async (desvinculateTodoId: string) => {
    if (!todoId) {
      toast.error('Erro inesperado. Tente novamente!');
      return;
    }

    const {status, message} = await desvinculateTodo(desvinculateTodoId)
    
    if (!status) {
      alert(message)
      return;
    }

    await chargeSubTodos(todoId);

    toast.success('Sucesso ao desvincular o todo')
  }

  const handleOpenAddSubTodoModal = () => {
    dispatch(toggleAddSubTodoModalOpened())
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
          <span>Nome da tarefa</span>
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
          <ButtonSecondary onClick={handleOpenAddSubTodoModal}>
            ADICIONAR SUB TODO
          </ButtonSecondary>
        </FormGroup>

        <FormGroup>
          <ButtonPrimary onClick={handleUpdateTodo}>
            SALVAR
          </ButtonPrimary>
        </FormGroup>
      </Form>

      {todoId && (
        <AddSubTodoModal todoId={todoId} onSubTodoAdded={() => {
          chargeSubTodos(todoId);
        }} />
      )}
    </Container>
  )

}