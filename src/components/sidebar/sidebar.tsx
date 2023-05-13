import React, { useState } from 'react'
import { Box } from '../styles/box'
import { Sidebar } from './sidebar.styles'
import { Avatar, Tooltip } from '@nextui-org/react'
import { Flex } from '../styles/flex'
import { CompaniesDropdown } from './companies-dropdown'
import { HomeIcon } from '../icons/sidebar/home-icon'
import { PaymentsIcon } from '../icons/sidebar/payments-icon'
import { BalanceIcon } from '../icons/sidebar/balance-icon'
import { AccountsIcon } from '../icons/sidebar/accounts-icon'
import { CustomersIcon } from '../icons/sidebar/customers-icon'
import { ProductsIcon } from '../icons/sidebar/products-icon'
import { ReportsIcon } from '../icons/sidebar/reports-icon'
import { DevIcon } from '../icons/sidebar/dev-icon'
import { ViewIcon } from '../icons/sidebar/view-icon'
import { SettingsIcon } from '../icons/sidebar/settings-icon'
// import { CollapseItems } from './collapse-items'
// import { SidebarItem } from './sidebar-item'
// import { SidebarMenu } from './sidebar-menu'
import { FilterIcon } from '../icons/sidebar/filter-icon'
import { useSidebarContext } from '../layout/layout-context'
import { ChangeLogIcon } from '../icons/sidebar/changelog-icon'
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
          <CompaniesDropdown />
        </Sidebar.Header>
        <Flex direction={'column'} justify={'between'} css={{ height: '100%' }}>
          <Sidebar.Body className='body sidebar' style={{ gap: '0.25rem' }}>
            <SidebarItem title='Home' icon={<HomeIcon />} isActive={router.pathname === '/'} href='/' />
            <SidebarItem
              isActive={router.pathname === '/accounts'}
              title='Forms'
              icon={<AccountsIcon />}
              href='/form'
            />
          </Sidebar.Body>
          <Sidebar.Footer>
            <Tooltip content={'Settings'} rounded color='primary'>
              <SettingsIcon />
            </Tooltip>
            <Tooltip content={'Adjustments'} rounded color='primary'>
              <FilterIcon />
            </Tooltip>
            <Tooltip content={'Profile'} rounded color='primary'>
              <Avatar src='https://i.pravatar.cc/150?u=a042581f4e29026704d' size={'sm'} />
            </Tooltip>
          </Sidebar.Footer>
        </Flex>
      </Sidebar>
    </Box>
  )
}
