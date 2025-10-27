import React from 'react';
import Hero from './components/Hero';
import AgentConsole from './components/AgentConsole';
import Workbench from './components/Workbench';
import Deliverables from './components/Deliverables';

export default function App() {
  return (
    <div className="min-h-screen w-full bg-neutral-950 text-neutral-100">
      <Hero />
      <main className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-20 pb-24">
        <section id="agents" className="space-y-6">
          <div className="flex items-end justify-between gap-4">
            <div>
              <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">AI Team Workspace</h2>
              <p className="text-neutral-400 mt-1">Architect, Product Manager, Team Leader, Engineer, and Data Analyst collaborate in real-time.</p>
            </div>
          </div>
          <AgentConsole />
        </section>

        <section id="workbench" className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Build Workbench</h2>
            <p className="text-neutral-400 mt-1">Frontend and Backend work surfaces with testing and auto-fix.</p>
          </div>
          <Workbench />
        </section>

        <section id="deliverables" className="space-y-6">
          <div>
            <h2 className="text-2xl sm:text-3xl font-semibold tracking-tight">Project Deliverables</h2>
            <p className="text-neutral-400 mt-1">Review, preview, and export the artifacts prepared by the AI team.</p>
          </div>
          <Deliverables />
        </section>
      </main>
    </div>
  );
}
