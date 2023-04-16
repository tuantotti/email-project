import Content from "./components/Content/Content";
import Navbar from "./components/Navigation/Navbar";
import SideBar from "./components/SideBar/SideBar";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="body">
          <SideBar />
          <Content />
        </div>
      </div>
    </Router>
  );
}

export default App;
