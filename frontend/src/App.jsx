import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RegisterExpense from './pages/RegisterExpense';
import ViewExpenses from './pages/Show';
import EditExpense from './pages/Edit';
import LandingPage from './pages/landingpage';
import PrivateRoute from './PrivateRoutes';
import TableDemo from './pages/EditableTable';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Profile from './pages/Profile';
import DailyPlanner from './pages/DailyPlanner';

function App() {
 // useAuth();

  return (
    
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<LandingPage />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />

          {/* Protect the following routes */}
          <Route 
            path='/home' 
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/show' 
            element={
              <PrivateRoute>
                <ViewExpenses />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/edit-expense/:id' 
            element={
              <PrivateRoute>
                <EditExpense />
              </PrivateRoute>
            } 
          />
          <Route 
            path='/registerAssets' 
            element={
              <PrivateRoute>
                <RegisterExpense />
              </PrivateRoute>
            } 
          />

        <Route 
            path='/forgotPassword' 
            element={
                <ForgotPassword /> 
            } 
          />

        <Route 
            path='/resetpassword/:resetCode' 
            element={
                <ResetPassword /> 
            } 
          />


          <Route
            path='/editable'
            element= {
            <PrivateRoute>
                <TableDemo />
            </PrivateRoute>}
            />

           <Route
            path='/profile'
            element= {
            <PrivateRoute>
                <Profile />
            </PrivateRoute>}
            />

        <Route
            path='/dailyPlanner'
            element= {
            <PrivateRoute>
                <DailyPlanner />
            </PrivateRoute>}
            />

        </Routes>
      </BrowserRouter>
    
  );
}

export default App;
