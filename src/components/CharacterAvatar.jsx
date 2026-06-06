import React from 'react'

/**
 * CharacterAvatar Component
 * Renders SVG avatars for Radar and Siga characters.
 */
export const CharacterAvatar = ({ type, size = 32, className = '' }) => {
  if (type === 'radar') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Radar - Detector de Riscos"
      >
        <rect x="15" y="25" width="70" height="60" rx="20" fill="currentColor" />
        <rect x="25" y="40" width="50" height="25" rx="10" fill="white" fillOpacity="0.3" />
        <circle cx="50" cy="52.5" r="8" fill="white" />
        <path d="M50 15V25" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
        <circle cx="50" cy="12" r="5" fill="currentColor" />
        <path d="M35 75H65" stroke="white" strokeWidth="4" strokeLinecap="round" opacity="0.5" />
      </svg>
    )
  }

  if (type === 'siga') {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 100 100"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role="img"
        aria-label="Siga - Guia Orientadora"
      >
        <circle cx="50" cy="35" r="22" fill="currentColor" />
        <path
          d="M15 85C15 65 30 60 50 60C70 60 85 65 85 85V90H15V85Z"
          fill="currentColor"
        />
        <circle cx="42" cy="35" r="3" fill="white" />
        <circle cx="58" cy="35" r="3" fill="white" />
        <path
          d="M40 45C45 48 55 48 60 45"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
        />
        <path
          d="M50 65V80"
          stroke="white"
          strokeWidth="4"
          strokeLinecap="round"
          opacity="0.3"
        />
      </svg>
    )
  }

  return null
}
