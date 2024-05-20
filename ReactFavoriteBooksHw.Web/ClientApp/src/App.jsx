import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './Pages/Home';
import Search from './Pages/Search';
import Favorites from './Pages/Favorites';
import Login from './Pages/Login';
import Signup from './Pages/Signup';
import Logout from './Pages/Logout';
import AuthContextComponent from './AuthContext';
import PrivateRoute from './PrivateRoute';
const App = () => {
    return (
        <AuthContextComponent>
            <Layout>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/favorites' element={
                        <PrivateRoute>
                            <Favorites />
                        </PrivateRoute>
                    } />
                    <Route path='/login' element={<Login />} />
                    <Route path='/logout' element={
                        <PrivateRoute>
                            <Logout />
                        </PrivateRoute>
                    } />
                    <Route path='/signup' element={<Signup />} />


                </Routes>
            </Layout>
        </AuthContextComponent>
    );
}

export default App;