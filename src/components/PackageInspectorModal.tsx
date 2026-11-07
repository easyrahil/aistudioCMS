import React, { useState, useEffect } from 'react';
import { X, Download, FileCode, Check, Copy, ExternalLink, Folder, Layers, Terminal } from 'lucide-react';
import { inspectableFiles } from '../data/initialData';

interface PackageInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PackageInspectorModal: React.FC<PackageInspectorModalProps> = ({ isOpen, onClose }) => {
  const [selectedFile, setSelectedFile] = useState<string>('core/Router.php');
  const [fileContent, setFileContent] = useState<string>('Loading PHP source code...');
  const [copied, setCopied] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (!isOpen) return;

    setLoading(true);
    fetch(`/api/cms/inspect?file=${encodeURIComponent(selectedFile)}`)
      .then((res) => res.json())
      .then((data) => {
        if (data.content) {
          setFileContent(data.content);
        } else {
          setFileContent('// File content could not be loaded.');
        }
      })
      .catch((err) => {
        setFileContent(`// Error reading file: ${err.message}`);
      })
      .finally(() => setLoading(false));
  }, [isOpen, selectedFile]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(fileContent);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-5xl h-[85vh] flex flex-col shadow-2xl overflow-hidden">
        {/* Modal Header */}
        <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg border border-blue-500/20 text-sky-400">
              <FileCode className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                ApexCMS Standalone Source Inspector
                <span className="text-xs bg-emerald-500/10 text-emerald-400 px-2 py-0.5 rounded-full border border-emerald-500/30">
                  PHP 8.2+ Strict Types
                </span>
              </h2>
              <p className="text-xs text-slate-400">
                Explore the actual production files packaged inside <code>apexcms-v1.0.0.zip</code>
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <a
              href="/download/apexcms-v1.0.0.zip"
              download="apexcms-v1.0.0.zip"
              className="flex items-center gap-2 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold shadow transition"
            >
              <Download className="w-4 h-4" />
              Download .ZIP
            </a>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Modal Body */}
        <div className="flex-1 flex overflow-hidden">
          {/* File Tree Sidebar */}
          <div className="w-64 border-r border-slate-800 bg-slate-950/50 p-3 overflow-y-auto">
            <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 py-1 mb-1">
              Package Files
            </div>
            <div className="space-y-0.5">
              {inspectableFiles.map((f) => (
                <button
                  key={f.path}
                  onClick={() => setSelectedFile(f.path)}
                  className={`w-full text-left px-2.5 py-1.5 rounded-lg text-xs font-mono flex items-center justify-between transition ${
                    selectedFile === f.path
                      ? 'bg-blue-600/20 text-sky-400 font-semibold border border-blue-500/30'
                      : 'text-slate-400 hover:bg-slate-800/60 hover:text-slate-200'
                  }`}
                >
                  <span className="truncate">{f.name}</span>
                  <span className="text-[9px] text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded ml-1">
                    {f.category}
                  </span>
                </button>
              ))}
            </div>

            <div className="mt-6 p-3 bg-slate-900/90 rounded-xl border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <div className="font-semibold text-slate-300 flex items-center gap-1.5">
                <Terminal className="w-3.5 h-3.5 text-sky-400" /> Standalone Setup
              </div>
              <p>Unzip into document root, point web server to <code>/public</code>, and visit <code>/install</code>.</p>
            </div>
          </div>

          {/* Code Viewer */}
          <div className="flex-1 flex flex-col bg-slate-900 overflow-hidden">
            <div className="px-4 py-2 border-b border-slate-800 flex items-center justify-between bg-slate-950/70 text-xs font-mono text-slate-400">
              <span className="text-sky-400 font-semibold">{selectedFile}</span>
              <button
                onClick={handleCopy}
                className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded transition"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                {copied ? 'Copied' : 'Copy Source'}
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto font-mono text-xs leading-relaxed text-slate-200 bg-slate-950/95">
              {loading ? (
                <div className="flex items-center justify-center h-full text-slate-500">
                  Loading source code...
                </div>
              ) : (
                <pre className="whitespace-pre-wrap">{fileContent}</pre>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
