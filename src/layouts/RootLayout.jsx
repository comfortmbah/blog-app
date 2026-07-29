import { Outlet } from "react-router-dom"
import Navbar from "../components/Navbar"
import Footer from "../components/Footer"
import { useTheme } from '../hooks/useTheme'

const RootLayout = () => {
  const { theme } = useTheme();
  return (
    <div className={`min-h-screen flex flex-col ${theme === "dark" 
      ? "bg-gray-900 text-white" : "bg-white text-gray-900"
    }`}>
        <Navbar />

        <main className="grow">
            <Outlet />
        </main>

        <Footer />
    </div>
  )
}

export default RootLayout