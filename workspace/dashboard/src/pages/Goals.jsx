import { useState } from 'react'
import { motion } from 'framer-motion'
import { Plus, Target, Calendar, CheckCircle2, Flame, Trophy, TrendingUp } from 'lucide-react'

const yearlyGoals = [
  { id: 1, title: '完成 12 个项目', current: 6, target: 12, category: '项目', status: 'on-track' },
  { id: 2, title: 'YouTube 订阅数破万', current: 3200, target: 10000, category: '社交', status: 'on-track' },
  { id: 3, title: '博客月访问量 10k', current: 4500, target: 10000, category: '博客', status: 'behind' },
  { id: 4, title: '学会 3 个新技能', current: 1, target: 3, category: '学习', status: 'on-track' },
]

const monthlyGoals = [
  { id: 1, title: '发布 4 篇博客', current: 3, target: 4, week: '第二周' },
  { id: 2, title: '发布 8 个视频', current: 5, target: 8, week: '第二周' },
  { id: 3, title: '社媒互动率提升 10%', current: 7, target: 10, week: '第二周' },
  { id: 4, title: '读完 2 本书', current: 0, target: 2, week: '第二周' },
]

const habits = [
  { id: 1, name: '每日写作', streak: 15, best: 30, status: 'active' },
  { id: 2, name: '锻炼身体', streak: 8, best: 21, status: 'active' },
  { id: 3, name: '学习英语', streak: 0, best: 45, status: 'broken' },
  { id: 4, name: '冥想练习', streak: 5, best: 12, status: 'active' },
]

function GoalCard({ goal, index }) {
  const progress = (goal.current / goal.target) * 100
  const statusColors = {
    'on-track': 'emerald',
    'behind': 'amber',
    'ahead': 'blue',
  }

  return (
    <motion.div 
      className="glass-card p-6"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <span className={`badge badge-${statusColors[goal.status] === 'emerald' ? 'success' : statusColors[goal.status] === 'amber' ? 'warning' : 'primary'}`}>
            {goal.status === 'on-track' ? '正常' : goal.status === 'behind' ? '落后' : '超前'}
          </span>
          <h3 className="text-lg font-semibold mt-3">{goal.title}</h3>
          <p className="text-dark-400 text-sm">{goal.category}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold gradient-text">{goal.current}</p>
          <p className="text-dark-400 text-sm">/ {goal.target}</p>
        </div>
      </div>
      
      <div className="progress-bar">
        <div 
          className="progress-bar-fill" 
          style={{ width: `${progress}%` }}
        />
      </div>
      
      <p className="text-dark-400 text-sm mt-3">
        完成度：{progress.toFixed(0)}%
      </p>
    </motion.div>
  )
}

function Goals() {
  const [activeTab, setActiveTab] = useState('yearly')

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
            <Target className="text-primary-400" />
            目标管理
          </motion.h1>
          <p className="text-dark-400 mt-1">设定目标，追踪进度，实现成长</p>
        </div>
        <motion.button 
          className="btn-primary flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Plus size={18} />
          添加目标
        </motion.button>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-4 gap-6">
        <motion.div 
          className="glass-card p-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center">
            <Trophy size={24} className="text-emerald-400" />
          </div>
          <div>
            <p className="text-dark-400 text-sm">年度目标</p>
            <p className="text-2xl font-bold">3/4</p>
          </div>
        </motion.div>
        <motion.div 
          className="glass-card p-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <div className="w-12 h-12 rounded-xl bg-blue-500/20 flex items-center justify-center">
            <TrendingUp size={24} className="text-blue-400" />
          </div>
          <div>
            <p className="text-dark-400 text-sm">月目标</p>
            <p className="text-2xl font-bold">68%</p>
          </div>
        </motion.div>
        <motion.div 
          className="glass-card p-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-12 h-12 rounded-xl bg-orange-500/20 flex items-center justify-center">
            <Flame size={24} className="text-orange-400" />
          </div>
          <div>
            <p className="text-dark-400 text-sm">连续打卡</p>
            <p className="text-2xl font-bold">15 天</p>
          </div>
        </motion.div>
        <motion.div 
          className="glass-card p-6 flex items-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <div className="w-12 h-12 rounded-xl bg-purple-500/20 flex items-center justify-center">
            <CheckCircle2 size={24} className="text-purple-400" />
          </div>
          <div>
            <p className="text-dark-400 text-sm">完成率</p>
            <p className="text-2xl font-bold">75%</p>
          </div>
        </motion.div>
      </div>

      {/* Tabs */}
      <div className="flex gap-4">
        {['yearly', 'monthly', 'habits'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-6 py-3 rounded-xl font-medium transition-all ${
              activeTab === tab 
                ? 'bg-primary-500/20 text-white border border-primary-500/30' 
                : 'text-dark-400 hover:text-white hover:bg-white/5'
            }`}
          >
            {tab === 'yearly' ? '年度目标' : tab === 'monthly' ? '月度目标' : '习惯养成'}
          </button>
        ))}
      </div>

      {/* Content */}
      {activeTab === 'yearly' && (
        <div className="grid grid-cols-2 gap-6">
          {yearlyGoals.map((goal, index) => (
            <GoalCard key={goal.id} goal={goal} index={index} />
          ))}
        </div>
      )}

      {activeTab === 'monthly' && (
        <div className="grid grid-cols-2 gap-6">
          {monthlyGoals.map((goal, index) => (
            <motion.div 
              key={goal.id}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <span className="badge badge-primary">{goal.week}</span>
                <Calendar size={16} className="text-dark-400" />
              </div>
              <h3 className="text-lg font-semibold mb-4">{goal.title}</h3>
              <div className="progress-bar mb-2">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${(goal.current / goal.target) * 100}%` }}
                />
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-dark-400">{goal.current} / {goal.target}</span>
                <span>{((goal.current / goal.target) * 100).toFixed(0)}%</span>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {activeTab === 'habits' && (
        <div className="grid grid-cols-2 gap-6">
          {habits.map((habit, index) => (
            <motion.div 
              key={habit.id}
              className="glass-card p-6"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    habit.status === 'active' ? 'bg-emerald-500/20' : 'bg-red-500/20'
                  }`}>
                    <Flame size={20} className={habit.status === 'active' ? 'text-emerald-400' : 'text-red-400'} />
                  </div>
                  <div>
                    <h3 className="font-medium">{habit.name}</h3>
                    <p className="text-dark-400 text-sm">最佳记录: {habit.best} 天</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-2xl font-bold gradient-text">{habit.streak}</p>
                  <p className="text-dark-400 text-sm">连续</p>
                </div>
              </div>
              <button className={`w-full py-2 rounded-lg font-medium transition-all ${
                habit.status === 'active' 
                  ? 'bg-emerald-500/20 text-emerald-400 hover:bg-emerald-500/30'
                  : 'bg-white/5 text-dark-400'
              }`}>
                {habit.status === 'active' ? '✓ 已打卡' : '开始新周期'}
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}

export default Goals
