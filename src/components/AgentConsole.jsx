import React, { useMemo, useState } from 'react';
import { MessageSquare, User, CheckCircle2, Bug, Hammer } from 'lucide-react';

const roles = [
  { key: 'architect', label: 'Architect', color: 'from-fuchsia-500 to-violet-500' },
  { key: 'product', label: 'Product Manager', color: 'from-amber-400 to-orange-500' },
  { key: 'team', label: 'Team Leader', color: 'from-sky-400 to-blue-500' },
  { key: 'engineer', label: 'Engineer', color: 'from-emerald-400 to-teal-500' },
  { key: 'analyst', label: 'Data Analyst', color: 'from-pink-400 to-rose-500' },
];

const initialMessages = [
  { id: 1, role: 'product', text: 'User goal: "Build a portal where AI agents collaboratively deliver apps and websites."', ts: new Date().toLocaleTimeString() },
  { id: 2, role: 'architect', text: 'Proposed architecture: React + Tailwind UI, Agent state manager, dual-pane Frontend/Backend workbench, test runner.', ts: new Date().toLocaleTimeString() },
  { id: 3, role: 'team', text: 'Plan: Scope -> Decompose -> Implement -> Test -> Present. Assigning tasks to roles...', ts: new Date().toLocaleTimeString() },
  { id: 4, role: 'engineer', text: 'Implementing Workbench editors and test hooks. Wiring UI interactions.', ts: new Date().toLocaleTimeString() },
  { id: 5, role: 'analyst', text: 'Defining success metrics: build passes tests, no lint errors, artifacts exported.', ts: new Date().toLocaleTimeString() },
];

export default function AgentConsole() {
  const [activeRole, setActiveRole] = useState('all');
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [composeRole, setComposeRole] = useState('engineer');

  const filtered = useMemo(() => {
    if (activeRole === 'all') return messages;
    return messages.filter(m => m.role === activeRole);
  }, [messages, activeRole]);

  const handleSend = (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text) return;
    const msg = {
      id: Date.now(),
      role: composeRole,
      text,
      ts: new Date().toLocaleTimeString(),
    };
    setMessages(prev => [...prev, msg]);
    setInput('');
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      <div className="lg:col-span-4 space-y-4">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-1 gap-3">
          <button
            onClick={() => setActiveRole('all')}
            className={`group relative overflow-hidden rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition ${activeRole==='all' ? 'ring-2 ring-white/20' : ''}`}
          >
            <div className="flex items-center gap-3">
              <div className="h-8 w-8 rounded-md bg-gradient-to-br from-neutral-500 to-neutral-700 grid place-items-center">
                <MessageSquare size={16} />
              </div>
              <div>
                <div className="font-medium">All Agents</div>
                <div className="text-xs text-neutral-400">Unified conversation</div>
              </div>
            </div>
          </button>
          {roles.map(r => (
            <button
              key={r.key}
              onClick={() => setActiveRole(r.key)}
              className={`relative overflow-hidden rounded-lg border border-white/10 bg-white/5 px-4 py-3 text-left transition ${activeRole===r.key ? 'ring-2 ring-white/20' : ''}`}
            >
              <div className="flex items-center gap-3">
                <div className={`h-8 w-8 rounded-md bg-gradient-to-br ${r.color} grid place-items-center`}>
                  <User size={16} />
                </div>
                <div>
                  <div className="font-medium">{r.label}</div>
                  <div className="text-xs text-neutral-400 capitalize">{r.key}</div>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 p-4">
          <div className="flex items-center gap-2 text-sm text-neutral-300">
            <CheckCircle2 className="text-emerald-400" size={16} /> Ready
            <span className="mx-2 text-white/20">•</span>
            <Hammer className="text-amber-300" size={16} /> Implementing
            <span className="mx-2 text-white/20">•</span>
            <Bug className="text-rose-400" size={16} /> Testing
          </div>
        </div>
      </div>

      <div className="lg:col-span-8">
        <div className="rounded-lg border border-white/10 bg-white/5 flex flex-col h-[520px]">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <div className="text-sm text-neutral-300">Conversation — {activeRole === 'all' ? 'All Agents' : roles.find(r=>r.key===activeRole)?.label}</div>
            <div className="text-xs text-neutral-400">{filtered.length} messages</div>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {filtered.map(m => {
              const roleMeta = roles.find(r => r.key === m.role);
              return (
                <div key={m.id} className="flex items-start gap-3">
                  <div className={`mt-1 h-7 w-7 shrink-0 rounded-md bg-gradient-to-br ${roleMeta?.color ?? 'from-neutral-500 to-neutral-700'} grid place-items-center`}>
                    <User size={14} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <div className="font-medium text-sm capitalize">{m.role}</div>
                      <div className="text-[10px] text-neutral-400">{m.ts}</div>
                    </div>
                    <div className="text-sm text-neutral-200 leading-relaxed">{m.text}</div>
                  </div>
                </div>
              );
            })}
          </div>
          <form onSubmit={handleSend} className="border-t border-white/10 p-3 flex items-center gap-2">
            <select
              value={composeRole}
              onChange={e=>setComposeRole(e.target.value)}
              className="bg-transparent border border-white/10 rounded-md text-sm px-2 py-2 outline-none focus:border-white/20"
            >
              {roles.map(r => <option key={r.key} value={r.key} className="bg-neutral-900">{r.label}</option>)}
            </select>
            <input
              value={input}
              onChange={e=>setInput(e.target.value)}
              placeholder="Send a message as selected agent..."
              className="flex-1 bg-transparent border border-white/10 rounded-md px-3 py-2 text-sm outline-none focus:border-white/20 placeholder:text-neutral-500"
            />
            <button type="submit" className="rounded-md bg-white text-neutral-900 px-3 py-2 text-sm font-medium hover:bg-neutral-200 transition">Send</button>
          </form>
        </div>
      </div>
    </div>
  );
}
