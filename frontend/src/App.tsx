import "./App.css";
import { Tree, Form, Users } from "./Pages";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
      <Route
          path="/"
          element={
            <div className="App">
              <Tree />
            </div>
          }
        />       
        <Route
          path="registration"
          element={
            <div className="App">
              <Form />
            </div>
          }
        />
        <Route
          path="/users"
          element={
            <div className="App">
              <Users />
            </div>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}
