import { motion } from 'framer-motion'
import { Plus, Github, ExternalLink, Star, MoreVertical, FolderGit2 } from 'lucide-react'

const projects = [
  {
    id: 1,
    name: '个人博客',
    description: '基于 GitHub Pages 的个人技术博客',
    tech: ['HTML', 'CSS', 'JavaScript'],
    progress: 85,
    stars: 12,
    forks: 3,
    url: 'https://github.com/robin0918/personal-blog',
    status: 'active',
    lastUpdate: '2026-02-13'
  },
  {
    id: 2,
    name: '播客项目',
    description: 'AI 驱动的自动化播客生成系统',
    tech: ['Python', 'FFmpeg', 'Edge TTS'],
    progress: 100,
    stars: 8,
    forks: 2,
    url: 'https://github.com/robin0918/podcast-project',
    status: 'completed',
    lastUpdate: '2026-02-12'
  },
  {
    id: 3,
    name: 'YouTube 频道',
    description: '自动化视频生成和发布平台',
    tech: ['Python', 'Remotion', 'React'],
    progress: 60,
    stars: 15,
    forks: 5,
    url: 'https://github.com/robin0918/video-project',
    status: 'active',
    lastUpdate: '2026-02-11'
  },
  {
    id: 4,
    name: '文案创作助手',
    description: 'AI 文案生成和优化工具',
    tech: ['Python', 'OpenAI API', 'Streamlit'],
    progress: 45,
    stars: 6,
    forks: 1,
    url: 'https://github.com/robin0918/copywriting-project',
    status: 'active',
    lastUpdate: '2026-02-10'
  },
  {
    id: 5,
    name: '个人工作台',
    description: '统一的项目管理和社媒运营平台',
    tech: ['React', 'Node.js', 'TailwindCSS'],
    progress: 20,
    stars: 0,
    forks: 0,
    url: 'https://github.com/robin0918/personal-dashboard',
    status: 'active',
    lastUpdate: '2026-02-13'
  },
  {
    id: 6,
    name: '记账 Web App',
    description: 'Twitter 风格的私人日记应用',
    tech: ['React', 'Firebase', 'TailwindCSS'],
    progress: 75,
    stars: 10,
    forks: 2,
    url: 'https://github.com/robin0918/ledger-app',
    status: 'active',
    lastUpdate: '2026-02-09'
  }
]

function Projects() {
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
            <FolderGit2 className="text-primary-400" />
            项目管理
          </motion.h1>
          <p className="text-dark-400 mt-1">统一管理所有项目，追踪进度和更新</p>
        </div>
        <motion.button 
          className="btn-primary flex items-center gap-2"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
        >
          <Plus size={18} />
          新建项目
        </motion.button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-6">
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <p className="text-dark-400 text-sm">总项目数</p>
          <p className="text-3xl font-bold mt-1 gradient-text">6</p>
        </motion.div>
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <p className="text-dark-400 text-sm">进行中</p>
          <p className="text-3xl font-bold mt-1 text-blue-400">5</p>
        </motion.div>
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-dark-400 text-sm">已完成</p>
          <p className="text-3xl font-bold mt-1 text-emerald-400">1</p>
        </motion.div>
        <motion.div 
          className="glass-card p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <p className="text-dark-400 text-sm">总 Star</p>
          <p className="text-3xl font-bold mt-1 text-amber-400">51</p>
        </motion.div>
      </div>

      {/* Projects Grid */}
      <div className="grid grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <motion.div 
            key={project.id}
            className="glass-card p-6 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <div className="flex items-start justify-between mb-4">
              <div>
                <h3 className="text-xl font-semibold mb-1">{project.name}</h3>
                <p className="text-dark-400 text-sm">{project.description}</p>
              </div>
              <button className="p-2 rounded-lg hover:bg-white/10 transition-colors">
                <MoreVertical size={18} className="text-dark-400" />
              </button>
            </div>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-2 mb-4">
              {project.tech.map(tech => (
                <span key={tech} className="badge badge-primary">{tech}</span>
              ))}
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-sm mb-2">
                <span className="text-dark-400">进度</span>
                <span>{project.progress}%</span>
              </div>
              <div className="progress-bar">
                <div 
                  className="progress-bar-fill" 
                  style={{ width: `${project.progress}%` }}
                />
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-4 border-t border-white/10">
              <div className="flex items-center gap-4 text-sm text-dark-400">
                <span className="flex items-center gap-1">
                  <Star size={14} /> {project.stars}
                </span>
                <span className="flex items-center gap-1">
                  <GitBranch size={14} /> {project.forks}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className={`badge ${
                  project.status === 'completed' ? 'badge-success' : 'badge-primary'
                }`}>
                  {project.status === 'completed' ? '已完成' : '进行中'}
                </span>
                <a 
                  href={project.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-colors"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

export default Projects
