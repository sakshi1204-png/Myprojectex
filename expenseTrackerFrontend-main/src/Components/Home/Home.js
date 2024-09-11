import React from 'react'
import Dashboard from '../Dashboard/Dashboard'
import { MainLayout } from '../../styles/Layouts'

const Home = () => {
  return (
    <div>
         <MainLayout>
        <main>
        <Dashboard/>
        </main>
      </MainLayout> 
    </div>
  )
}

export default Home