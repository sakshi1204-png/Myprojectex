import React, {useState, useMemo} from 'react'
import styled from "styled-components";
import bg from './img/bg.png'
import {MainLayout} from './styles/Layouts'
import Orb from './Components/Orb/Orb'
// import Navigation from './Components/Navigation/Navigation'
import Dashboard from './Components/Dashboard/Dashboard';
import Income from './Components/Income/Income'
import Expenses from './Components/Expenses/Expenses';
import { useGlobalContext } from './context/globalContext';
import ResponsiveAppBar from './Components/Navbar/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import Home from './Components/Home/Home';
import ExpenseForm from './Components/Expenses/ExpenseForm';
import ProfileEdit from './pages/profile/profile';
import LoginPage from './pages/login/login';
import RegistrationPage from './pages/registration/registration';
// import Profile from './pages/profile/profile';

function App() {
  const [active, setActive] = useState(1)

  const global = useGlobalContext()
  console.log(global);

  const displayData = () => {
    switch(active){
      case 1:
        return <Dashboard />
      case 2:
        return <Dashboard />
      case 3:
        return <Income />
      case 4: 
        return <ExpenseForm />
      default: 
        return <Dashboard />
    }
  }

  const orbMemo = useMemo(() => {
    return <Orb />
  },[])

  return (
    <AppStyled bg={bg} className="App">
      {orbMemo}
        <ResponsiveAppBar/>
        <Routes>
        <Route path="/" element={<Navigate to="/login" />} /> {/* Redirect to login page */}
            <Route path="/login" element={<LoginPage />} /> {/* Login page route */}
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/income" element={<Income />} />
            <Route path="/register" element={<RegistrationPage/>} />
            <Route path="/expense" element={<ExpenseForm />} />
            <Route path="/profile" element={<ProfileEdit />} />
        </Routes>
      {/* <MainLayout>
        <main>
        <Dashboard/>
        </main>
      </MainLayout> */}
    </AppStyled>
  );
}

const AppStyled = styled.div`
  height: 100vh;
  background-image: url(${props => props.bg});
  position: relative;
  main{
    flex: 1;
    background: rgba(252, 246, 249, 0.78);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    // border-radius: 32px;
    overflow-x: hidden;
    &::-webkit-scrollbar{
      width: 0;
    }
  }
`;

export default App;
