import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Zap, 
  Play, 
  Pause, 
  Clock, 
  Calendar,
  CheckCircle2,
  AlertCircle,
  Settings,
  Plus
} from 'lucide-react'

const automationTasks = [
  {
    id: 1,
    name: '每日博客同步',
    description: '将新文章同步到所有社媒平台',
    schedule: '每天 08:00',
    status: 'active',
    lastRun: '2026-02-13 08:00',
    platforms: ['Twitter', 'LinkedIn'],
    success: true
  },
  {
    id: 2,
    name: 'YouTube 视频发布',
    description: '自动上传视频并设置发布时间',
    schedule: '每周二、四 14:00',
    status: 'active',
    lastRun: '2026-02-12 14:00',
    platforms: ['YouTube'],
    success: true
  },
  {
    id: 3,
    name: '播客生成',
    description: '自动生成并推送每日新闻播客',
    schedule: '每天 07:30',
    status: 'active',
    lastRun: '2026-02-13 07:30',
    platforms: ['Podcast', 'Spotify'],
    success: true
  },
  {
    id: 4,
    name: '评论自动回复',
    description: 'AI 自动回复粉丝评论',
    schedule: '实时监测',
    status: 'paused',
    lastRun: '2026-02-12 18:00',
    platforms: ['YouTube', 'Twitter'],
    success: false
  },
  {
    id: 5,
    name: '数据备份',
    description: '自动备份所有项目数据',
    schedule: '每天 02:00',
    status: 'active',
    lastRun: '2026-02-13 02:00',
    platforms: ['GitHub', 'Cloud'],
    success: true
  },
]

function Automation() {
  const [activeTab, setActiveTab] = useState('all')

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
            <Zap className="text-amber-400" />
            自动化任务
          </motion.h1>
          <p className="text-dark-400 mt-1">配合 OpenClaw 实现自动化运营</p>
        </div>
        <motion.button 
          className="btn-primary flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Plus size={18} />
          新建任务
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
              <CheckCircle2 size={24} className="text-emerald-400" />
            </div>
            <div>
              <p className="text-dark-400 text-sm">运行中</p>
              <p className="text-2xl font-bold">4</p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-amber-500/20 flex items-center justify-center">
              <Pause size={24} className="text-amber-400" />
            </div>
            <div>
              <p className="text-dark-400 text-sm">已暂停</p>
              <p className="text-2xl font-bold">1</p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
              <Calendar size={24} className="text-blue-400" />
            </div>
            <div>
              <p className="text-dark-400 text-sm">本周执行</p>
              <p className="text-2xl font-bold">28</p>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
              <Clock size={24} className="text-purple-400" />
            </div>
            <div>
              <p className="text-dark-400 text-sm">成功率</p>
              <p className="text-2xl font-bold">96%</p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        {['all', 'active', 'paused'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab 
                ? 'bg-primary-500/20 text-white border border-primary-500/30' 
                : 'text-dark-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'all' ? '全部任务' : tab === 'active' ? '运行中' : '已暂停'}
          </button>
        ))}
      </div>

      {/* Tasks List */}
      <div className="space-y-4">
        {automationTasks
          .filter(task => activeTab === 'all' || (activeTab === 'active' && task.status === 'active') || (activeTab === 'paused' && task.status === 'paused'))
          .map((task, index) => (
          <motion.div 
            key={task.id}
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                  task.status === 'active' 
                    ? 'bg-emerald-500/20' 
                    : 'bg-amber-500/20'
                }`}>
                  {task.status === 'active' 
                    ? <Play size={24} className="text-emerald-400" />
                    : <Pause size={24} className="text-amber-400" />
                  }
                </div>
                <div>
                  <h3 className="font-semibold text-lg">{task.name}</h3>
                  <p className="text-dark-400 text-sm">{task.description}</p>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="flex items-center gap-1 text-dark-400 text-sm">
                      <Clock size={14} /> {task.schedule}
                    </span>
                    <span className="flex items-center gap-1 text-dark-400 text-sm">
                      <Calendar size={14} /> 上次: {task.lastRun}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="flex items-center gap-4">
                <div className="flex gap-1">
                  {task.platforms.map(platform => (
                    <span key={platform} className="badge badge-primary">{platform}</span>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  {task.success 
                    ? <CheckCircle2 size={18} className="text-emerald-400" />
                    : <AlertCircle size={18} className="text-red-400" />
                  }
                  <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                    <Settings size={18} className="text-dark-400" />
                  </button>
                  <button className={`p-2 rounded-lg transition-colors ${
                    task.status === 'active' 
                      ? 'bg-amber-500/20 text-amber-400 hover:bg-amber-500/30'
                      : 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                  }`}>
                    {task.status === 'active' ? <Pause size={18} /> : <Play size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Automation
