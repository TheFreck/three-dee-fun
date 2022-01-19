import React, { useRef, useEffect, Suspense } from 'react';
import './App.css';
import { FiberCube } from './components/Cube';
import { Carton } from './components/Carton';
import { SolarSystem } from './components/SolarSystem';
import { Layout } from './navigation/Layout';
import { Route, Routes } from 'react-router-dom';
import { Container } from 'reactstrap';
import Home from './pages/Home';
import { NavMenu } from './navigation/NavMenu';

export const App = props => {
  return <>
    <div>
      <Layout>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/carton' element={<Carton />} />
            <Route path='/demo' element={<FiberCube />} />
            <Route path='/solar' element={<Suspense fallback={null}>
              <SolarSystem />
            </Suspense>} />
          </Routes>
        <Container>
          {props.children}
        </Container>
      </Layout>
    </div>
  </>
}


export default App;
