import './App.css';
import Main from "./components/Main";
import List from "./components/List";
import {Routes,Route } from 'react-router-dom';
import Stat from "./components/Stat";
import Login from  "./components/Login";
import Signup from  "./components/Signup";
import {useEffect} from "react";

function App() {

    return (
        <Routes>
            <Route path="/" element={<Main/>}/>
            <Route path="/list" element={<List/>}/>
            <Route path="/stat" element={<Stat/>}/>
            <Route path="/login" element={<Login/>}/>
            <Route path="/signup" element={<Signup/>}/>
        </Routes>
  );
}
export default App;
