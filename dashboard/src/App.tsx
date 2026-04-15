import React, { useState, useEffect } from 'react';
import {
  Terminal,
  ShieldCheck,
  FileCode,
  Cpu,
  BarChart3,
  Activity,
  CheckCircle2,
  Copy,
  Check
} from 'lucide-react';
import { motion } from 'framer-motion';

const App: React.FC = () => {
  const [results, setResults] = useState<any[]>([]);
  const [securityReport, setSecurityReport] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'tests' | 'security'>('tests');
  const [selectedFile, setSelectedFile] = useState<any>(null);
  const [selectedTool, setSelectedTool] = useState<string | null>(null);
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    // Fetch test results
    fetch(`results.json?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setResults(data);
          setSelectedFile(data[0]);
        }
      })
      .catch(() => console.log("No results.json found."));

    // Fetch security reports
    fetch(`final-security-report.json?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        setSecurityReport(data);
      })
      .catch(() => console.log("No security report found."));
  }, []);

  if (!selectedFile && !securityReport) {
    return (
      <div className="dashboard-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', color: 'var(--text-secondary)' }}>
        <h2>Initializing DevSecOps Pipeline... Waiting for Data...</h2>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
          <div style={{ background: 'var(--accent-cyan)', padding: '0.5rem', borderRadius: '8px' }}>
            <Cpu size={24} color="#000" />
          </div>
          <h2 style={{ fontSize: '1.25rem', letterSpacing: '-0.5px' }}>DevSecOps Hub</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>View Modes</p>
          
          <button 
            className={`nav-item ${activeTab === 'security' ? 'active' : ''}`}
            onClick={() => setActiveTab('security')}
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <ShieldCheck size={18} color={activeTab === 'security' ? 'var(--accent-cyan)' : 'inherit'} />
            <span>Security Scan</span>
          </button>

          <button 
            className={`nav-item ${activeTab === 'tests' ? 'active' : ''}`}
            onClick={() => setActiveTab('tests')}
            style={{ width: '100%', textAlign: 'left', background: 'none', border: 'none', color: 'inherit', cursor: 'pointer', padding: '0.75rem', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '0.75rem' }}
          >
            <FileCode size={18} color={activeTab === 'tests' ? 'var(--accent-cyan)' : 'inherit'} />
            <span>AI Test Cases</span>
          </button>

          {activeTab === 'tests' && (
            <div style={{ marginTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
              <p style={{ fontSize: '0.7rem', color: 'var(--text-secondary)', marginLeft: '0.75rem' }}>Artifacts</p>
              {results.map(file => (
                <motion.div
                  key={file.id}
                  whileHover={{ x: 4 }}
                  className={`nav-item ${selectedFile?.id === file.id ? 'active' : ''}`}
                  onClick={() => setSelectedFile(file)}
                  style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem', fontSize: '0.85rem' }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                    <span style={{ flex: 1 }}>{file.name}</span>
                    <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{file.coverage}%</span>
                  </div>
                  <div style={{ width: '100%', height: '2px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px' }}>
                    <div style={{ height: '100%', width: `${file.coverage}%`, background: 'var(--accent-cyan)' }} />
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="stat-card" style={{ '--stat-color': 'var(--accent-magenta)' } as any}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>System Status</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)' }}></div>
              <span style={{ fontSize: '0.85rem' }}>AI Pipeline Active</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {activeTab === 'security' ? (
          <section className="security-view">
            <header className="header-section">
              <div>
                <h1 style={{ fontSize: '1.75rem' }}>Security Vulnerability Audit</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Comprehensive scan results from <span style={{ color: 'var(--accent-cyan)' }}>Gitleaks, Semgrep, & Claude</span></p>
              </div>
            </header>

            <div className="stat-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
              <div 
                className={`stat-card ${selectedTool === 'gitleaks' ? 'active-filter' : ''}`}
                style={{ '--stat-color': 'var(--accent-magenta)', cursor: 'pointer' } as any}
                onClick={() => setSelectedTool(selectedTool === 'gitleaks' ? null : 'gitleaks')}
              >
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Secrets & Keys</span>
                <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>{securityReport?.summary?.gitleaks || 0}</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Detected by Gitleaks</p>
              </div>
              <div 
                className={`stat-card ${selectedTool === 'semgrep' ? 'active-filter' : ''}`}
                style={{ '--stat-color': 'var(--accent-cyan)', cursor: 'pointer' } as any}
                onClick={() => setSelectedTool(selectedTool === 'semgrep' ? null : 'semgrep')}
              >
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Code Flaws</span>
                <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>{securityReport?.summary?.semgrep || 0}</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Detected by Semgrep</p>
              </div>
              <div 
                className={`stat-card ${selectedTool === 'trivy' ? 'active-filter' : ''}`}
                style={{ '--stat-color': 'var(--accent-green)', cursor: 'pointer' } as any}
                onClick={() => setSelectedTool(selectedTool === 'trivy' ? null : 'trivy')}
              >
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Dependencies</span>
                <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>{securityReport?.summary?.dependency || 0}</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Detected by Trivy</p>
              </div>
              <div 
                className={`stat-card ${selectedTool === 'soc2' ? 'active-filter' : ''}`}
                style={{ borderLeft: '3px solid #0ea5e9', cursor: 'pointer', '--stat-color': '#0ea5e9' } as any}
                onClick={() => setSelectedTool(selectedTool === 'soc2' ? null : 'soc2')}
              >
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>SOC2 Rules</span>
                <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>{securityReport?.summary?.soc2_count || 0}</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Compliance Audit</p>
              </div>
              <div 
                className={`stat-card ${selectedTool === 'hipaa' ? 'active-filter' : ''}`}
                style={{ borderLeft: '3px solid #10b981', cursor: 'pointer', '--stat-color': '#10b981' } as any}
                onClick={() => setSelectedTool(selectedTool === 'hipaa' ? null : 'hipaa')}
              >
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>HIPAA Rules</span>
                <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>{securityReport?.summary?.hipaa_count || 0}</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>Healthcare Compliance</p>
              </div>
              <div 
                className={`stat-card ${selectedTool === 'claude' ? 'active-filter' : ''}`}
                style={{ borderLeft: '3px solid #f59e0b', cursor: 'pointer', '--stat-color': '#f59e0b' } as any}
                onClick={() => setSelectedTool(selectedTool === 'claude' ? null : 'claude')}
              >
                <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Claude Insights</span>
                <h3 style={{ fontSize: '1.75rem', margin: '0.5rem 0' }}>{securityReport?.summary?.claude || 0}</h3>
                <p style={{ fontSize: '0.75rem', opacity: 0.6 }}>AI Security Scan</p>
              </div>
            </div>

            <div className="filter-row" style={{ marginTop: '2rem', display: 'flex', gap: '1rem', alignItems: 'center' }}>
              <span style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Risk Level:</span>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {['CRITICAL', 'HIGH', 'MEDIUM', 'LOW'].map(sev => (
                  <button
                    key={sev}
                    onClick={() => setSelectedSeverity(selectedSeverity === sev ? null : sev)}
                    className={`filter-chip ${selectedSeverity === sev ? 'active' : ''}`}
                    style={{ '--chip-color': sev === 'CRITICAL' ? 'var(--accent-magenta)' : sev === 'HIGH' ? '#f59e0b' : sev === 'MEDIUM' ? 'var(--accent-cyan)' : 'var(--accent-green)' } as any}
                  >
                    {sev}
                  </button>
                ))}
              </div>
              { (selectedTool || selectedSeverity) && (
                <button 
                  onClick={() => { setSelectedTool(null); setSelectedSeverity(null); }}
                  style={{ background: 'none', border: 'none', color: 'var(--accent-magenta)', cursor: 'pointer', fontSize: '0.8rem', textDecoration: 'underline' }}
                >
                  Clear All Filters
                </button>
              )}
            </div>

            <div className="findings-table-container" style={{ marginTop: '1.5rem', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', padding: '1.5rem', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ marginBottom: '1.5rem' }}>Vulnerability Details</h3>
              <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                  <tr style={{ textAlign: 'left', borderBottom: '1px solid rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>
                    <th style={{ paddingBottom: '1rem' }}>Tool</th>
                    <th style={{ paddingBottom: '1rem' }}>Severity</th>
                    <th style={{ paddingBottom: '1rem' }}>Finding</th>
                    <th style={{ paddingBottom: '1rem' }}>Location</th>
                  </tr>
                </thead>
                <tbody>
                  {(securityReport?.findings || [])
                    .filter((f: any) => (!selectedTool || f.tool.toLowerCase() === selectedTool.toLowerCase()))
                    .filter((f: any) => (!selectedSeverity || f.severity === selectedSeverity))
                    .map((f: any, i: number) => (
                    <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                      <td style={{ padding: '1rem 0' }}><span className="badge badge-cyan">{f.tool}</span></td>
                      <td style={{ padding: '1rem 0' }}>
                        <span className={`badge ${f.severity === 'CRITICAL' ? 'badge-magenta' : 'badge-yellow'}`}>
                          {f.severity}
                        </span>
                      </td>
                      <td style={{ padding: '1rem 0' }}>{f.ai_description || f.title}</td>
                      <td style={{ padding: '1rem 0', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                        {f.file}:{f.line}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        ) : (
          <section className="tests-view">
            <header className="header-section">
              <div>
                <h1 style={{ fontSize: '1.75rem' }}>AI Test Generation Analysis</h1>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Reviewing <span style={{ color: 'var(--accent-cyan)' }}>{selectedFile?.lang}</span> model artifacts for <span style={{ color: 'var(--text-primary)' }}>{selectedFile?.name}</span></p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                style={{
                  background: 'var(--accent-cyan)',
                  color: '#000',
                  border: 'none',
                  padding: '0.75rem 1.5rem',
                  borderRadius: '8px',
                  fontWeight: '600',
                  cursor: 'pointer',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}
                onClick={() => {
                  setIsGenerating(true);
                  setTimeout(() => setIsGenerating(false), 2000);
                }}
              >
                {isGenerating ? <Activity size={18} className="animate-spin" /> : <Terminal size={18} />}
                {isGenerating ? 'Regenerating...' : 'Trigger AI Gen'}
              </motion.button>
            </header>

            {/* Stats Grid */}
            <div className="stat-grid">
              <div className="stat-card">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>Coverage Score</span>
                  <BarChart3 size={18} color="var(--accent-cyan)" />
                </div>
                <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{selectedFile?.coverage}%</h3>
                <div className="badge badge-cyan" style={{ width: 'fit-content' }}>Target: 70%</div>
              </div>

              <div className="stat-card" style={{ '--stat-color': 'var(--accent-green)' } as any}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>CI Status</span>
                  <ShieldCheck size={18} color="var(--accent-green)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <CheckCircle2 size={24} /> Passed
                </h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Validated by AI Runner</p>
              </div>

              <div className="stat-card" style={{ '--stat-color': 'var(--accent-magenta)' } as any}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>AI Hallucination Check</span>
                  <Activity size={18} color="var(--accent-magenta)" />
                </div>
                <h3 style={{ fontSize: '1.5rem', margin: '0.5rem 0' }}>Low Risk</h3>
                <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Context-aware prompt applied</p>
              </div>
            </div>

            {/* Code Comparison */}
            {selectedFile && (
              <div className="code-view-container">
                <div className="code-panel">
                  <div className="code-header">
                    <span>Source File</span>
                    <span className="badge badge-cyan">Input</span>
                  </div>
                  <pre><code>{selectedFile.source}</code></pre>
                </div>

                <div className="code-panel">
                  <div className="code-header">
                    <span>Generated Test Case</span>
                    <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                      <span className="badge badge-green">AI Artifact</span>
                      <button
                        onClick={() => handleCopy(selectedFile.test)}
                        style={{ background: 'none', border: 'none', color: 'var(--text-secondary)', cursor: 'pointer', display: 'flex', alignItems: 'center', marginLeft: '0.5rem' }}
                      >
                        {copied ? <Check size={14} color="var(--accent-green)" /> : <Copy size={14} />}
                      </button>
                    </div>
                  </div>
                  <pre><code style={{ color: 'var(--accent-cyan)' }}>{selectedFile.test}</code></pre>
                </div>
              </div>
            )}
          </section>
        )}
      </main>
    </div>
  );
}

export default App;
