import { useState } from 'react'
import { TestPage } from './components/test'
import { Frontpage } from './components/frontpage';
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import { Link } from "react-router-dom";

function App() {


  return (
    <>
        <BrowserRouter>
            <Routes>
                <Route path="/frontpage" element={<Frontpage/>}/>
                <Route path="/:id" element={<TestPage/>}/>
            </Routes>
            <TestPage/>
            <Link to="/5?example=itsworking">Link to home/5?example=itsworking</Link>
        </BrowserRouter>
    </>
  )
}

export default App
