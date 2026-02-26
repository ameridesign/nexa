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
    <div className="h-full overflow-y-auto bg-audi-dark">
      <div className="max-w-3xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="w-10 h-10 rounded-xl bg-audi-card border border-audi-border flex items-center justify-center">
            <Settings size={18} className="text-audi-gray-300" />
          </div>
          <div>
            <h1 className="text-xl font-semibold text-white">Settings</h1>
            <p className="text-xs text-audi-gray-500">Configure your AI experience</p>
          </div>
        </div>

        {/* Model Selection */}
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-4">
            <Cpu size={14} className="text-audi-gray-400" />
            <h2 className="text-sm font-medium text-audi-gray-300 uppercase tracking-wider">
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
                    ? 'bg-audi-card border-audi-red/30 ring-1 ring-audi-red/20'
                    : 'bg-audi-card border-audi-border hover:border-audi-gray-700'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-3 h-3 rounded-full border-2 ${
                      activeModel === model.id
                        ? 'border-audi-red bg-audi-red'
                        : 'border-audi-gray-600'
                    }`}
                  />
                  <div className="text-left">
                    <p className="text-sm text-white">{model.name}</p>
                    <p className="text-[10px] text-audi-gray-500">{model.description}</p>
                  </div>
                </div>
                {activeModel === model.id && (
                  <span className="px-2 py-0.5 rounded-full bg-audi-red/10 text-[10px] text-audi-red uppercase tracking-wider">
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
              <Palette size={14} className="text-audi-gray-400" />
              <h2 className="text-sm font-medium text-audi-gray-300 uppercase tracking-wider">
                Creativity (Temperature)
              </h2>
            </div>
            <span className="text-sm text-white font-mono">{temperature.toFixed(1)}</span>
          </div>
          <div className="p-4 rounded-xl bg-audi-card border border-audi-border">
            <input
              type="range"
              min="0"
              max="2"
              step="0.1"
              value={temperature}
              onChange={(e) => setTemperature(parseFloat(e.target.value))}
              className="w-full accent-audi-red"
            />
            <div className="flex justify-between mt-2">
              <span className="text-[10px] text-audi-gray-500">Precise</span>
              <span className="text-[10px] text-audi-gray-500">Balanced</span>
              <span className="text-[10px] text-audi-gray-500">Creative</span>
            </div>
          </div>
        </section>

        {/* Other Settings */}
        <section>
          <h2 className="text-sm font-medium text-audi-gray-300 uppercase tracking-wider mb-4">
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
                className="w-full flex items-center justify-between p-4 rounded-xl bg-audi-card border border-audi-border hover:border-audi-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <item.icon size={16} className="text-audi-gray-400" />
                  <div className="text-left">
                    <p className="text-sm text-white">{item.label}</p>
                    <p className="text-[10px] text-audi-gray-500">{item.description}</p>
                  </div>
                </div>
                <ChevronRight size={14} className="text-audi-gray-600" />
              </button>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}
