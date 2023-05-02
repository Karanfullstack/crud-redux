import React from "react";
import Navigation from "./components/Navigation";
import Create from "./components/Create";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Read from "./components/Read";
import Edit from "./components/Edit";
const App = () => {
  return (
    <Router>
      <Navigation />
      <Routes>
        <Route path="/" element={<Create />}></Route>
        <Route path="/read" element={<Read />}></Route>
        <Route path="/edit/:id" element={<Edit />}></Route>
      </Routes>
    </Router>
  );
};

export default App;
