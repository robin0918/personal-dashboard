import { motion } from 'framer-motion'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Target, 
  Share2, 
  Zap, 
  BarChart3,
  Settings,
  User,
  ChevronRight,
  Sparkles,
  LogOut
} from 'lucide-react'

const menuItems = [
  { id: 'dashboard', label: '工作台', icon: LayoutDashboard, badge: null },
  { id: 'projects', label: '项目管理', icon: FolderKanban, badge: '5' },
  { id: 'goals', label: '目标管理', icon: Target, badge: null },
  { id: 'social', label: '社媒账号', icon: Share2, badge: '4' },
  { id: 'automation', label: '自动化', icon: Zap, badge: '3' },
  { id: 'analytics', label: '数据分析', icon: BarChart3, badge: null },
]

function Sidebar({ currentPage, onNavigate }) {
  return (
    <aside className="fixed left-0 top-0 h-full w-64 glass border-r border-white/10">
      {/* Logo - Blog Style */}
      <motion.div 
        className="flex items-center gap-3 mb-8 p-6"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
      >
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center">
          <span className="text-xl">🐉</span>
        </div>
        <div>
          <h1 className="font-bold text-lg">龙王</h1>
          <p className="text-xs text-dark-400 flex items-center gap-1">
            <Sparkles size={10} className="text-amber-400" />
            Pro Plan
          </p>
        </div>
      </motion.div>

      {/* Navigation - Blog Style */}
      <nav className="p-4 space-y-2">
        {menuItems.map((item, index) => (
          <motion.button
            key={item.id}
            onClick={() => onNavigate(item.id)}
            className={`w-full nav-item rounded-xl ${
              currentPage === item.id ? 'active' : ''
            }`}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
          >
            <item.icon size={20} />
            <span className="flex-1 text-left">{item.label}</span>
            {item.badge && (
              <span className="px-2 py-0.5 rounded-full text-xs font-medium bg-primary-500/20 text-primary-300">
                {item.badge}
              </span>
            )}
            {currentPage === item.id && (
              <ChevronRight size={14} className="text-primary-400" />
            )}
          </motion.button>
        ))}
      </nav>

      {/* Pro Banner - Blog Style */}
      <motion.div 
        className="mx-4 mb-4 p-4 rounded-xl bg-gradient-to-br from-primary-500/20 to-purple-500/20 border border-primary-500/30"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center gap-2 mb-2">
          <Sparkles size={16} className="text-amber-400" />
          <span className="font-medium text-sm">升级 Pro</span>
        </div>
        <p className="text-dark-400 text-xs mb-3">
          解锁更多自动化功能和社媒平台
        </p>
        <button className="w-full py-2 rounded-lg bg-gradient-to-r from-primary-500 to-purple-500 text-white text-sm font-medium hover:shadow-lg transition-all">
          了解更多
        </button>
      </motion.div>

      {/* Bottom Section - Blog Style */}
      <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/10">
        <button className="w-full nav-item rounded-xl text-dark-400 hover:text-white">
          <Settings size={20} />
          <span>设置</span>
        </button>
        
        <div className="flex items-center gap-3 p-3 mt-2 rounded-xl bg-white/5 border border-white/10">
          <div className="avatar w-10 h-10 flex items-center justify-center text-lg">🐉</div>
          <div className="flex-1 min-w-0">
            <p className="font-medium text-sm truncate">龙王</p>
            <p className="text-xs text-dark-400 truncate">robin0918</p>
          </div>
          <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
            <LogOut size={16} className="text-dark-400" />
          </button>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar
