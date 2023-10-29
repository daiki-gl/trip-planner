import React, { useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useUserStore } from '../store'

const Header = () => {
    const {pathname} = useLocation()
    const navigate = useNavigate()
    const { user, logOutUser } = useUserStore()
    useEffect(() => {
        if(pathname !== '/register') {
            const _token = window.localStorage.getItem("token")
            if(!_token) {navigate('/login')}
        }
        console.log(user);
    },[])

    const logoutUser = () => {
        window.localStorage.removeItem("token");
        logOutUser()
        navigate('/login')
      }

      const bgColor = pathname.includes('plan') ? 'bg-white text-gray-700' : ''

  return (
    <header className={`py-4 relative z-10 w-screen ${bgColor}`}>
        <nav className='flex justify-between container mx-auto items-center'>
            <Link to={'/'}><h1 className='text-3xl font-bold'>TRIP PLANNER</h1></Link>
            <ul className='flex justify-evenly w-1/4'>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/'}>Contact us</Link></li>
                {user && (
                    <li><button onClick={logoutUser}>Logout</button></li> 
                )}
              {!user && pathname !== '/login' && (
                <li><Link to={'/login'}>Login</Link></li>
              )}
              {!user && pathname !== '/register' && (
                  <li><Link to={'/register'}>Sign up</Link></li>
              )} 
            </ul>
        </nav>
    </header>
  )
}

export default Header