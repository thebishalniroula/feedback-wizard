import { Link, Navbar } from '@nextui-org/react'
import React from 'react'
import { GithubIcon } from '../icons/navbar/github-icon'
import { Box } from '../styles/box'
import { BurguerButton } from './burguer-button'
import { UserButton } from '@clerk/clerk-react'

interface Props {
  children: React.ReactNode
}

export const NavbarWrapper = ({ children }: Props) => {
  return (
    <Box
      css={{
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        flex: '1 1 auto',
        overflowY: 'auto',
        overflowX: 'hidden',
      }}
    >
      <Navbar
        isBordered
        css={{
          borderBottom: '1px solid $border',
          justifyContent: 'space-between',
          width: '100%',
          '@md': {
            justifyContent: 'space-between',
          },

          '& .nextui-navbar-container': {
            border: 'none',
            maxWidth: '100%',

            gap: '$6',
            '@md': {
              justifyContent: 'space-between',
            },
          },
        }}
      >
        <Navbar.Content showIn='md'>
          <BurguerButton />
        </Navbar.Content>
        <Navbar.Content
          hideIn={'md'}
          css={{
            width: '100%',
          }}
        ></Navbar.Content>
        <Navbar.Content>
          <Navbar.Content>
            <Link href='https://github.com/thebishalniroula/feedback-wizard' target={'_blank'}>
              <GithubIcon />
            </Link>
          </Navbar.Content>
          <Navbar.Content>
            <UserButton />
          </Navbar.Content>
        </Navbar.Content>
      </Navbar>
      {children}
    </Box>
  )
}
