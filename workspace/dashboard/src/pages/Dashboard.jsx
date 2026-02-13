import { motion } from 'framer-motion'
import { 
  TrendingUp, 
  Clock, 
  CheckCircle2, 
  AlertCircle,
  GitBranch,
  Calendar,
  Zap,
  Target
} from 'lucide-react'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'

// Mock Data
const weeklyProgress = [
  { day: '周一', progress: 65 },
  { day: '周二', progress: 80 },
  { day: '周三', progress: 45 },
  { day: '周四', progress: 90 },
  { day: '周五', progress: 75 },
  { day: '周六', progress: 60 },
  { day: '周日', progress: 85 },
]

const recentProjects = [
  { name: '个人博客', status: 'active', progress: 85, icon: '📚' },
  { name: 'YouTube 频道', status: 'active', progress: 60, icon: '🎬' },
  { name: '播客项目', status: 'completed', progress: 100, icon: '🎙️' },
  { name: 'AI 助手', status: 'active', progress: 45, icon: '🤖' },
]

const todayTasks = [
  { task: '发布新博客文章', status: 'completed', priority: 'high' },
  { task: '录制 YouTube 视频', status: 'pending', priority: 'high' },
  { task: '回复粉丝评论', status: 'in-progress', priority: 'medium' },
  { task: '优化 SEO', status: 'pending', priority: 'low' },
]

const stats = [
  { label: '完成项目', value: '12', change: '+3', icon: CheckCircle2, color: 'emerald' },
  { label: '进行中', value: '5', change: '+1', icon: Clock, color: 'blue' },
  { label: '待开始', value: '3', change: '-1', icon: AlertCircle, color: 'amber' },
  { label: '效率提升', value: '+23%', change: '', icon: TrendingUp, color: 'purple' },
]

function StatCard({ label, value, change, icon: Icon, color }) {
  const colorClasses = {
    emerald: 'from-emerald-500/20 to-emerald-600/10 border-emerald-500/30',
    blue: 'from-blue-500/20 to-blue-600/10 border-blue-500/30',
    amber: 'from-amber-500/20 to-amber-600/10 border-amber-500/30',
    purple: 'from-purple-500/20 to-purple-600/10 border-purple-500/30',
  }

  return (
    <motion.div 
      className={`glass-card p-6 bg-gradient-to-br ${colorClasses[color]}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-dark-400 text-sm">{label}</p>
          <p className="text-3xl font-bold mt-1 gradient-text">{value}</p>
          {change && (
            <p className="text-emerald-400 text-sm mt-1">{change} 本周</p>
          )}
        </div>
        <div className={`w-12 h-12 rounded-xl bg-${color}-500/20 flex items-center justify-center`}>
          <Icon size={24} className={`text-${color}-400`} />
        </div>
      </div>
    </motion.div>
  )
}

function Dashboard() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            className="text-3xl font-bold"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            👋 你好，龙王！
          </motion.h1>
          <p className="text-dark-400 mt-1">今天是 2026年2月13日，星期四</p>
        </div>
        <motion.button 
          className="btn-primary flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Zap size={18} />
          快速开始
        </motion.button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} />
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-3 gap-6">
        {/* Progress Chart */}
        <motion.div 
          className="col-span-2 glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">📈 本周进度</h2>
            <select className="bg-white/5 border border-white/10 rounded-lg px-3 py-1 text-sm">
              <option>本周</option>
              <option>本月</option>
              <option>本季度</option>
            </select>
          </div>
          <ResponsiveContainer width="100%" height={250}>
            <AreaChart data={weeklyProgress}>
              <defs>
                <linearGradient id="colorProgress" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#0ea5e9" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#0ea5e9" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="day" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  background: '#1e293b', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}
              />
              <Area 
                type="monotone" 
                dataKey="progress" 
                stroke="#0ea5e9" 
                strokeWidth={3}
                fill="url(#colorProgress)" 
              />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Today's Tasks */}
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold">✅ 今日任务</h2>
            <span className="badge badge-primary">4 项待办</span>
          </div>
          <div className="space-y-4">
            {todayTasks.map((task, index) => (
              <motion.div 
                key={task.task}
                className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + index * 0.1 }}
              >
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  task.status === 'completed' 
                    ? 'bg-emerald-500 border-emerald-500' 
                    : task.status === 'in-progress'
                    ? 'border-blue-500'
                    : `border-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'amber' : 'dark-400'}`
                }`}>
                  {task.status === 'completed' && (
                    <CheckCircle2 size={12} className="text-white" />
                  )}
                </div>
                <span className={`flex-1 ${task.status === 'completed' ? 'line-through text-dark-500' : ''}`}>
                  {task.task}
                </span>
                <span className={`badge ${
                  task.priority === 'high' ? 'badge-danger' :
                  task.priority === 'medium' ? 'badge-warning' : 'badge-primary'
                }`}>
                  {task.priority}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Projects */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
      >
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold">🚀 我的项目</h2>
          <button className="text-primary-400 hover:text-primary-300 text-sm font-medium">
            查看全部 →
          </button>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {recentProjects.map((project, index) => (
            <motion.div 
              key={project.name}
              className="card-hover p-4 rounded-xl bg-white/5 cursor-pointer"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5 + index * 0.1 }}
            >
              <div className="text-3xl mb-3">{project.icon}</div>
              <h3 className="font-medium mb-2">{project.name}</h3>
              <div className="progress-bar mb-2">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-dark-400">{project.progress}%</span>
                <span className={`badge ${
                  project.status === 'completed' ? 'badge-success' : 'badge-primary'
                }`}>
                  {project.status === 'completed' ? '已完成' : '进行中'}
                </span>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Dashboard
