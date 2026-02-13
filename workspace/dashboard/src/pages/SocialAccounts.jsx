import { useState } from 'react'
import { motion } from 'framer-motion'
import { 
  Plus, 
  Twitter, 
  Youtube, 
  Instagram, 
  Github, 
  Globe,
  Shield,
  Zap,
  Settings,
  ExternalLink,
  CheckCircle2,
  AlertCircle
} from 'lucide-react'

const socialAccounts = [
  {
    id: 1,
    platform: 'GitHub',
    username: '@robin0918',
    icon: Github,
    color: 'gray',
    connected: true,
    followers: 125,
    posts: 45,
    lastActive: '2026-02-13',
    environment: 'default',
    automation: true
  },
  {
    id: 2,
    platform: 'YouTube',
    username: '@龙王',
    icon: Youtube,
    color: 'red',
    connected: true,
    followers: 3200,
    posts: 28,
    lastActive: '2026-02-12',
    environment: 'profile-1',
    automation: true
  },
  {
    id: 3,
    platform: 'Twitter',
    username: '@longwang_tech',
    icon: Twitter,
    color: 'blue',
    connected: true,
    followers: 890,
    posts: 156,
    lastActive: '2026-02-13',
    environment: 'profile-2',
    automation: true
  },
  {
    id: 4,
    platform: 'Blog',
    username: 'robin0918.github.io',
    icon: Globe,
    color: 'green',
    connected: true,
    visitors: 4500,
    posts: 12,
    lastActive: '2026-02-13',
    environment: 'default',
    automation: false
  },
]

const environments = [
  { id: 'default', name: '默认环境', browser: 'Chrome', cookies: 124 },
  { id: 'profile-1', name: 'YouTube 专用', browser: 'Chrome Profile 1', cookies: 89 },
  { id: 'profile-2', name: 'Twitter 专用', browser: 'Chrome Profile 2', cookies: 76 },
  { id: 'profile-3', name: 'Instagram 专用', browser: 'Chrome Profile 3', cookies: 45 },
]

function SocialAccounts() {
  const [showAddModal, setShowAddModal] = useState(false)

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
            <Shield className="text-primary-400" />
            社媒账号管理
          </motion.h1>
          <p className="text-dark-400 mt-1">多平台账号绑定 + 独立环境隔离</p>
        </div>
        <motion.button 
          className="btn-primary flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          onClick={() => setShowAddModal(true)}
        >
          <Plus size={18} />
          绑定账号
        </motion.button>
      </div>

      {/* Environment Cards */}
      <div className="grid grid-cols-4 gap-4">
        {environments.map((env, index) => (
          <motion.div 
            key={env.id}
            className="glass-card p-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 rounded-lg bg-dark-700 flex items-center justify-center">
                <Globe size={16} className="text-primary-400" />
              </div>
              <div>
                <p className="font-medium text-sm">{env.name}</p>
                <p className="text-dark-400 text-xs">{env.browser}</p>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-dark-400">{env.cookies} cookies</span>
              <span className="badge badge-success">活跃</span>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Accounts Grid */}
      <div className="grid grid-cols-2 gap-6">
        {socialAccounts.map((account, index) => (
          <motion.div 
            key={account.id}
            className="glass-card p-6"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className={`w-14 h-14 rounded-2xl bg-${account.color}-500/20 flex items-center justify-center`}>
                  <account.icon size={28} className={`text-${account.color}-400`} />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">{account.platform}</h3>
                  <p className="text-dark-400">{account.username}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {account.automation && (
                  <span className="badge badge-success flex items-center gap-1">
                    <Zap size={12} /> 自动化
                  </span>
                )}
                <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                  <Settings size={18} className="text-dark-400" />
                </button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-4 mb-6">
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-dark-400 text-xs mb-1">
                  {account.platform === 'Blog' ? '月访问量' : '粉丝数'}
                </p>
                <p className="text-xl font-bold">
                  {account.platform === 'Blog' 
                    ? account.visitors.toLocaleString() 
                    : account.followers.toLocaleString()
                  }
                </p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-dark-400 text-xs mb-1">内容数</p>
                <p className="text-xl font-bold">{account.posts}</p>
              </div>
              <div className="bg-white/5 rounded-xl p-3 text-center">
                <p className="text-dark-400 text-xs mb-1">环境</p>
                <p className="text-sm font-medium">
                  {account.environment === 'default' ? '默认' : '专用'}
                </p>
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-2 text-sm text-dark-400">
                <CheckCircle2 size={14} className="text-emerald-400" />
                最后活跃: {account.lastActive}
              </div>
              <div className="flex items-center gap-2">
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <ExternalLink size={16} />
                </button>
                <button className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors">
                  <Shield size={16} />
                </button>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Info Card */}
      <motion.div 
        className="glass-card p-6 bg-gradient-to-r from-primary-500/10 to-purple-500/10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-xl bg-primary-500/20 flex items-center justify-center flex-shrink-0">
            <Shield size={24} className="text-primary-400" />
          </div>
          <div>
            <h3 className="font-semibold mb-2">🔒 独立环境说明</h3>
            <p className="text-dark-400 text-sm">
              每个社媒账号运行在独立的浏览器环境中，模拟真实的用户行为。
              配合 OpenClaw 实现自动化运营，再也不用担心账号关联问题。
            </p>
            <div className="flex gap-3 mt-4">
              <span className="badge badge-primary">指纹隔离</span>
              <span className="badge badge-primary">Cookie 独立</span>
              <span className="badge badge-primary">IP 轮换</span>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default SocialAccounts
