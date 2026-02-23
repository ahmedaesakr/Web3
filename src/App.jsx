import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Studio from './pages/Studio'
import Work from './pages/Work'
import Contact from './pages/Contact'

function App() {
    const location = useLocation()

    return (
        <main className="bg-bg-deep text-white min-h-screen flex flex-col">
            <Navbar />

            <div className="flex-grow pt-24">
                <AnimatePresence mode="wait">
                    <Routes location={location} key={location.pathname}>
                        <Route path="/" element={<Home />} />
                        <Route path="/studio" element={<Studio />} />
                        <Route path="/work" element={<Work />} />
                        <Route path="/contact" element={<Contact />} />
                    </Routes>
                </AnimatePresence>
            </div>

            <Footer />
        </main>
    )
}

export default App
