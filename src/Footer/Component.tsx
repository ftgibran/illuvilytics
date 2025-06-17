import Link from 'next/link'
import React from 'react'

import { CMSLink } from '@/components/Link'
import { Logo } from '@/components/Logo/Logo'
import type { Footer as IFooter } from '@/payload-types'
import { getCachedGlobal } from '@/utilities/getGlobals'

export async function Footer() {
  const footerData: IFooter = await getCachedGlobal('footer', 1)()

  const navItems = footerData?.navItems || []

  return (
    <footer className={'mt-auto bg-black dark:bg-background text-white'}>
      <div
        className={
          'container py-8 gap-8 flex flex-col md:flex-row md:justify-between'
        }
      >
        <Link className={'flex items-center'} href={'/'}>
          <Logo isMonochromatic={true} />
        </Link>

        <div
          className={
            'flex flex-col-reverse items-start md:flex-row gap-4 md:items-center'
          }
        >
          <nav className={'flex flex-col md:flex-row gap-4'}>
            {navItems.map(({ link }, i) => {
              return <CMSLink className={'text-white'} key={i} {...link} />
            })}
          </nav>
        </div>
      </div>
    </footer>
  )
}
