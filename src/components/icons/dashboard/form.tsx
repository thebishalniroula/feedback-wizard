import React from 'react'

const FormIcon = ({ height, width, color }: { height: number; width: number; color?: string }) => {
  return (
    <svg xmlns='http://www.w3.org/2000/svg' width={height} height={width} viewBox='0 0 24 24'>
      <path
        fill={color || 'currentColor'}
        d='M8.25 10a.75.75 0 1 0 0 1.5a.75.75 0 0 0 0-1.5Zm-.75 6.25a.75.75 0 1 1 1.5 0a.75.75 0 0 1-1.5 0ZM3 6.25A3.25 3.25 0 0 1 6.25 3h11.5A3.25 3.25 0 0 1 21 6.25v11.5A3.25 3.25 0 0 1 17.75 21H6.25A3.25 3.25 0 0 1 3 17.75V6.25Zm3 4.5a2.25 2.25 0 1 0 4.5 0a2.25 2.25 0 0 0-4.5 0ZM8.25 14a2.25 2.25 0 1 0 0 4.5a2.25 2.25 0 0 0 0-4.5ZM12 10.75c0 .414.336.75.75.75h4.5a.75.75 0 0 0 0-1.5h-4.5a.75.75 0 0 0-.75.75Zm.75 4.75a.75.75 0 0 0 0 1.5h4.5a.75.75 0 0 0 0-1.5h-4.5ZM6 6.25c0 .414.336.75.75.75h10.5a.75.75 0 0 0 0-1.5H6.75a.75.75 0 0 0-.75.75Z'
      />
    </svg>
  )
}

export default FormIcon
