import React from 'react'
import { Shield, AlertTriangle } from 'lucide-react'
import { CharacterAvatar } from './CharacterAvatar'

export function ScamAlertBlock({ title = 'Momento É Golpe!', text, className = '' }) {
  return (
    <div className={`ludic-box scam ${className}`.trim()} role="alert" aria-live="polite">
      <div className="ludic-header">
        <div className="ludic-icon">
          <CharacterAvatar type="radar" size={36} />
          <div className="ludic-status-badge">
            <AlertTriangle size={12} aria-hidden="true" focusable="false" />
          </div>
        </div>
        <h4 className="ludic-title" style={{ margin: 0, fontSize: '1.05rem' }}>{title}</h4>
      </div>
      <div className="ludic-body">
        <p style={{ margin: 0 }}>{text}</p>
      </div>
    </div>
  )
}

export function SpecialistWordBlock({ title = 'Palavra do Especialista', text, className = '' }) {
  return (
    <div className={`ludic-box expert ${className}`.trim()}>
      <div className="ludic-header">
        <div className="ludic-icon">
          <CharacterAvatar type="siga" size={36} />
          <div className="ludic-status-badge">
            <Shield size={12} aria-hidden="true" focusable="false" />
          </div>
        </div>
        <h4 className="ludic-title" style={{ margin: 0, fontSize: '1.05rem' }}>{title}</h4>
      </div>
      <div className="ludic-body">
        <p style={{ margin: 0 }}>{text}</p>
      </div>
    </div>
  )
}

export function LudicTransition({ title, description, children }) {
  return (
    <div className="ludic-transition-block" style={{ padding: '24px', textAlign: 'center', background: 'var(--bg-app)', borderRadius: 'var(--border-radius-lg)', margin: '24px 0', border: '1px dashed var(--border-color)' }}>
      {title && <h3 style={{ margin: '0 0 8px 0', fontSize: '1.1rem', color: 'var(--text-title)' }}>{title}</h3>}
      {description && <p className="muted-body" style={{ margin: 0 }}>{description}</p>}
      {children && <div style={{ marginTop: '16px' }}>{children}</div>}
    </div>
  )
}
