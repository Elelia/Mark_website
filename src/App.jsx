import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connexion from "./components/connexion/connexion_page";
import ChoicePage from "./components/choice/choice_page";
import StreamingHome from "./components/streaming/streaming_home_page";
import TicketHome from "./components/ticket/ticket_home_page";
import Navbar from "./components/nav/navbar";

function App() {
  return (
      <BrowserRouter>
          <Navbar/>
          <Routes>
            <Route exact path="/" element={<Connexion/>} />
          </Routes>
          <Routes>
            <Route path="/choice" element={<ChoicePage/>} />
          </Routes>
          <Routes>
              <Route path="/streaming" element={<StreamingHome/>} />
          </Routes>
          <Routes>
              <Route path="/ticket" element={<TicketHome/>} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
