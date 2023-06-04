import {
  Route,
  Routes,
} from "react-router-dom";
import Todo from "../pages/Todo";
import ErrorPage from "../pages/ErrorPage";
import About from "../pages/About";
import Layout from "../pages/Layout";

export default function Router() {
  return (
    <Routes>
      <Route path="/" errorElement={<ErrorPage />} element={<Layout />}>
        <Route         
          index
          element={<Todo />}
        />
        <Route
          path="about"
          element={<About />}
        />
      </Route>
    </Routes>
  )
}