import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Target, 
  Share2, 
  Zap, 
  BarChart3,
  Settings,
  User
} from 'lucide-react'

const menuItems = [
  { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
  { id: 'projects', label: '项目管理', icon: FolderKanban },
  { id: 'goals', label: '目标管理', icon: Target },
  { id: 'social', label: '社媒账号', icon: Share2 },
  { id: 'automation', label: '自动化', icon: Zap },
  { id: 'analytics', label: '数据分析', icon: BarChart3 },
]

function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 glass border-r border-white/10">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <motion.div 
          className="flex items-center gap-3"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center">
            <span className="text-xl">🐉</span>
          </div>
          <div>
            <h1 className="font-bold text-lg">龙王</h1>
            <p className="text-xs text-dark-400">个人工作台</p>
          </div>
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
              currentPage === item.id 
                ? 'bg-gradient-to-r from-primary-500/20 to-purple-500/20 text-white border border-primary-500/30' 
                : 'text-dark-400 hover:text-white hover:bg-white/5'
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <item.icon size={20} />
            <span className="font-medium">{item.label}</span>
            {currentPage === item.id && (
              <motion.div 
                className="ml-auto w-1.5 h-1.5 rounded-full bg-primary-400"
                layoutId="activeIndicator"
              />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Bottom Section */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <div className="glass-card p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
              <User size={18} />
            </div>
            <div className="flex-1">
              <p className="font-medium text-sm">龙王</p>
              <p className="text-xs text-dark-400">Pro 会员</p>
            </div>
            <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
              <Settings size={18} className="text-dark-400" />
            </button>
          </div>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
