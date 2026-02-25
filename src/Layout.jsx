import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import { Outlet } from 'react-router-dom'// It will make the page dynamic

function Layout() {
  return (
    <>

<div className="flex flex-col min-h-screen">
    <Header />
    <main className="flex-1">
        <Outlet />  
    </main>
    <Footer />
</div>
    </>
  )
}

export default Layout
//We can do this whole thing in app.jsx too but I do not wanna do that right now