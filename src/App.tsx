import { useState } from 'react'
import { DotHalftone, type DotHalftoneProps } from './DotHalftone'
import './App.css'

type Sample = {
  label: string
  src: string
  gradient?: DotHalftoneProps['gradient']
}

const SAMPLES: Sample[] = [
  { label: 'Rocket', src: '/samples/startups.png' },
  { label: 'City', src: '/samples/enterprise.png' },
  { label: 'Servers', src: '/samples/platform.png' },
  { label: 'Robot', src: '/samples/ai-native.png' },
  { label: 'Adventure Time', src: '/samples/adventure-time.jpeg' },
]

export default function App() {
  const [active, setActive] = useState(0)
  const [urlInput, setUrlInput] = useState('')
  const [customSrc, setCustomSrc] = useState('')
  const [cellSize, setCellSize] = useState(5)
  const sample = SAMPLES[active]

  const activeSrc = customSrc || sample.src
  const activeGradient = !customSrc ? sample.gradient : undefined

  const handleUrlSubmit = () => {
    if (urlInput.trim()) {
      setCustomSrc(urlInput.trim())
    }
  }

  return (
    <main className="page">
      <header className="intro">
        <h1>Halftone Dots</h1>
        <p>
          Any image, recreated as an animated dot halftone on a single canvas.
          Pick one and watch the dots implode and explode into the next.
        </p>
      </header>

      <div className="url-input-row">
        <input
          type="text"
          placeholder="Paste any image URL..."
          value={urlInput}
          onChange={(e) => setUrlInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleUrlSubmit()}
          className="url-input"
        />
        <button className="url-btn" onClick={handleUrlSubmit}>
          Try it
        </button>
        {customSrc && (
          <button className="reset-btn" onClick={() => { setCustomSrc(''); setUrlInput('') }}>
            ✕
          </button>
        )}
      </div>

      <div className="slider-row">
        <label>Dots: {cellSize}px</label>
        <input
          type="range"
          min="2"
          max="16"
          step="1"
          value={cellSize}
          onChange={(e) => setCellSize(Number(e.target.value))}
        />
        <span className="slider-hint">{cellSize <= 3 ? 'Fine' : cellSize <= 7 ? 'Normal' : 'Coarse'}</span>
      </div>

      <DotHalftone
        className="stage"
        src={activeSrc}
        gradient={activeGradient}
        cellSize={cellSize}
      />

      <div className="switcher" role="tablist" aria-label="Sample images">
        {SAMPLES.map((s, i) => (
          <button
            key={s.label}
            role="tab"
            aria-selected={i === active}
            className={i === active && !customSrc ? 'is-active' : ''}
            onClick={() => { setActive(i); setCustomSrc(''); setUrlInput('') }}
          >
            {s.label}
          </button>
        ))}
      </div>
    </main>
  )
}