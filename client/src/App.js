import React from 'react';

import { PersistGate } from 'redux-persist/integration/react';
import { persistor } from './store/store';
import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from './pages/Home';
import Navbar from './components/Navbar';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Authroutes from './routes/Authroutes';
import AfterNormalLoginRoutes from './routes/AfterNormalLoginRoutes';
import AdminRoutes from './routes/AdminRoutes';
import { useIsAuthenticated, useRoleCheck } from './utilFunctions';
import PageNotFound from './pages/PageNotFound';
import Footer from './components/Footer';
import SingleEvent from './pages/SingleEvent';


function App() {
  const isAuthenticated = useIsAuthenticated()
  const role = useRoleCheck()

  return (

    <PersistGate loading={null} persistor={persistor}>
      <BrowserRouter>
        <ToastContainer />
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/single-event/:id" element={<SingleEvent />} />
          {Authroutes()}
          {isAuthenticated && AfterNormalLoginRoutes()}
          {isAuthenticated && role === "admin" && AdminRoutes()}
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </PersistGate>

  );
}

export default App;
