import { Outlet } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import ScrollToTop from './components/ScrollToTop'

const Layout = () => {
  return (
    <>
    <ScrollToTop />
    <div className='text-white overflow-x-hidden'>
    <Header />
      <main className=' bg-blue-400 w-screen min-h-screen'>
        <Outlet />
      </main>
      <Footer />
    </div>
    </>
  )
}

export default Layout