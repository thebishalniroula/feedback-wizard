import { Text } from '@nextui-org/react'
import React from 'react'
import { Box } from '../styles/box'

export const Logo = () => {
  return (
    <Box>
      <Text
        h3
        size={'$lg'}
        weight={'medium'}
        css={{
          m: 0,
          color: '$accents9',
          lineHeight: '$lg',
          mb: '-$5',
          textTransform: 'uppercase',
          border: '1px solid white',
          p: '0.2rem 0.5rem',
          marginBottom: '0.05rem',
        }}
      >
        {'Feedback Wizard'}
      </Text>
      <Text span weight={'medium'} size={'$xs'} css={{ color: '$accents8' }}>
        {'By Bishal'}
      </Text>
    </Box>
  )
}
