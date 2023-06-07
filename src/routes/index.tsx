import {
  Route,
  Routes,
} from "react-router-dom";
import Login from "../pages/Login";
import Todo from "../pages/Todo";
import About from "../pages/About";
import Layout from "../pages/Layout";
import EditTodo from "../pages/EditTodo";
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
          element={<Todo />}
        />
        <Route
          path="about"
          element={<About />}
        />
        <Route
          path="edit-todo/:todoId"
          element={<EditTodo />}
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
      dispatch(setUserLoggedIn({
        data: currentUser
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