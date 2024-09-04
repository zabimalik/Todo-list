import { useState } from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import TaskForm from './components/TaskForm'
import Com from './components/Com'
import Incom from './components/Incom'
import Navbar from './components/Navbar'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <div className="bgcontainer">
     <div className="content">
     <Navbar/>
<BrowserRouter>
<Routes>
<Route path='/' element={<TaskForm/>  } />
<Route path='/com' element={ <Incom/> } />
<Route path='/history' element={<Com/>} />

</Routes>

</BrowserRouter>
</div>
</div>
    </>
  )
}

export default App
