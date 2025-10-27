import React, { useState } from 'react';
import { CheckCircle2, FileCode, Database, Cloud, Download } from 'lucide-react';

function Card({ icon, title, description, action }) {
  return (
    <div className="rounded-lg border border-white/10 bg-white/5 p-4 flex flex-col">
      <div className="flex items-center gap-3">
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-md bg-white/10">{icon}</span>
        <div>
          <div className="font-medium">{title}</div>
          <div className="text-sm text-neutral-400">{description}</div>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="inline-flex items-center gap-2 text-emerald-400 text-sm"><CheckCircle2 size={16} /> Ready</span>
        <button onClick={action} className="inline-flex items-center gap-2 rounded-md border border-white/20 px-3 py-1.5 text-sm hover:bg-white/10 transition">
          <Download size={16} /> Export
        </button>
      </div>
    </div>
  );
}

export default function Deliverables() {
  const [exportMsg, setExportMsg] = useState('');
  const handleExport = (name) => () => {
    setExportMsg(`Exported: ${name} — check your downloads.`);
    // In a real system we would trigger a download of generated assets.
  };

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card
          icon={<FileCode size={18} />}
          title="Frontend Bundle"
          description="Optimized React build with UI components."
          action={handleExport('frontend-bundle.zip')}
        />
        <Card
          icon={<Database size={18} />}
          title="Backend Service"
          description="Node/Express service with endpoints."
          action={handleExport('backend-service.zip')}
        />
        <Card
          icon={<Cloud size={18} />}
          title="Infrastructure"
          description="Deployment config and CI pipeline."
          action={handleExport('infrastructure.yml')}
        />
        <Card
          icon={<FileCode size={18} />}
          title="API & Test Report"
          description="OpenAPI spec and test summary."
          action={handleExport('reports.zip')}
        />
      </div>

      <div className="rounded-lg border border-white/10 bg-white/5 p-4 text-sm text-neutral-300 min-h-[44px]">
        {exportMsg || 'Exports will appear here after you click any Export button.'}
      </div>
    </div>
  );
}
