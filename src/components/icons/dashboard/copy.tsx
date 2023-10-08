import React from 'react'

const CopyIcon = ({ color, height, width }: { width: number; height: number; color?: string }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={height} height={width} viewBox='0 0 512 512'>
      <rect
        width='336'
        height='336'
        x='128'
        y='128'
        fill='none'
        stroke={color || 'currentColor'}
        stroke-linejoin='round'
        stroke-width='32'
        rx='57'
        ry='57'
      />
      <path
        fill='none'
        stroke={color || 'currentColor'}
        stroke-linecap='round'
        stroke-linejoin='round'
        stroke-width='32'
        d='m383.5 128l.5-24a56.16 56.16 0 0 0-56-56H112a64.19 64.19 0 0 0-64 64v216a56.16 56.16 0 0 0 56 56h24'
      />
    </svg>
  )
}

export default CopyIcon
