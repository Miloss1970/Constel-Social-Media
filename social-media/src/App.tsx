import {
  Navigate,
  Route,
  BrowserRouter as Router,
  Routes,
} from "react-router-dom";
import "./App.css";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import AuthGuarding from "./utills/authGuarding/AuthGuarding";

function App() {
  return (
    <Router>
      <Routes>
        <Route
          path="/home"
          element={
            <AuthGuarding>
              <Home />
            </AuthGuarding>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Navigate to="/home" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
