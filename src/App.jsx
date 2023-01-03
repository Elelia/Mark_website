import React from "react";
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Connexion from "./components/connexion/connexion_page";
import ChoicePage from "./components/choice/choice_page";

function App() {
  return (
      <Router>
        <Route exact path="/" component={Connexion} />
        <Route path="/profile" component={ChoicePage} />
      </Router>
  );
}

export default App;
