import React from 'react'
import Header from './components/Header/Header'
import Footer from './components/Footer/Footer'
import ClickSpark from './components/ClickSpark'
import LightPillar from './components/LightPillar'
import { Outlet } from 'react-router-dom'// It will make the page dynamic

function Layout() {
  return (
    <>
      <ClickSpark>
        <div className="relative min-h-screen overflow-x-hidden bg-[#050814] text-white">
          <div className="pointer-events-none fixed inset-0 z-0" aria-hidden="true">
            <div className="absolute inset-0 bg-[#050814]" />
            <LightPillar
              topColor="#FF6A00"
              bottomColor="#FFC857"
              intensity={0.78}
              rotationSpeed={0.26}
              glowAmount={0.0018}
              pillarWidth={3.2}
              pillarHeight={0.42}
              noiseIntensity={0.42}
              pillarRotation={25}
              interactive={false}
              mixBlendMode="screen"
              quality="high"
              className="pointer-events-none"
            />
            <div className="absolute inset-0 bg-linear-to-b from-black/55 via-[#08132a]/40 to-[#050814]/75" />
          </div>

          <div className="relative z-10 flex flex-col min-h-screen">
            <Header />
            <main className="flex-1">
              <Outlet />
            </main>
            <Footer />
          </div>
        </div>
      </ClickSpark>
    </>
  )
}

export default Layout
//We can do this whole thing in app.jsx too but I do not wanna do that right now