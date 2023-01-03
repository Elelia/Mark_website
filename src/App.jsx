import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connexion from "./components/connexion/connexion_page";
import ChoicePage from "./components/choice/choice_page";

function App() {
  return (
      <BrowserRouter>
          <Routes>
            <Route exact path="/" element={<Connexion/>} />
          </Routes>
          <Routes>
            <Route path="/profile" element={<ChoicePage/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
