'use client'

import { SearchIcon } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import type { Header as HeaderType } from '@/payload-types'

export const HeaderNav: React.FC<{ data: HeaderType }> = ({ data }) => {
  const navItems = data?.navItems || []

  return (
    <nav className={'flex gap-3 items-center'}>
      {navItems.map(({ link }, i) => {
        return (
          <CMSLink
            key={i}
            {...link}
            appearance={'link'}
            className={'text-lilac'}
          />
        )
      })}
      <Link href={'/search'} className={'color-lilac'}>
        <span className={'sr-only'}>Search</span>
        <SearchIcon className={'w-5 text-lilac'} />
      </Link>
    </nav>
  )
}
