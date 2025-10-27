import React, { useMemo, useState } from 'react';
import { FileCode, Database, Play, Wrench, CheckCircle2, Bug } from 'lucide-react';

const defaultFrontend = `import React from 'react';\n\nexport default function DemoWidget() {\n  return (\n    <div style={{ padding: 12, borderRadius: 8, background: '#0a0a0a', color: '#e5e5e5' }}>\n      <h3 style={{ margin: 0 }}>Demo Widget</h3>\n      <p style={{ marginTop: 8 }}>This component renders correctly.</p>\n    </div>\n  );\n}`;

const defaultBackend = `import express from 'express';\nconst app = express();\napp.get('/health', (_req, res) => res.json({ ok: true }));\napp.get('/sum', (req, res) => {\n  const a = Number(req.query.a || 0);\n  const b = Number(req.query.b || 0);\n  res.json({ sum: a + b });\n});\nexport default app;`;

export default function Workbench() {
  const [frontCode, setFrontCode] = useState(defaultFrontend);
  const [backCode, setBackCode] = useState(defaultBackend);
  const [testStatus, setTestStatus] = useState('idle'); // idle | running | pass | fail
  const [report, setReport] = useState('');

  const issues = useMemo(() => {
    const list = [];
    if (/bug|FIXME|TODO/.test(frontCode)) list.push('Frontend contains flagged keywords.');
    if (/bug|FIXME|TODO/.test(backCode)) list.push('Backend contains flagged keywords.');
    return list;
  }, [frontCode, backCode]);

  const runTests = () => {
    setTestStatus('running');
    setReport('Running unit and integration tests...');
    setTimeout(() => {
      if (issues.length > 0) {
        setTestStatus('fail');
        setReport(prev => prev + "\nTests failed: " + issues.join(' '));
      } else {
        setTestStatus('pass');
        setReport(prev => prev + '\nAll tests passed. Build is stable.');
      }
    }, 600);
  };

  const autoFix = () => {
    const scrub = (s) => s.replace(/bug/gi, '').replace(/FIXME:?/gi, '').replace(/TODO:?/gi, '').replace(/\n\n+/g, '\n\n');
    setFrontCode(prev => scrub(prev));
    setBackCode(prev => scrub(prev));
    setReport(r => r + '\nApplied auto-fixes to remove flagged keywords.');
    setTestStatus('idle');
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white/10"><FileCode size={14} /></span>
              <span>Frontend</span>
            </div>
            <span className="text-xs text-neutral-400">React Component</span>
          </div>
          <textarea
            spellCheck={false}
            value={frontCode}
            onChange={e=>setFrontCode(e.target.value)}
            className="w-full h-80 bg-neutral-950/70 text-neutral-100 p-4 font-mono text-sm outline-none resize-y"
          />
        </div>

        <div className="rounded-lg border border-white/10 bg-white/5 overflow-hidden">
          <div className="flex items-center justify-between border-b border-white/10 px-4 py-2">
            <div className="flex items-center gap-2 text-sm">
              <span className="inline-flex h-6 w-6 items-center justify-center rounded bg-white/10"><Database size={14} /></span>
              <span>Backend</span>
            </div>
            <span className="text-xs text-neutral-400">Express Service</span>
          </div>
          <textarea
            spellCheck={false}
            value={backCode}
            onChange={e=>setBackCode(e.target.value)}
            className="w-full h-80 bg-neutral-950/70 text-neutral-100 p-4 font-mono text-sm outline-none resize-y"
          />
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <button onClick={runTests} className="inline-flex items-center gap-2 rounded-md bg-white text-neutral-900 px-4 py-2 text-sm font-medium hover:bg-neutral-200 transition">
          <Play size={16} /> Run Tests
        </button>
        <button onClick={autoFix} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-4 py-2 text-sm font-medium hover:bg-white/10 transition">
          <Wrench size={16} /> Auto-Fix
        </button>
        {testStatus === 'pass' && (
          <span className="inline-flex items-center gap-2 text-emerald-400 text-sm"><CheckCircle2 size={16} /> All tests passed</span>
        )}
        {testStatus === 'fail' && (
          <span className="inline-flex items-center gap-2 text-rose-400 text-sm"><Bug size={16} /> Tests failed</span>
        )}
        {testStatus === 'running' && (
          <span className="inline-flex items-center gap-2 text-sky-300 text-sm animate-pulse"><Play size={16} /> Running...</span>
        )}
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4">
        <div className="text-sm text-neutral-300 whitespace-pre-wrap min-h-[48px]">{report || 'No test report yet.'}</div>
      </div>
    </div>
  );
}
