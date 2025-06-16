import configPromise from '@payload-config'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import React from 'react'

import { CombatUnitsList } from '@/components/CombatUnits/CombatUnitsList'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { CombatUnit } from '@/payload-types'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const combatUnits = await payload.find({
    collection: 'combat-units',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    pagination: true,
    select: {
      name: true,
      stage: true,
      class: true,
      element: true,
      data: true,
    },
  })

  return (
    <div className={'pt-24 pb-24'}>
      <PageClient />

      <div className={'container mb-16'}>
        <div className={'prose dark:prose-invert max-w-none'}>
          <h1>Combat Units</h1>
        </div>
      </div>

      <div className={'container mb-8'}>
        <PageRange
          collection={'combat-units'}
          currentPage={combatUnits.page}
          limit={12}
          totalDocs={combatUnits.totalDocs}
        />
      </div>

      <CombatUnitsList units={combatUnits.docs as CombatUnit[]} />

      <div className={'container'}>
        {combatUnits.totalPages > 1 && combatUnits.page && (
          <Pagination
            collection={'combat-units'}
            page={combatUnits.page}
            totalPages={combatUnits.totalPages}
          />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Illuvilytics - Combat Units`,
  }
}
