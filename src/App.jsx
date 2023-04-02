import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connexion from "./components/connexion/connexion_page";
import StreamingHome from "./components/streaming/streaming_home_page";
import Navbar from "./components/nav/navbar";
import Contact from "./components/contact/contact";
import Profile from "./components/profile/profile_page";
import Deconnexion from "./components/deconnexion/deconnexion";
import Administration from "./components/administration/administration_page";
import Modification from "./components/administration/modification_page";
import Ajout from "./components/administration/add_page";
import {UserProvider} from "./components/userContext";

function App() {

    return (
          <UserProvider>
              <BrowserRouter>
                  <Navbar/>
                  <Routes>
                    <Route exact path="/" element={<Connexion/>} />
                  </Routes>
                  <Routes>
                      <Route path="/streaming" element={<StreamingHome/>} />
                  </Routes>
                  <Routes>
                      <Route path="/contact" element={<Contact/>} />
                  </Routes>
                  <Routes>
                      <Route path="/profile" element={<Profile/>} />
                  </Routes>
                  <Routes>
                      <Route path="/administration" element={<Administration/>} />
                  </Routes>
                  <Routes>
                      <Route path="/modification" element={<Modification/>} />
                  </Routes>
                  <Routes>
                      <Route path="/add" element={<Ajout/>} />
                  </Routes>
                  <Routes>
                      <Route path="/deconnexion" element={<Deconnexion/>} />
                  </Routes>
              </BrowserRouter>
          </UserProvider>
    );
}

export default App;
