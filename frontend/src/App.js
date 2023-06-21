import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import SignIn from "./components/Authentication/SignIn/SignIn";
import Content from "./components/Content/Content";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="*" element={<Content />} />
        <Route path="signin" element={<SignIn />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

