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
    },[])

    const logoutUser = () => {
        window.localStorage.removeItem("token");
        logOutUser()
        navigate('/login')
      }

      const bgColor = pathname.includes('plan') ? 'bg-white text-gray-700' : ''

  return (
    <header className={`py-2 md:py-4 px-4 relative z-10 w-screen ${bgColor}`}>
        <nav className='flex justify-between container mx-auto items-center'>
            <Link to={'/'}><h1 className='md:text-3xl font-bold'>TRIP PLANNER</h1></Link>
            <ul className='flex justify-evenly w-7/12 md:w-2/5 lg:w-1/4'>
                <li><Link to={'/'}>Home</Link></li>
                <li><Link to={'/'}>Contact us</Link></li>
                {user?.id && (
                    <li><button onClick={logoutUser}>Logout</button></li> 
                )}
              {!user?.id && pathname !== '/login' && (
                <li><Link to={'/login'}>Login</Link></li>
              )}
              {!user?.id && pathname !== '/register' && (
                  <li><Link to={'/register'}>Sign up</Link></li>
              )} 
            </ul>
        </nav>
    </header>
  )
}

export default Header