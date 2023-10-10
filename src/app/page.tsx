import './home.scss';
import Footer from '@/components/footer/Footer';
import AppNavbar from "@/components/navBar/AppNavBar";

const Home = () => {
  return (
    <>
      <AppNavbar />
      <div className='container'>
        <p>Home Page</p>
      </div>
      <Footer />
    </>
  )
}
export default Home
