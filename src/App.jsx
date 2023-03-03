import React, { useState } from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connexion from "./components/connexion/connexion_page";
import StreamingHome from "./components/streaming/streaming_home_page";
import Navbar from "./components/nav/navbar";
import Contact from "./components/contact/contact";
import Profile from "./components/profile/profile_page";
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
              </BrowserRouter>
          </UserProvider>
    );
}

export default App;
