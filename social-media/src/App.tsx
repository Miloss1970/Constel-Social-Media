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
import { Toaster } from "react-hot-toast";

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
      <Toaster
        position="top-center"
        gutter={12}
        containerStyle={{ margin: "8px" }}
        toastOptions={{
          success: {
            duration: 3000,
          },
          error: {
            duration: 5000,
          },
          style: {
            fontSize: "16px",
            maxWidth: "500px",
            padding: "16px 24px",
            backgroundColor: "#F9F9F9",
            color: "#222222",
          },
        }}
      />
    </Router>
  );
}

export default App;
