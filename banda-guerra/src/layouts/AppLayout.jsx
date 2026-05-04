import { Outlet } from 'react-router-dom';
import Header from '../components/HeaderComponent'
import Footer from '../components/FooterComponent';

export default function AppLayout() {
  return (
    <>
        <div className='flex flex-col min-h-screen'>
              <div>
                  <Header/>
              </div>
              <div className='flex-1'>
                  <Outlet/>
              </div>
              <div>
                  <Footer/>
              </div>
        </div>
    </>
  )
}
