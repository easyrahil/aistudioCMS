import React, { useState } from 'react';
import { CheckCircle2, AlertCircle, Database, ShieldCheck, Key, ArrowRight, Lock, Sparkles, RefreshCw } from 'lucide-react';

interface InstallWizardViewProps {
  onInstallationComplete: () => void;
}

export const InstallWizardView: React.FC<InstallWizardViewProps> = ({ onInstallationComplete }) => {
  const [step, setStep] = useState<number>(1);
  const [dbDriver, setDbDriver] = useState<'mysql' | 'sqlite'>('mysql');
  const [dbHost, setDbHost] = useState('127.0.0.1');
  const [dbPort, setDbPort] = useState('3306');
  const [dbName, setDbName] = useState('apexcms_prod');
  const [dbUser, setDbUser] = useState('apex_admin');
  const [dbPass, setDbPass] = useState('••••••••••••');
  const [dbTesting, setDbTesting] = useState(false);
  const [dbSuccess, setDbSuccess] = useState<boolean | null>(null);

  const [adminUser, setAdminUser] = useState('admin');
  const [adminEmail, setAdminEmail] = useState('admin@apexcms.internal');
  const [adminPass, setAdminPass] = useState('SuperSecretArgon2id#2026');

  const [isMigrating, setIsMigrating] = useState(false);
  const [migrationLogs, setMigrationLogs] = useState<string[]>([]);
  const [isLocked, setIsLocked] = useState(false);

  const testDbConnection = () => {
    setDbTesting(true);
    setDbSuccess(null);
    setTimeout(() => {
      setDbTesting(false);
      setDbSuccess(true);
    }, 700);
  };

  const runInstallation = () => {
    setIsMigrating(true);
    setMigrationLogs([
      'Establishing PDO connection via utf8mb4_unicode_ci...',
      'Executing database/schema.sql (10 tables, Foreign Keys, Indexes)...',
      'Creating table `users` with Argon2id security hash...',
      'Creating table `posts` and `categories` with slug unique constraints...',
      'Creating table `products` with digital token licensing support...',
      'Creating table `orders` and `order_items`...',
      'Creating table `redirects` and `not_found_logs` for SEO monitoring...',
      'Executing database/seeds.sql (Homepage blocks, default settings)...',
      'Generating application encryption secret key...',
      'Writing production config.php to server root...',
      'Writing install/install.lock to prevent unauthorized re-execution...'
    ]);

    setTimeout(() => {
      setIsMigrating(false);
      setIsLocked(true);
      setStep(5);
    }, 1800);
  };

  return (
    <div className="min-h-[85vh] py-12 px-4 flex items-center justify-center">
      <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl relative overflow-hidden">
        {/* Background glow */}
        <div className="absolute -top-24 -right-24 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>

        {/* Wizard Header */}
        <div className="flex items-center justify-between pb-6 border-b border-slate-800 mb-6">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1.5 bg-blue-500/10 rounded-lg text-sky-400 font-bold text-xs">ApexCMS Installer</span>
              <span className="text-xs text-slate-500 font-mono">/install/index.php</span>
            </div>
            <h1 className="text-xl font-bold text-white mt-1">Enterprise Web Setup Wizard</h1>
          </div>
          <div className="text-xs font-mono bg-slate-950 px-3 py-1.5 rounded-xl border border-slate-800 text-slate-400">
            Step {step} of 5
          </div>
        </div>

        {/* Step 1: Requirements Check */}
        {step === 1 && (
          <div className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-base font-semibold text-white">System Environment Verification</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Verifying PHP extensions, server permissions, and opcode cache capabilities.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {[
                { name: 'PHP 8.2+ Runtime', desc: 'Active: PHP 8.2.35 CLI / FPM', ok: true },
                { name: 'PDO MySQL & SQLite Driver', desc: 'utf8mb4 prepared statements enabled', ok: true },
                { name: 'Multibyte String (mbstring)', desc: 'Full UTF-8 unicode encoding support', ok: true },
                { name: 'XML & SimpleXML Driver', desc: 'Automated sitemap.xml & RSS feeds', ok: true },
                { name: 'Sodium & Argon2id', desc: 'Secure RFC 9106 password hashing', ok: true },
                { name: 'Storage Write Permissions', desc: '/storage/backups & /uploads writable', ok: true }
              ].map((req, i) => (
                <div key={i} className="p-3.5 bg-slate-950/70 border border-slate-800/80 rounded-xl flex items-start gap-3">
                  <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <div className="text-xs font-bold text-white">{req.name}</div>
                    <div className="text-[11px] text-slate-400">{req.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-4 flex justify-end">
              <button
                onClick={() => setStep(2)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition"
              >
                Continue to Database Setup
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 2: Database Setup */}
        {step === 2 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h2 className="text-base font-semibold text-white">Database Connection Setup</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                Configure your relational storage engine with PDO prepared statements.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setDbDriver('mysql')}
                className={`p-3 rounded-xl border text-left transition ${
                  dbDriver === 'mysql'
                    ? 'bg-blue-600/10 border-blue-500/50 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold">MySQL / MariaDB</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Production utf8mb4 with InnoDB FKs</div>
              </button>
              <button
                type="button"
                onClick={() => setDbDriver('sqlite')}
                className={`p-3 rounded-xl border text-left transition ${
                  dbDriver === 'sqlite'
                    ? 'bg-blue-600/10 border-blue-500/50 text-white'
                    : 'bg-slate-950 border-slate-800 text-slate-400'
                }`}
              >
                <div className="text-xs font-bold">SQLite 3</div>
                <div className="text-[10px] text-slate-500 mt-0.5">Zero-config file-based database</div>
              </button>
            </div>

            {dbDriver === 'mysql' ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Database Host</label>
                  <input
                    type="text"
                    value={dbHost}
                    onChange={(e) => setDbHost(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Port</label>
                  <input
                    type="text"
                    value={dbPort}
                    onChange={(e) => setDbPort(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Database Name</label>
                  <input
                    type="text"
                    value={dbName}
                    onChange={(e) => setDbName(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-slate-300 font-medium mb-1">Database User</label>
                  <input
                    type="text"
                    value={dbUser}
                    onChange={(e) => setDbUser(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-400">
                Database file path: <code>storage/database.sqlite</code> (Auto-created during migration)
              </div>
            )}

            <div className="flex items-center justify-between pt-2">
              <button
                type="button"
                onClick={testDbConnection}
                disabled={dbTesting}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold transition"
              >
                {dbTesting ? <RefreshCw className="w-3.5 h-3.5 animate-spin" /> : <Database className="w-3.5 h-3.5 text-sky-400" />}
                {dbTesting ? 'Testing Connection...' : 'Test Connection'}
              </button>
              {dbSuccess && (
                <span className="text-xs text-emerald-400 font-semibold flex items-center gap-1">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Connection Verified!
                </span>
              )}
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(1)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                &larr; Back
              </button>
              <button
                onClick={() => setStep(3)}
                className="flex items-center gap-2 px-5 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition"
              >
                Next: Administrator Account
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Administrator Credentials */}
        {step === 3 && (
          <div className="space-y-5 animate-fade-in">
            <div>
              <h2 className="text-base font-semibold text-white">Administrator Credentials</h2>
              <p className="text-xs text-slate-400 mt-0.5">
                This account will hold full super-admin permissions across the CMS.
              </p>
            </div>

            <div className="space-y-3 text-xs">
              <div>
                <label className="block text-slate-300 font-medium mb-1">Admin Username</label>
                <input
                  type="text"
                  value={adminUser}
                  onChange={(e) => setAdminUser(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block text-slate-300 font-medium mb-1">Admin Email Address</label>
                <input
                  type="email"
                  value={adminEmail}
                  onChange={(e) => setAdminEmail(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-slate-300 font-medium">Admin Password</label>
                  <span className="text-[10px] text-sky-400 font-mono">Argon2id Hashed</span>
                </div>
                <input
                  type="password"
                  value={adminPass}
                  onChange={(e) => setAdminPass(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-white focus:outline-none focus:border-blue-500 font-mono"
                />
              </div>
            </div>

            <div className="p-3 bg-blue-950/40 border border-blue-900/50 rounded-xl text-xs text-blue-300 flex items-start gap-2.5">
              <ShieldCheck className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
              <div>
                <span className="font-semibold text-white">Security Hardening:</span> ApexCMS uses <code>Argon2id</code> with memory cost 65536, time cost 4, and 1 thread for resilient brute-force protection.
              </div>
            </div>

            <div className="pt-4 flex justify-between">
              <button
                onClick={() => setStep(2)}
                className="px-4 py-2 text-xs text-slate-400 hover:text-white"
              >
                &larr; Back
              </button>
              <button
                onClick={() => {
                  setStep(4);
                  runInstallation();
                }}
                className="flex items-center gap-2 px-5 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-emerald-500/20 transition"
              >
                Install ApexCMS Now
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* Step 4: Installation Runner */}
        {step === 4 && (
          <div className="space-y-5 animate-fade-in py-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-2xl flex items-center justify-center mx-auto mb-3 text-sky-400 animate-spin">
                <RefreshCw className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-white">Executing Database Migrations...</h2>
              <p className="text-xs text-slate-400 mt-1">
                Creating schema tables, seeding defaults, configuring password hashes, and generating install.lock
              </p>
            </div>

            <div className="bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-[11px] text-slate-300 max-h-52 overflow-y-auto space-y-1">
              {migrationLogs.map((log, i) => (
                <div key={i} className="flex items-center gap-2">
                  <span className="text-emerald-400">✓</span> {log}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 5: Completed & Locked */}
        {step === 5 && (
          <div className="text-center space-y-5 py-4 animate-fade-in">
            <div className="w-14 h-14 bg-emerald-500/10 border border-emerald-500/30 rounded-2xl flex items-center justify-center mx-auto text-emerald-400 shadow-xl shadow-emerald-500/10">
              <CheckCircle2 className="w-8 h-8" />
            </div>

            <div>
              <h2 className="text-xl font-bold text-white">Installation Completed & Secured!</h2>
              <p className="text-xs text-slate-400 max-w-md mx-auto mt-1">
                ApexCMS has initialized all database tables, configured the administrator account, generated production configuration, and created <code>install/install.lock</code>.
              </p>
            </div>

            <div className="p-3 bg-slate-950 border border-slate-800 rounded-xl text-xs text-slate-400 max-w-md mx-auto flex items-center justify-center gap-2">
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Installer self-locked against unauthorized re-execution.</span>
            </div>

            <div className="flex items-center justify-center gap-3 pt-4">
              <button
                onClick={onInstallationComplete}
                className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-xl text-xs font-bold shadow-lg shadow-blue-500/20 transition flex items-center gap-2"
              >
                Launch Admin Suite (/admin)
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
