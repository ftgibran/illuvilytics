import configPromise from '@payload-config'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import React from 'react'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { WeaponsList } from '@/components/Weapons/WeaponsList'
import { Weapon } from '@/payload-types'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const weapons = await payload.find({
    collection: 'weapons',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    pagination: true,
    select: {
      name: true,
      tier: true,
      class: true,
      element: true,
      type: true,
      displayDescription: true,
    },
  })

  return (
    <div className={'pt-24 pb-24'}>
      <PageClient />

      <div className={'container mb-16'}>
        <div className={'prose dark:prose-invert max-w-none'}>
          <h1>Weapons</h1>
        </div>
      </div>

      <div className={'container mb-8'}>
        <PageRange
          collection={'weapons'}
          currentPage={weapons.page}
          limit={12}
          totalDocs={weapons.totalDocs}
        />
      </div>

      <WeaponsList weapons={weapons.docs as Weapon[]} />

      <div className={'container'}>
        {weapons.totalPages > 1 && weapons.page && (
          <Pagination
            collection={'weapons'}
            page={weapons.page}
            totalPages={weapons.totalPages}
          />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Illuvilytics - Weapons`,
  }
}
