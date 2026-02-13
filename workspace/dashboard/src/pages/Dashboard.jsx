import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { 
  LayoutDashboard, 
  FolderKanban, 
  Target, 
  Share2, 
  Zap, 
  BarChart3,
  Settings,
  User,
  Search,
  Bell,
  ChevronDown,
  TrendingUp,
  Clock,
  CheckCircle2,
  AlertCircle,
  GitBranch,
  Calendar,
  Zap,
  Target,
  Plus,
  MoreHorizontal,
  ArrowRight,
  Sun,
  Moon
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'

// Modern color palette
const chartColors = {
  primary: '#0ea5e9',
  secondary: '#8b5cf6',
  success: '#10b981',
  warning: '#f59e0b',
  danger: '#ef4444',
}

// Mock Data - Modern dashboard data
const weeklyProgress = [
  { day: '周一', progress: 72, tasks: 8 },
  { day: '周二', progress: 85, tasks: 10 },
  { day: '周三', progress: 45, tasks: 5 },
  { day: '周四', progress: 92, tasks: 12 },
  { day: '周五', progress: 78, tasks: 9 },
  { day: '周六', progress: 65, tasks: 7 },
  { day: '周日', progress: 88, tasks: 11 },
]

const recentProjects = [
  { name: '个人博客', progress: 85, status: 'active', icon: '📚', stars: 12 },
  { name: 'YouTube 频道', progress: 60, status: 'active', icon: '🎬', stars: 8 },
  { name: '播客项目', progress: 100, status: 'completed', icon: '🎙️', stars: 15 },
  { name: 'AI 助手', progress: 45, status: 'active', icon: '🤖', stars: 23 },
  { name: '工作台', progress: 25, status: 'active', icon: '🖥️', stars: 5 },
]

const todayTasks = [
  { id: 1, task: '发布新博客文章', status: 'completed', priority: 'high', platform: 'Blog' },
  { id: 2, task: '录制 YouTube 视频', status: 'in-progress', priority: 'high', platform: 'YouTube' },
  { id: 3, task: '回复粉丝评论', status: 'pending', priority: 'medium', platform: 'Twitter' },
  { id: 4, task: '优化 SEO', status: 'pending', priority: 'low', platform: 'All' },
]

const stats = [
  { label: '完成项目', value: '12', change: '+3', icon: CheckCircle2, color: 'emerald' },
  { label: '进行中', value: '5', change: '+1', icon: Clock, color: 'blue' },
  { label: '待开始', value: '3', change: '-1', icon: AlertCircle, color: 'amber' },
  { label: '效率提升', value: '+23%', change: '', icon: TrendingUp, color: 'purple' },
]

const menuItems = [
  { id: 'dashboard', label: '工作台', icon: LayoutDashboard },
  { id: 'projects', label: '项目管理', icon: FolderKanban },
  { id: 'goals', label: '目标管理', icon: Target },
  { id: 'social', label: '社媒账号', icon: Share2 },
  { id: 'automation', label: '自动化', icon: Zap },
  { id: 'analytics', label: '数据分析', icon: BarChart3 },
]

// Premium Stat Card Component
function StatCard({ label, value, change, icon: Icon, color, delay }) {
  const colorClasses = {
    emerald: 'from-emerald-500/20 to-emerald-600/5 border-emerald-500/20',
    blue: 'from-blue-500/20 to-blue-600/5 border-blue-500/20',
    amber: 'from-amber-500/20 to-amber-600/5 border-amber-500/20',
    purple: 'from-purple-500/20 to-purple-600/5 border-purple-500/20',
    pink: 'from-pink-500/20 to-pink-600/5 border-pink-500/20',
  }

  const iconColors = {
    emerald: 'text-emerald-400',
    blue: 'text-blue-400',
    amber: 'text-amber-400',
    purple: 'text-purple-400',
    pink: 'text-pink-400',
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: delay * 0.1 }}
      className={`stat-card group`}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-dark-400 text-sm font-medium">{label}</p>
          <p className="text-4xl font-bold mt-2 gradient-text">{value}</p>
          {change && (
            <p className="text-emerald-400 text-sm mt-2 flex items-center gap-1">
              <TrendingUp size={14} />
              {change} 本周
            </p>
          )}
        </div>
        <div className={`p-3 rounded-xl bg-gradient-to-br ${colorClasses[color]} group-hover:scale-110 transition-transform duration-300`}>
          <Icon size={24} className={iconColors[color]} />
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary-500/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    </motion.div>
  )
}

// Task Item Component
function TaskItem({ task, index }) {
  const priorityColors = {
    high: 'border-red-500/50 bg-red-500/10',
    medium: 'border-amber-500/50 bg-amber-500/10',
    low: 'border-blue-500/50 bg-blue-500/10',
  }

  const statusIcons = {
    completed: <CheckCircle2 size={18} className="text-emerald-400" />,
    'in-progress': <Clock size={18} className="text-blue-400" />,
    pending: <div className="w-4 h-4 rounded-full border-2 border-dark-400" />,
  }

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ delay: 0.3 + index * 0.1 }}
      className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-all duration-300 group cursor-pointer`}
    >
      <div className="flex-shrink-0">
        {statusIcons[task.status]}
      </div>
      <div className="flex-1">
        <p className={`font-medium ${task.status === 'completed' ? 'line-through text-dark-500' : ''}`}>
          {task.task}
        </p>
        <p className="text-dark-400 text-sm">{task.platform}</p>
      </div>
      <span className={`px-3 py-1 rounded-full text-xs font-medium border ${priorityColors[task.priority]}`}>
        {task.priority === 'high' ? '高' : task.priority === 'medium' ? '中' : '低'}
      </span>
      <button className="p-2 rounded-lg hover:bg-white/10 opacity-0 group-hover:opacity-100 transition-all">
        <MoreHorizontal size={16} className="text-dark-400" />
      </button>
    </motion.div>
  )
}

// Project Card Component
function ProjectCard({ project, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: 0.5 + index * 0.1 }}
      className="card-hover glass-card p-5 cursor-pointer group"
    >
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <span className="text-2xl">{project.icon}</span>
          <div>
            <h3 className="font-semibold group-hover:text-primary-400 transition-colors">
              {project.name}
            </h3>
            <div className="flex items-center gap-2 text-sm text-dark-400">
              <GitBranch size={12} />
              <span>{project.stars} stars</span>
            </div>
          </div>
        </div>
        <span className={`px-3 py-1 rounded-full text-xs font-medium ${
          project.status === 'completed' 
            ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
            : 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
        }`}>
          {project.status === 'completed' ? '已完成' : '进行中'}
        </span>
      </div>

      <div className="mb-3">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-dark-400">进度</span>
          <span className="font-medium">{project.progress}%</span>
        </div>
        <div className="progress-bar">
          <motion.div 
            className="progress-bar-fill"
            initial={{ width: 0 }}
            animate={{ width: `${project.progress}%` }}
            transition={{ delay: 0.8 + index * 0.1, duration: 0.8 }}
          />
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-white/5">
        <div className="flex -space-x-2">
          {[1, 2, 3].map((i) => (
            <div 
              key={i}
              className="w-8 h-8 rounded-full bg-gradient-to-br from-primary-400 to-purple-500 border-2 border-dark-900"
            />
          ))}
        </div>
        <ArrowRight size={16} className="text-dark-400 group-hover:text-primary-400 group-hover:translate-x-1 transition-all" />
      </div>
    </motion.div>
  )
}

// Main Dashboard Component
function Dashboard() {
  const [currentTime] = useState(new Date().toLocaleString('zh-CN', { 
    weekday: 'long', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }))

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div 
        className="flex items-center justify-between"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <span className="animate-float">👋</span>
            你好，龙王！
          </h1>
          <p className="text-dark-400 mt-1 flex items-center gap-2">
            <Calendar size={16} />
            {currentTime}
          </p>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="relative">
            <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-dark-400" />
            <input 
              type="text" 
              placeholder="搜索..." 
              className="input pl-12 w-64 rounded-full bg-white/5 border-white/10 focus:bg-white/10 transition-all"
            />
          </div>
          <button className="relative p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-all">
            <Bell size={20} className="text-dark-300" />
            <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full animate-pulse" />
          </button>
          <div className="flex items-center gap-3 pl-4 border-l border-white/10">
            <div className="avatar w-10 h-10 text-lg">🐉</div>
            <ChevronDown size={16} className="text-dark-400" />
          </div>
        </div>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} delay={index} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Progress Chart */}
        <motion.div 
          className="col-span-2 glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">📈 本周进度</h2>
              <p className="text-dark-400 text-sm mt-1">任务完成率趋势</p>
            </div>
            <div className="flex gap-2">
              {['本周', '本月', '本季度'].map((period, i) => (
                <button 
                  key={period}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                    i === 0 
                      ? 'bg-primary-500/20 text-primary-300 border border-primary-500/30'
                      : 'text-dark-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {period}
                </button>
              ))}
            </div>
          </div>
          
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={weeklyProgress}>
              <defs>
                <linearGradient id="progressGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
                <linearGradient id="tasksGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" strokeOpacity={0.5} />
              <XAxis 
                dataKey="day" 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
              />
              <YAxis 
                stroke="#64748b"
                fontSize={12}
                tickLine={false}
                axisLine={false}
              />
              <Tooltip 
                contentStyle={{ 
                  background: 'rgba(15, 23, 42, 0.95)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '16px',
                  backdropFilter: 'blur(20px)'
                }}
                labelStyle={{ color: '#94a3b8' }}
              />
              <Area 
                type="monotone" 
                dataKey="progress" 
                stroke="#0ea5e9"
                strokeWidth={3}
                fill="url(#progressGradient)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-xl font-semibold">✅ 今日任务</h2>
              <p className="text-dark-400 text-sm mt-1">{todayTasks.length} 项待办</p>
            </div>
            <button className="p-2 rounded-lg bg-primary-500/20 hover:bg-primary-500/30 transition-all">
              <Plus size={18} className="text-primary-400" />
            </button>
          </div>
          
          <div className="space-y-3">
            {todayTasks.map((task, index) => (
              <TaskItem key={task.id} task={task} index={index} />
            ))}
          </div>

          <button className="w-full mt-4 py-3 rounded-xl text-sm font-medium text-dark-400 hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
            查看所有任务
            <ArrowRight size={14} />
          </button>
        </motion.div>
      </div>

      {/* Projects Section */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.7 }}
      >
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-xl font-semibold">🚀 我的项目</h2>
            <p className="text-dark-400 text-sm mt-1">{recentProjects.length} 个项目进行中</p>
          </div>
          <button className="text-primary-400 hover:text-primary-300 text-sm font-medium flex items-center gap-2">
            查看全部
            <ArrowRight size={14} />
          </button>
        </div>
        
        <div className="grid grid-cols-5 gap-4">
          {recentProjects.map((project, index) => (
            <ProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </motion.div>

      {/* Background Decorations */}
      <div className="floating-bg floating-bg-1" />
      <div className="floating-bg floating-bg-2" />
    </div>
  )
}

export default Dashboard
