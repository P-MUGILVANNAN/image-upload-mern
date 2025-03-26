import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import AddPhoto from './pages/AddPhoto';
import ViewPhoto from './pages/ViewPhoto';
import Navbar from './components/Navbar';

function App() {


  return (
    <BrowserRouter>
    <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/addphotos' element={<AddPhoto />} />
          <Route path='/viewphoto' element={<ViewPhoto />} />
        </Routes>
    </BrowserRouter>
  )
}

export default App
