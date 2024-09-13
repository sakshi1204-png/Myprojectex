import React from 'react'
// import Dashboard from '../Dashboard/Dashboard'
import { MainLayout } from '../../styles/Layouts'
import LoginPage from '../../pages/login/login'

const Home = () => {
  return (
    <div>
         <MainLayout>
        <main>
          <LoginPage/>
        {/* <Dashboard/> */}
        </main>
      </MainLayout> 
    </div>
  )
}

export default Home