import { Outlet } from 'react-router-dom';
import Header from '../components/Header'
import Footer from '../components/Footer';

export default function AppLayout() {
  return (
    <>
        <div>
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
