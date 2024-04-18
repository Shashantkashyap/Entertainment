import React from 'react'
import {Route, Routes} from "react-router-dom"
import Home from './pages/Home'
import Search from './pages/Search'
import Details from './pages/Details'
import MoviePage from './pages/MoviePage'
import TvPage from "./pages/TvPage"
import Auth from './pages/Auth'
import Bookmark from './pages/Bookmark'

function App() {
 
  return (
    <div className='bg-[#10141E]'>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/auth' element={<Auth/>}/>
        
        <Route path='/search' element={<Search/>}/>
        <Route path='/details' element={<Details/>}/>
        <Route path='/tvSeries' element={<TvPage/>}/>
        <Route path='/movies' element={<MoviePage/>}/>
        <Route path='/bookmark' element={<Bookmark/>}/>
        
      </Routes>
    </div>
  )
}

export default App
