import React from 'react';
import Spline from '@splinetool/react-spline';
import { Rocket } from 'lucide-react';

export default function Hero() {
  return (
    <section className="relative w-full h-[70vh] overflow-hidden">
      <div className="absolute inset-0">
        <Spline scene="https://prod.spline.design/4cHQr84zOGAHOehh/scene.splinecode" style={{ width: '100%', height: '100%' }} />
      </div>

      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(82,0,255,0.15),transparent_60%)] pointer-events-none" />

      <div className="relative z-10 h-full flex items-center justify-center text-center px-4">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/80 backdrop-blur">
            <Rocket size={14} className="text-violet-300" />
            <span>Autonomous AI Agent Portal</span>
          </div>
          <h1 className="mt-4 text-4xl sm:text-6xl font-semibold leading-tight">
            Build software with a multi-agent AI team
          </h1>
          <p className="mt-4 text-neutral-300 text-base sm:text-lg">
            From idea to delivery: planning, architecture, coding, testing, and presentation — visible and auditable at every step.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
            <a href="#agents" className="rounded-md bg-white text-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-200 transition">Meet the Agents</a>
            <a href="#workbench" className="rounded-md border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10 transition">Open Workbench</a>
          </div>
        </div>
      </div>
    </section>
  );
}
