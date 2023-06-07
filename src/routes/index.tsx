import {
  Route,
  Routes,
} from "react-router-dom";
import Todo from "../pages/Todo";
import About from "../pages/About";
import Layout from "../pages/Layout";
import EditTodo from "../pages/EditTodo";

export default function Router() {
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