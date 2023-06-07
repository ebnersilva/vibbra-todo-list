import { child, get, ref, serverTimestamp, set, update } from 'firebase/database';
import { v4 as uuidv4 } from 'uuid'
import { firebaseDatabase } from '../services/firebase';
import { ITodo } from '../store/todos/todosSlice';
import { useAppSelector } from '../store/hooks';
import { toast } from 'react-toastify';

export default function useTodo() {
  const { userLoggedIn } = useAppSelector(state => state.auth.data);

  async function addTodo(todoValue: string, parentTodo: string) {
    if (!todoValue || !userLoggedIn) {
      return {
        message: 'Dados inválidos',
        status: false,
      };
    }

    const id = uuidv4();

    try {
      await set(ref(firebaseDatabase, `todos/${id}`), {
        ownerId: userLoggedIn.uid,
        ownerEmail: userLoggedIn.email,
        task: todoValue,
        parentTodo: parentTodo || '',
        isFinished: false,
        isShared: false,
        createdAt: serverTimestamp()
      });

      return {
        message: 'Dados alterados com sucesso',
        status: true,
      };
    } catch (err) {
      return {
        message: 'Erro ao inserir os dados',
        status: false,
      };
    }
  }

  const updateTodo = async (todoId: string, todoValue: string) => {
    if (!todoId || !todoValue) {
      return {
        message: 'Dados inválidos',
        status: true,
      };
    }

    try {
      const dbRef = ref(firebaseDatabase);
      
      const snapshot = await get(child(dbRef, `todos/${todoId}`));
      
      if (snapshot.exists()) {
        const todo: ITodo = snapshot.val();

        const updates: Record<string, ITodo> = {
          [`todos/${todoId}`]: { ...todo, task: todoValue },
        };    
    
        await update(ref(firebaseDatabase), updates);

        return {
          message: 'Dados alterados com sucesso!',
          status: true
        }
      }

      return {
        message: 'Nenhum todo encontrado!',
        status: false
      }
    } catch(err) {
      return {
        message: 'Erro ao alterar o todo!',
        status: false
      }
    }
  }

  const desvinculateTodo = async (todoId: string) => {
    if (!todoId) {
      return {
        status: false,
        message: 'Id inválido'
      }
    }

    try {
      const dbRef = ref(firebaseDatabase);
      const snapshot = await get(child(dbRef, `todos/${todoId}`));

      if (!snapshot.exists()) {
        return {
          status: false,
          message: 'Nenhum todo encontrado!'
        }
      }

      const updates: Record<string, ITodo> = {
        [`todos/${todoId}`]: { ...snapshot.val(), parentTodo: '' },
      };
  
      await update(ref(firebaseDatabase), updates);

      return {
        status: true,
        message: 'Todo desvinculado com sucesso'
      }
    } catch(err) {
      return {
        status: false,
        message: 'Erro ao desvincular o todo!'
      }
    }
    
  }

  const toggleTodo = async (todoId: string) => {
    if (!todoId) {
      return {
        status: false,
        message: 'Id inválido'
      }
    }

    try {
      const dbRef = ref(firebaseDatabase);
      const snapshot = await get(child(dbRef, `todos/${todoId}`));

      if (!snapshot.exists()) {
        return {
          status: false,
          message: 'Nenhum todo encontrado!'
        }
      }

      const selectedTodo: ITodo = snapshot.val();

      const updates: Record<string, ITodo> = {
        [`todos/${todoId}`]: { ...selectedTodo, isFinished: !selectedTodo.isFinished },
      };
  
      await update(ref(firebaseDatabase), updates);

      return {
        status: true,
        message: 'Todo finalizado com sucesso'
      }
    } catch(err) {
      return {
        status: false,
        message: 'Erro ao finalizar o todo!'
      }
    }
  }

  return { addTodo, updateTodo, desvinculateTodo, toggleTodo }
}