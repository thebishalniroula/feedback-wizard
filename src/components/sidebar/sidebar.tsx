import React, { useState } from 'react'
import { Box } from '../styles/box'
import { Sidebar } from './sidebar.styles'
import { Flex } from '../styles/flex'
import { Logo } from './Logo'
import { HomeIcon } from '../icons/sidebar/home-icon'
import { AccountsIcon } from '../icons/sidebar/accounts-icon'
import { useSidebarContext } from '../layout/layout-context'
import { useRouter } from 'next/router'
import Link from 'next/link'

type SidebarItemProps = {
  title: string
  icon: React.JSX.Element
  href: string
  isActive: boolean
}

const SidebarItem = ({ title, href, icon, isActive }: SidebarItemProps) => {
  return (
    <Link
      href={href}
      className={`flex gap-3 text-slate-200 p-3 ${isActive ? 'bg-slate-300 text-slate-900 font-semibold' : ''}`}
    >
      {icon}
      {title}
    </Link>
  )
}

export const SidebarWrapper = () => {
  const router = useRouter()
  const { collapsed, setCollapsed } = useSidebarContext()

  return (
    <Box
      as='aside'
      css={{
        height: '100vh',
        zIndex: 202,
        position: 'sticky',
        top: '0',
      }}
    >
      {collapsed ? <Sidebar.Overlay onClick={setCollapsed} /> : null}

      <Sidebar collapsed={collapsed}>
        <Sidebar.Header>
          <Logo />
        </Sidebar.Header>
        <Flex direction={'column'} justify={'between'} css={{ height: '100%' }}>
          <Sidebar.Body className='body sidebar' style={{ gap: '0.25rem' }}>
            <SidebarItem
              title='Dashboard'
              icon={<HomeIcon />}
              isActive={router.pathname === '/dashboard'}
              href='/dashboard'
            />
            <SidebarItem
              isActive={router.pathname.startsWith('/dashboard/form')}
              title='Forms'
              icon={<AccountsIcon />}
              href='/dashboard/form'
            />
          </Sidebar.Body>
        </Flex>
      </Sidebar>
    </Box>
  )
}
