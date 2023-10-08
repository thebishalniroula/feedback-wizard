import React from 'react'

const CreateFormIcon = ({ height, width, color }: { height: number; width: number; color?: string }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={height} height={width} viewBox='0 0 48 48'>
      <path
        fill={color || 'currentColor'}
        d='M16.5 23.5a2 2 0 1 0 0-4a2 2 0 0 0 0 4Zm2 9a2 2 0 1 1-4 0a2 2 0 0 1 4 0ZM6 12.25A6.25 6.25 0 0 1 12.25 6h23.5A6.25 6.25 0 0 1 42 12.25v11.794a12.925 12.925 0 0 0-6.033-2.009A1.25 1.25 0 0 0 34.75 20.5h-10.5a1.25 1.25 0 1 0 0 2.5h5.741C25.298 24.961 22 29.596 22 35c0 2.577.75 4.98 2.044 7H12.25A6.25 6.25 0 0 1 6 35.75v-23.5Zm15 9.25a4.5 4.5 0 1 0-9 0a4.5 4.5 0 0 0 9 0ZM16.5 37a4.5 4.5 0 1 0 0-9a4.5 4.5 0 0 0 0 9Zm-3.25-26a1.25 1.25 0 1 0 0 2.5h21.5a1.25 1.25 0 1 0 0-2.5h-21.5ZM46 35c0 6.075-4.925 11-11 11s-11-4.925-11-11s4.925-11 11-11s11 4.925 11 11Zm-10-7a1 1 0 1 0-2 0v6h-6a1 1 0 1 0 0 2h6v6a1 1 0 1 0 2 0v-6h6a1 1 0 1 0 0-2h-6v-6Z'
      />
    </svg>
  )
}

export default CreateFormIcon
