import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import LoadingOverlay from './LoadingOverlay'

function InitialRouteFallback() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-[#050814] text-white">
      <div className="relative z-10 flex min-h-screen flex-col">
        <Header />
        <main className="relative flex-1">
          <LoadingOverlay scope="content" label="Booting Channel-S..." />
        </main>
        <Footer />
      </div>
    </div>
  )
}

export default InitialRouteFallback
