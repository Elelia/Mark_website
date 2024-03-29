import React from "react";
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Connexion from "./components/connexion/connexion_page";
import Film from "./components/streaming/film_home_page";
import Serie from "./components/streaming/serie_home_page";
import Navbar from "./components/nav/navbar";
import Contact from "./components/contact/contact";
import Profile from "./components/profile/profile_page";
import Deconnexion from "./components/deconnexion/deconnexion";
import Administration from "./components/administration/administration_page";
import Modification from "./components/administration/modification_page";
import Ajout from "./components/administration/add_page";
import Preference from "./components/profile/preference_page";
import {UserProvider} from "./components/utils/userContext";
import PrivateRoutes from "./components/utils/PrivateRoutes";
import Footer from "./components/footer/footer";
import AboutMark from "./components/about/about_mark";
import DataUse from "./components/about/data_use";

function App() {

    return (
          <UserProvider>
              <BrowserRouter>
                  <Navbar/>
                  <Routes>
                      <Route exact path="/" element={<Connexion/>} />
                      <Route element={<PrivateRoutes/>}>
                          <Route path="/film" element={<Film/>} />
                          <Route path="/serie" element={<Serie/>} />
                          <Route path="/contact" element={<Contact/>} />
                          <Route path="/profile" element={<Profile/>} />
                          <Route path="/administration" element={<Administration/>} />
                          <Route path="/modification" element={<Modification/>} />
                          <Route path="/add" element={<Ajout/>} />
                          <Route path="/preference" element={<Preference/>} />
                      </Route>
                      <Route path="/deconnexion" element={<Deconnexion/>} />
                      <Route path="/about" element={<AboutMark/>} />
                      <Route path="/data_use" element={<DataUse/>} />
                  </Routes>
                  <Footer/>
              </BrowserRouter>
          </UserProvider>
    );
}

export default App;
