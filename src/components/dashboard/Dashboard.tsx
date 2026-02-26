import { useNavigate } from 'react-router-dom'
import {
  MessageSquare,
  Image,
  Code2,
  BarChart3,
  FileText,
  Zap,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Clock,
} from 'lucide-react'

interface DashboardProps {
  onNewChat: () => void
  totalChats: number
}

const capabilities = [
  {
    id: 'chat',
    title: 'AI Chat',
    description: 'Natural language conversation with context-aware responses',
    icon: MessageSquare,
    status: 'active' as const,
    color: 'bg-audi-red/10 text-audi-red',
    path: '/chat',
  },
  {
    id: 'analysis',
    title: 'Data Analysis',
    description: 'Analyze datasets, generate insights and visualizations',
    icon: BarChart3,
    status: 'active' as const,
    color: 'bg-blue-500/10 text-blue-400',
    path: '/chat',
  },
  {
    id: 'code',
    title: 'Code Assistant',
    description: 'Generate, review and debug code across languages',
    icon: Code2,
    status: 'active' as const,
    color: 'bg-green-500/10 text-green-400',
    path: '/chat',
  },
  {
    id: 'image',
    title: 'Image Generation',
    description: 'Create and edit images with AI-powered tools',
    icon: Image,
    status: 'coming-soon' as const,
    color: 'bg-purple-500/10 text-purple-400',
    path: '/chat',
  },
  {
    id: 'docs',
    title: 'Document Processing',
    description: 'Summarize, translate and extract data from documents',
    icon: FileText,
    status: 'active' as const,
    color: 'bg-amber-500/10 text-amber-400',
    path: '/chat',
  },
  {
    id: 'automation',
    title: 'Workflow Automation',
    description: 'Automate repetitive tasks with AI-powered workflows',
    icon: Zap,
    status: 'coming-soon' as const,
    color: 'bg-cyan-500/10 text-cyan-400',
    path: '/chat',
  },
]

export default function Dashboard({ onNewChat, totalChats }: DashboardProps) {
  const navigate = useNavigate()

  return (
    <div className="h-full overflow-y-auto bg-audi-dark">
      <div className="max-w-5xl mx-auto px-6 py-8">
        {/* Welcome Section */}
        <div className="mb-10">
          <div className="flex items-center gap-2 mb-2">
            <Sparkles size={16} className="text-audi-red" />
            <span className="text-xs text-audi-red font-medium uppercase tracking-wider">
              Audi AI Platform
            </span>
          </div>
          <h1 className="text-3xl font-semibold text-white mb-3">
            Welcome back
          </h1>
          <p className="text-audi-gray-400 text-sm max-w-xl">
            Your intelligent assistant for engineering, analysis, and creative tasks.
            Powered by advanced AI models tailored for the Audi ecosystem.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4 mb-10">
          <StatCard
            icon={<MessageSquare size={16} />}
            label="Total Conversations"
            value={String(totalChats)}
          />
          <StatCard
            icon={<TrendingUp size={16} />}
            label="AI Models Available"
            value="4"
          />
          <StatCard
            icon={<Clock size={16} />}
            label="Avg. Response Time"
            value="1.2s"
          />
        </div>

        {/* Quick Start */}
        <div className="mb-6">
          <h2 className="text-sm font-medium text-audi-gray-300 mb-4 uppercase tracking-wider">
            Capabilities
          </h2>
        </div>

        {/* Capability Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {capabilities.map((cap) => (
            <button
              key={cap.id}
              onClick={() => {
                if (cap.status === 'active') {
                  onNewChat()
                  navigate(cap.path)
                }
              }}
              disabled={cap.status === 'coming-soon'}
              className="group text-left p-5 rounded-xl bg-audi-card border border-audi-border hover:border-audi-gray-700 hover:bg-audi-card-hover transition-all duration-200 relative overflow-hidden disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {cap.status === 'coming-soon' && (
                <span className="absolute top-3 right-3 px-2 py-0.5 rounded-full bg-audi-gray-800 text-[9px] text-audi-gray-500 uppercase tracking-wider">
                  Coming Soon
                </span>
              )}
              <div className={`w-10 h-10 rounded-xl ${cap.color} flex items-center justify-center mb-4`}>
                <cap.icon size={20} />
              </div>
              <h3 className="text-sm font-medium text-white mb-1.5">{cap.title}</h3>
              <p className="text-xs text-audi-gray-500 leading-relaxed mb-4">
                {cap.description}
              </p>
              {cap.status === 'active' && (
                <div className="flex items-center gap-1 text-xs text-audi-gray-500 group-hover:text-audi-red transition-colors">
                  <span>Get started</span>
                  <ArrowRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  )
}

function StatCard({
  icon,
  label,
  value,
}: {
  icon: React.ReactNode
  label: string
  value: string
}) {
  return (
    <div className="p-4 rounded-xl bg-audi-card border border-audi-border">
      <div className="flex items-center gap-2 text-audi-gray-500 mb-2">
        {icon}
        <span className="text-[10px] uppercase tracking-wider">{label}</span>
      </div>
      <p className="text-2xl font-semibold text-white">{value}</p>
    </div>
  )
}
