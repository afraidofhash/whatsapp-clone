//import logo from './logo.svg';
import './App.css';
import Sidebar from './Sidebar';
import Chat from './Chat';
import Login from './Login';
import {useStateValue} from './StateProvider'


import React,{Fragment,useState} from 'react'
//import {BrowserRouter as Router,Route} from 'react-router-dom'
//import Switch from "react-switch";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
//import { Route, Switch } from "react-router-dom";
function App() {

  const [{user},dispatch]=useStateValue()


  return (
    //BEM NAMING Convention
    <div className="app">
      {!user?(
        <Login/>
      ):
      <div className="app-bg">  
      
        <div className="app__body">
          <Router>
            <Routes>
              {/* <Route path="/app" element={
                <Fragment>
                  <Sidebar />
                  <Chat />
                </Fragment>
              } />
               */}
                
              
              <Route path="/" element={
                <Fragment>
                <Sidebar />
                <Chat />
              </Fragment>}>
              </Route>


              <Route path="*" element={<Sidebar/>}></Route>
              <Route path='/rooms/:roomId' element={<Fragment>
                <Sidebar />
                <Chat />
              </Fragment>}>
              </Route>
            </Routes>
          </Router>
        </div>
      </div>
      }
    </div>
              
  );
}

export default App;
