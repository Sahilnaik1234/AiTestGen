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

// Mock Data for the demonstration
const MOCK_RESULTS = [
  {
    id: 'calculator',
    name: 'Calculator.ts',
    lang: 'TypeScript',
    coverage: 100,
    status: 'passed',
    source: `export class Calculator {
  add(a: number, b: number): number {
    return a + b;
  }
  subtract(a: number, b: number): number {
    return a - b;
  }
  multiply(a: number, b: number): number {
    return a * b;
  }
  divide(a: number, b: number): number {
    if (b === 0) throw new Error("Divide by zero");
    return a / b;
  }
}`,
    test: `import { Calculator } from './Calculator';

describe('Calculator', () => {
  const calc = new Calculator();
  
  test('adds numbers correctly', () => {
    expect(calc.add(2, 3)).toBe(5);
  });

  test('throws on divide by zero', () => {
    expect(() => calc.divide(10, 0)).toThrow();
  });
});`
  },
  {
    id: 'dateutils',
    name: 'dateUtils.js',
    lang: 'JavaScript',
    coverage: 92,
    status: 'passed',
    source: `function formatDate(date) {
    const d = new Date(date);
    let month = '' + (d.getMonth() + 1);
    let day = '' + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = '0' + month;
    if (day.length < 2) day = '0' + day;

    return [year, month, day].join('-');
}`,
    test: `const { formatDate } = require('./dateUtils');

describe('formatDate', () => {
  it('should format valid dates correctly', () => {
    expect(formatDate('2023-05-15')).toBe('2023-05-15');
  });

  it('should handle single digit days/months', () => {
    expect(formatDate('2023-1-1')).toBe('2023-01-01');
  });
});`
  },
  {
    id: 'mathutils',
    name: 'math_utils.go',
    lang: 'Go',
    coverage: 85,
    status: 'passed',
    source: `package main

func Add(a, b int) int {
	return a + b
}

func Divide(a, b int) (int, error) {
	if b == 0 {
		return 0, errors.New("cannot divide by zero")
	}
	return a / b, nil
}`,
    test: `package main
import "testing"

func TestAdd(t *testing.T) {
	result := Add(10, 5)
	if result != 15 {
		t.Errorf("Expected 15, got %d", result)
	}
}

func TestDivideByZero(t *testing.T) {
	_, err := Divide(10, 0)
	if err == nil {
		t.Error("Expected error, got nil")
	}
}`
  }
];

const App: React.FC = () => {
  const [results, setResults] = useState(MOCK_RESULTS);
  const [selectedFile, setSelectedFile] = useState(MOCK_RESULTS[0]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  useEffect(() => {
    fetch(`results.json?t=${Date.now()}`)
      .then(res => res.json())
      .then(data => {
        if (data && data.length > 0) {
          setResults(data);
          setSelectedFile(data[0]);
        }
      })
      .catch(err => console.error("Error loading live results, falling back to mock:", err));
  }, []);

  return (
    <div className="dashboard-container">
      {/* Sidebar */}
      <aside className="sidebar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <div style={{ background: 'var(--accent-cyan)', padding: '0.5rem', borderRadius: '8px' }}>
            <Cpu size={24} color="#000" />
          </div>
          <h2 style={{ fontSize: '1.25rem', letterSpacing: '-0.5px' }}>AI Testing Hub</h2>
        </div>

        <nav style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
          <p style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Pipeline Artifacts</p>
          {results.map(file => (
            <motion.div
              key={file.id}
              whileHover={{ x: 4 }}
              className={`nav-item ${selectedFile.id === file.id ? 'active' : ''}`}
              onClick={() => setSelectedFile(file)}
              style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '0.5rem', padding: '0.75rem' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', width: '100%' }}>
                <FileCode size={18} color={selectedFile.id === file.id ? 'var(--accent-cyan)' : 'inherit'} />
                <span style={{ flex: 1, fontSize: '0.9rem', fontWeight: selectedFile.id === file.id ? '600' : '400' }}>{file.name}</span>
                <span style={{ fontSize: '0.7rem', opacity: 0.6 }}>{file.coverage}%</span>
              </div>
              <div style={{ width: '100%', height: '3px', background: 'rgba(255,255,255,0.05)', borderRadius: '10px', overflow: 'hidden' }}>
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${file.coverage}%` }}
                  style={{
                    height: '100%',
                    background: file.coverage >= 70 ? 'var(--accent-green)' : 'var(--accent-magenta)',
                    boxShadow: `0 0 10px ${file.coverage >= 70 ? 'var(--accent-green)' : 'var(--accent-magenta)'}33`
                  }}
                />
              </div>
            </motion.div>
          ))}
        </nav>

        <div style={{ marginTop: 'auto' }}>
          <div className="stat-card" style={{ '--stat-color': 'var(--accent-magenta)' } as any}>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>System Status</span>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.25rem' }}>
              <div style={{ width: 8, height: 8, borderRadius: '50%', background: 'var(--accent-green)', boxShadow: '0 0 10px var(--accent-green)' }}></div>
              <span style={{ fontSize: '0.85rem' }}>Models Ready (Groq)</span>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="header-section">
          <div>
            <h1 style={{ fontSize: '1.75rem' }}>Test Generation Analysis</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>Reviewing <span style={{ color: 'var(--accent-cyan)' }}>{selectedFile.lang}</span> model artifacts for <span style={{ color: 'var(--text-primary)' }}>{selectedFile.name}</span></p>
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
            <h3 style={{ fontSize: '2rem', margin: '0.5rem 0' }}>{selectedFile.coverage}%</h3>
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
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>All 17 assertions validated</p>
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
        <div className="code-view-container">
          <div className="code-panel">
            <div className="code-header">
              <span>Source File ({selectedFile.lang})</span>
              <span className="badge badge-cyan">Input</span>
            </div>
            <pre><code>{selectedFile.source}</code></pre>
          </div>

          <div className="code-panel">
            <div className="code-header">
              <span>Generated Test Case</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span className="badge badge-green">AI Artifact</span>
                <span className="badge badge-cyan">{(selectedFile as any).model || 'Groq-Llama3'}</span>
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
      </main>
    </div>
  );
}

export default App;
