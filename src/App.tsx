import Home from "./components/Home";
import ListEmpl from "./components/ListEmpl";
import AddEmployee from "./components/AddEmployee";
import EmplDetail from "./components/EmplDetail";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import "./App.css";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employees" element={<ListEmpl />} />
          <Route path="/add-employee" element={<AddEmployee />} />
          <Route path="/employee-details/:id" element={<EmplDetail />} />
          {/* <Route path="/delete-employee/:id" element={<ListEmpl />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
