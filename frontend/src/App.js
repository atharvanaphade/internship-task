import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from './pages/Home';
import Project from "./pages/Project";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/project/:id" element={<Project />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
