import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Projects from './pages/Projects'
import Goals from './pages/Goals'
import SocialAccounts from './pages/SocialAccounts'
import Automation from './pages/Automation'
import Analytics from './pages/Analytics'

function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')

  const pages = {
    dashboard: Dashboard,
    projects: Projects,
    goals: Goals,
    social: SocialAccounts,
    automation: Automation,
    analytics: Analytics,
  }

  const CurrentPage = pages[currentPage]

  return (
    <div className="flex min-h-screen">
      <Sidebar currentPage={currentPage} onNavigate={setCurrentPage} />
      
      <main className="flex-1 ml-64 p-8">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentPage}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
          >
            <CurrentPage />
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  )
}

export default App
