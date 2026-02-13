import { motion } from 'framer-motion'
import { 
  BarChart3, 
  TrendingUp, 
  Users, 
  Eye, 
  ArrowUpRight,
  ArrowDownRight,
  Globe,
  Youtube,
  Twitter
} from 'lucide-react'
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell
} from 'recharts'

const weeklyData = [
  { name: '周一', views: 4200, engagement: 890, followers: 12 },
  { name: '周二', views: 3800, engagement: 720, followers: 8 },
  { name: '周三', views: 5100, engagement: 950, followers: 15 },
  { name: '周四', views: 6200, engagement: 1100, followers: 22 },
  { name: '周五', views: 4800, engagement: 860, followers: 11 },
  { name: '周六', views: 7500, engagement: 1400, followers: 35 },
  { name: '周日', views: 6800, engagement: 1200, followers: 28 },
]

const platformData = [
  { name: 'YouTube', value: 45, color: '#FF0000' },
  { name: 'Blog', value: 30, color: '#0ea5e9' },
  { name: 'Twitter', value: 15, color: '#1DA1F2' },
  { name: 'GitHub', value: 10, color: '#6e5494' },
]

const topContent = [
  { title: 'OpenClaw 安装教程', platform: 'YouTube', views: '12.5k', engagement: '8.2%', trend: 'up' },
  { title: 'AI 播客制作指南', platform: 'Blog', views: '3.2k', engagement: '12.1%', trend: 'up' },
  { title: '响应式网页设计', platform: 'Blog', views: '2.8k', engagement: '9.5%', trend: 'down' },
  { title: '个人博客上线', platform: 'Twitter', views: '1.5k', engagement: '15.3%', trend: 'up' },
]

const stats = [
  { label: '总访问量', value: '38.4K', change: '+23%', icon: Eye, color: 'blue' },
  { label: '互动总数', value: '7.1K', change: '+18%', icon: TrendingUp, color: 'emerald' },
  { label: '新增粉丝', value: '131', change: '+45%', icon: Users, color: 'purple' },
  { label: '互动率', value: '4.8%', change: '+0.5%', icon: BarChart3, color: 'amber' },
]

function Analytics() {
  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <motion.h1 
            className="text-3xl font-bold flex items-center gap-3"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <BarChart3 className="text-primary-400" />
            数据分析
          </motion.h1>
          <p className="text-dark-400 mt-1">全平台数据汇总与深度分析</p>
        </div>
        <div className="flex gap-4">
          <select className="bg-white/5 border border-white/10 rounded-xl px-4 py-2">
            <option>本周</option>
            <option>本月</option>
            <option>本季度</option>
            <option>本年</option>
          </select>
          <button className="btn-primary">
            导出报告
          </button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        {stats.map((stat, index) => (
          <motion.div 
            key={stat.label}
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between mb-4">
              <div className={`w-10 h-10 rounded-xl bg-${stat.color}-500/20 flex items-center justify-center`}>
                <stat.icon size={20} className={`text-${stat.color}-400`} />
              </div>
              <span className={`flex items-center gap-1 text-sm ${
                stat.change.startsWith('+') ? 'text-emerald-400' : 'text-red-400'
              }`}>
                {stat.change.startsWith('+') 
                  ? <ArrowUpRight size={16} /> 
                  : <ArrowDownRight size={16} />
                }
                {stat.change}
              </span>
            </div>
            <p className="text-dark-400 text-sm">{stat.label}</p>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-3 gap-6">
        <motion.div 
          className="col-span-2 glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h3 className="text-lg font-semibold mb-6">📈 每周数据趋势</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="name" stroke="#64748b" />
              <YAxis stroke="#64748b" />
              <Tooltip 
                contentStyle={{ 
                  background: '#1e293b', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}
              />
              <Bar dataKey="views" fill="#0ea5e9" radius={[4, 4, 0, 0]} />
              <Bar dataKey="engagement" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <h3 className="text-lg font-semibold mb-6">🌐 平台分布</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={platformData}
                cx="50%"
                cy="50%"
                innerRadius={50}
                outerRadius={80}
                paddingAngle={5}
                dataKey="value"
              >
                {platformData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  background: '#1e293b', 
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: '12px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-4">
            {platformData.map((item) => (
              <div key={item.name} className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ background: item.color }} />
                <span className="text-sm text-dark-400">{item.name}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Top Content */}
      <motion.div 
        className="glass-card p-6"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6 }}
      >
        <h3 className="text-lg font-semibold mb-6">🏆 热门内容</h3>
        <div className="space-y-4">
          {topContent.map((content, index) => (
            <div 
              key={index}
              className="flex items-center justify-between p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-colors"
            >
              <div className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center">
                  {content.platform === 'YouTube' && <Youtube size={16} className="text-red-400" />}
                  {content.platform === 'Blog' && <Globe size={16} className="text-blue-400" />}
                  {content.platform === 'Twitter' && <Twitter size={16} className="text-blue-400" />}
                </div>
                <div>
                  <p className="font-medium">{content.title}</p>
                  <p className="text-dark-400 text-sm">{content.platform}</p>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <p className="font-medium">{content.views}</p>
                  <p className="text-dark-400 text-sm">观看</p>
                </div>
                <div className="text-right">
                  <p className="font-medium">{content.engagement}</p>
                  <p className="text-dark-400 text-sm">互动率</p>
                </div>
                <div className={`flex items-center gap-1 ${
                  content.trend === 'up' ? 'text-emerald-400' : 'text-red-400'
                }`}>
                  {content.trend === 'up' 
                    ? <ArrowUpRight size={18} /> 
                    : <ArrowDownRight size={18} />
                  }
                </div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Analytics
