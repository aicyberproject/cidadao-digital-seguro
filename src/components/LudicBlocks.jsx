import React from 'react'
import { Shield, AlertTriangle } from 'lucide-react'
import { CharacterAvatar } from './CharacterAvatar'

export function ScamAlertBlock({ title = 'Momento É Golpe!', text, className = '' }) {
  return (
    <div className={`ludic-box scam ${className}`.trim()} role="note">
      <div className="ludic-header">
        <div className="ludic-icon" aria-hidden="true">
          <CharacterAvatar type="radar" size={36} />
          <div className="ludic-status-badge">
            <AlertTriangle size={12} focusable="false" />
          </div>
        </div>
        <h4 className="ludic-title">{title}</h4>
      </div>
      <div className="ludic-body">
        <p>{text}</p>
      </div>
    </div>
  )
}

export function SpecialistWordBlock({ title = 'Palavra do Especialista', text, className = '' }) {
  return (
    <div className={`ludic-box expert ${className}`.trim()}>
      <div className="ludic-header">
        <div className="ludic-icon" aria-hidden="true">
          <CharacterAvatar type="siga" size={36} />
          <div className="ludic-status-badge">
            <Shield size={12} focusable="false" />
          </div>
        </div>
        <h4 className="ludic-title">{title}</h4>
      </div>
      <div className="ludic-body">
        <p>{text}</p>
      </div>
    </div>
  )
}

export function LudicTransition({ title, description, children }) {
  return (
    <div className="ludic-transition-block micro-entry-transition">
      {title && <h3>{title}</h3>}
      {description && <p className="muted-body">{description}</p>}
      {children && <div className="ludic-transition-content">{children}</div>}
    </div>
  )
}
