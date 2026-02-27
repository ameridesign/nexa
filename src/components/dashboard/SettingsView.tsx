import { useState } from 'react'
import {
  Settings,
  Cpu,
  Palette,
  Bell,
  Shield,
  Globe,
  ChevronRight,
} from 'lucide-react'

const models = [
  { id: 'gpt-4-turbo', name: 'GPT-4 Turbo', description: 'Most capable model', active: true },
  { id: 'gpt-4', name: 'GPT-4', description: 'High accuracy', active: false },
  { id: 'gpt-3.5', name: 'GPT-3.5 Turbo', description: 'Fast responses', active: false },
  { id: 'claude-3', name: 'Claude 3 Opus', description: 'Advanced reasoning', active: false },
]

export default function SettingsView() {
  const [activeModel, setActiveModel] = useState('gpt-4-turbo')
  const [temperature, setTemperature] = useState(0.7)

  return (
    <div className="h-full overflow-y-auto bg-black">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-surface-card border border-border-default flex items-center justify-center">
            <Settings size={18} className="text-text-tertiary" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Settings</h1>
            <p className="text-xs text-text-muted">Configure your AI experience</p>
          </div>
        </div>

        {/* Model Selection */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Cpu size={14} className="text-text-muted" />
            <h2 className="text-sm font-medium text-text-tertiary uppercase tracking-wider">
              AI Model
            </h2>
          </div>
          <div className="space-y-2">
            {models.map((model) => (
              <button
                key={model.id}
                onClick={() => setActiveModel(model.id)}
                className={`w-full flex items-center justify-between p-4 rounded-xl border transition-colors ${
                  activeModel === model.id
                    ? 'bg-surface-card border-btn-active/30 ring-1 ring-btn-active/20'
                    : 'bg-surface-card border-border-default hover:border-[rgba(255,255,255,0.2)]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      activeModel === model.id
                        ? 'border-btn-active bg-btn-active'
                        : 'border-text-dim'
                    }`}
                  />
                  <div className="text-left">
                    <p className="text-sm text-white">{model.name}</p>
                    <p className="text-[10px] text-text-muted">{model.description}</p>
                  </div>
                </div>
                {activeModel === model.id && (
                  <span className="px-2 py-0.5 rounded-full bg-btn-active/10 text-[10px] text-btn-active uppercase tracking-wider">
                    Active
                  </span>
                )}
              </button>
            ))}
          </div>
        </section>

        {/* Temperature */}
        <section className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <Palette size={14} className="text-text-muted" />
              <h2 className="text-sm font-medium text-text-tertiary uppercase tracking-wider">
                Creativity (Temperature)
              </h2>
            </div>
            <span className="text-sm text-white font-mono">{temperature.toFixed(1)}</span>
          </div>
          <div className="p-4 rounded-xl bg-surface-card border border-border-default">
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-btn-active"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-text-muted">Precise</span>
              <span className="text-[10px] text-text-muted">Balanced</span>
              <span className="text-[10px] text-text-muted">Creative</span>
            </div>
          </div>
        </section>

        {/* Other Settings */}
        <section>
          <h2 className="text-sm font-medium text-text-tertiary uppercase tracking-wider mb-4">
            Preferences
          </h2>
          <div className="space-y-1">
            {[
              { icon: Bell, label: 'Notifications', description: 'Manage alert preferences' },
              { icon: Shield, label: 'Privacy & Security', description: 'Data handling settings' },
              { icon: Globe, label: 'Language & Region', description: 'Display language and locale' },
            ].map((item) => (
              <button
                key={item.label}
                className="w-full flex items-center justify-between p-4 rounded-xl bg-surface-card border border-border-default hover:border-[rgba(255,255,255,0.2)] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} className="text-text-muted" />
                  <div className="text-left">
                    <p className="text-sm text-white">{item.label}</p>
                    <p className="text-[10px] text-text-muted">{item.description}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-text-dim" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
