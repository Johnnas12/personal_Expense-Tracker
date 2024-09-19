import { Link } from "react-router-dom";
import "animate.css";

const LandingPage = () => {
  return (
    <div className="min-h-screen flex flex-col">
<section className="relative text-white h-screen flex flex-col justify-center items-center text-center p-6 bg-cover bg-center"
  style={{ backgroundImage: 'url(bg.jpg)' }}
>
  <div className="absolute inset-0 bg-black opacity-100"></div>
  <div className="absolute inset-0 bg-cover bg-center" style={{ backgroundImage: 'url(bg.jpg)', filter: 'blur(10px)' }}></div>
  
  <h1 className="relative text-4xl md:text-6xl font-bold mb-4 animate__animated animate__fadeIn">Personal Expense And Event Tracker</h1>
  <p className="relative text-lg md:text-2xl mb-6 animate__animated animate__fadeIn animate__delay-1s">
    Manage your expenses efficiently and take control of your financial future.
  </p>
  <Link to={'/register'}>
    <button
      className="relative bg-black text-white py-2 px-6 rounded-full font-semibold text-lg hover:bg-gray-200 hover:text-black transition duration-300 animate__animated animate__fadeIn animate__delay-2s"
    >
      Get Started
    </button>
  </Link>
</section>
      <section className="bg-red-600 p-8">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-8">Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:bg-black hover:text-white hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Track Expenses</h3>
              <p>Keep track of all your expenses with ease and organize them by categories.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:bg-black hover:text-white hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Generate Reports</h3>
              <p>Visualize your spending with comprehensive reports and charts.</p>
            </div>
            <div className="p-6 bg-white rounded-lg shadow-lg transform transition-transform hover:bg-black hover:text-white hover:scale-105">
              <h3 className="text-xl font-semibold mb-4">Set Budget Goals</h3>
              <p>Set and manage budget goals to ensure you stay within budget.</p>
            </div>
          </div>
        </div>
      </section>
      <footer className="bg-black text-white text-center py-4">
        <p>&copy; {new Date().getFullYear()} Personal Expense Tracker. All rights reserved.</p>
      </footer>
    </div>
  );
};
export default LandingPage;
