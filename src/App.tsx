import Signup from './pages/Signup'
import Login from './pages/Login'
import { Route, Routes } from 'react-router-dom'
import Layout from './Layout'
import Home from './pages/Home'
import TourPlanPage from './pages/TourPlan.page'
import UpdatePlan from './pages/UpdatePlan.page'
import ScrollToTop from './components/ScrollToTop'


function App() {
  return (
    <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path='/login' element={<Login />}/>
          <Route path='/register' element={<Signup />}/>
          <Route path='/plan/edit/:id' element={<UpdatePlan />} />
          <Route path='/plan/:id' element={<TourPlanPage />} />
        </Route>
      </Routes>
  )
}

export default App
