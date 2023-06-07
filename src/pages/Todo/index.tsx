import { child, get, onValue, ref, set, update } from 'firebase/database';
import { Container, Form, TodosContainer, EmptyDataText, SubTodosContainer } from './styles';
import { firebaseDatabase } from '../../services/firebase';

import { v4 as uuidv4 } from 'uuid'
import { ITodo, ITodoBody, setData } from '../../store/todos/todosSlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import Card from '../../components/Card';
import { useCallback, useEffect, useState } from 'react';
import Modal from '../../components/Modal';
import { toggleAddTodoModalOpened, toggleViewTodoModalOpened } from '../../store/app/appSlice';
import Input from '../../components/Input';
import Button from '../../components/Button';
import FormGroup from '../../components/FormGroup';
import Select from '../../components/Select';
import SubTodoCard from '../../components/SubTodoCard';

export default function Todo() {
  const dispatch = useAppDispatch();

  const [selectedTodoId, setSelectedTodoId] = useState('');
  const [todoValue, setTodoValue] = useState('');
  const [parentTodo, setParentTodo] = useState('');

  const [subTodos, setSubTodos] = useState<ITodo[]>([]);

  const todos = useAppSelector(state => state.todos.data);
  const {isAddTodoModalOpened, isViewTodoModalOpened} = useAppSelector(state => state.app.data);

  function clearForm() {
    setSelectedTodoId('');
    setTodoValue('');
    setParentTodo('');
    setSubTodos([])
  }

  function handleCloseAddTodoModal() {
    dispatch(toggleAddTodoModalOpened());
  }

  function handleCloseViewTodoModal() {
    dispatch(toggleViewTodoModalOpened());
  }

  function handleOpenUpdateTodoModal(todo: ITodo) {
    dispatch(toggleViewTodoModalOpened());
    setSelectedTodoId(todo.id);
    setTodoValue(todo.task);
    
    const dbRef = ref(firebaseDatabase);
    get(child(dbRef, `todos`)).then(async (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        
        const parsedTodos = Object.entries(data).map(([key, value]: any) => {
          const todoBody: ITodoBody = value; 
          
          return {
            id: key,
            ...todoBody
          };
        });

        const onlySubTodos = parsedTodos.filter(filteredTodo => filteredTodo.parentTodo === todo.id);

        setSubTodos(onlySubTodos)
          
        } else {
          console.log("No data available");
        }
    }).catch((error) => {
      console.error(error);
    });
  }

  function handleAddTodo() {
    if (!todoValue) {
      alert('Dados inválidos');
      return;
    }

    const id = uuidv4();

    try {

      set(ref(firebaseDatabase, `todos/${id}`), {
        task: todoValue,
        parentTodo: parentTodo || '',
        isFinished: false
      });

    } catch (err) {
      alert('Erro ao inserir os dados!');      
    } finally {
      dispatch(toggleAddTodoModalOpened());
      clearForm();
    }
  }

  const handleUpdateTodo = async () => {
    if (!selectedTodoId || !todoValue) {
      alert('Dados inválidos!')
      return;
    }

    const dbRef = ref(firebaseDatabase);
    get(child(dbRef, `todos/${selectedTodoId}`)).then(async (snapshot) => {
      if (snapshot.exists()) {
        const todo: ITodo = snapshot.val();

        const updates: Record<string, ITodo> = {
          [`todos/${selectedTodoId}`]: { ...todo, task: todoValue },
        };    
    
        await update(ref(firebaseDatabase), updates);
        
      } else {
        console.log("No data available");
      }
    }).catch((error) => {
      console.error(error);
    });

    dispatch(toggleViewTodoModalOpened());
    clearForm();
  }

  const handleMakeTodoFinished = (todo: ITodo) => {
    const updates: Record<string, ITodo> = {
      [`todos/${todo.id}`]: { ...todo, isFinished: !todo.isFinished },
    };

    return update(ref(firebaseDatabase), updates);
  }

  const handleDesvinculateTodo = (todo: ITodo) => {
    const updates: Record<string, ITodo> = {
      [`todos/${todo.id}`]: { ...todo, parentTodo: '' },
    };

    update(ref(firebaseDatabase), updates);

    setSubTodos(prevState => prevState.filter(prevTodos => prevTodos.id !== todo.id))
  }

  const handleRefresh = useCallback(() => {
    const starCountRef = ref(firebaseDatabase, 'todos');
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();

      if (!data) {
        setData([]);
        return;
      }

      const parsedTodos = Object.entries(data).map(([key, value]: any) => {
        const todoBody: ITodoBody = value; 

        return {
          id: key,
          ...todoBody
        };
      });

      const onlyParentTodos = parsedTodos.filter(todo => todo.parentTodo === '')

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

        {todos.map(todo => (
          <Card 
            key={todo.id} 
            task={todo.task} 
            parentTodo={todo.parentTodo} 
            isFinished={todo.isFinished}
            onFinishTask={() => handleMakeTodoFinished(todo)}
            onUpdateOptionPressed={() => handleOpenUpdateTodoModal(todo)}
          />
        ))}
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

          <FormGroup>
            <span>Informe o todo pai</span>
            <Select onChange={(e) => setParentTodo(e.target.value)}>
              <option value=''>Nenhum</option>
              {todos.map(todo => (
                <option key={todo.id} value={todo.id}>{todo.task}</option>
              ))}
            </Select>
          </FormGroup>

          <FormGroup>
            <Button onClick={handleAddTodo}>
              SALVAR
            </Button>
          </FormGroup>
        </Form>
      </Modal>
      
      <Modal 
        title="ALTERAR TODO"
        show={isViewTodoModalOpened} 
        onClose={handleCloseViewTodoModal}
      >
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
                  onFinishTask={() => handleMakeTodoFinished(todo)}
                  onDeleteButtonPressed={() => handleDesvinculateTodo(todo)}
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
      </Modal>

    </Container>
  )
}