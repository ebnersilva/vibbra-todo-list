import {
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/Login";
import TodosList from "../pages/TodosList";
import About from "../pages/About";
import Layout from "../pages/Layout";
import EditTodo from "../pages/EditTodo";
import ShareTodo from "../pages/ShareTodo";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../services/firebase";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { setIsAuthChecked, setUserLoggedIn } from "../store/auth/authSlice";
import LoadingRoute from "../components/LoadingRoute";

function PublicRoutes() {
  return (
    <Routes>
      <Route         
        index
        element={<Login />}
      />
    </Routes>
  )
}

function PrivateRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route         
          index
          element={<TodosList />}
        />
        <Route
          path="about"
          element={<About />}
        />
        <Route
          path="edit-todo/:todoId"
          element={<EditTodo />}
        />
        <Route
          path="share-todo/:todoId"
          element={<ShareTodo />}
        />
      </Route>
    </Routes>
  )
}

export default function Router() {
  const dispatch = useAppDispatch();

  const { userLoggedIn, isAuthChecked } = useAppSelector(state => state.auth.data);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      currentUser?.uid;
      currentUser?.email;

      if (!currentUser || !currentUser.email) {
        dispatch(setUserLoggedIn({
          data: null
        }))
        return;  
      }

      dispatch(setUserLoggedIn({
        data: {
          uid: currentUser.uid,
          email: currentUser.email
        }
      }))
    })

    return () => {
      unsubscribe();
    }
  }, [dispatch])

  useEffect(() => {
    setTimeout(() => {
      dispatch(setIsAuthChecked(true))
    }, 1000)
  }, [dispatch])

  if (!isAuthChecked) {
    return <LoadingRoute />
  }

  if (!userLoggedIn) {
    return <PublicRoutes />
  }

  return <PrivateRoutes />
}