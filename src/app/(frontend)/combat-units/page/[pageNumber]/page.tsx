import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import React from 'react'

import { CombatUnitsList } from '@/components/CombatUnits/CombatUnitsList'
import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { CombatUnit } from '@/payload-types'

import PageClient from './page.client'

export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const payload = await getPayload({ config: configPromise })

  const sanitizedPageNumber = Number(pageNumber)

  if (!Number.isInteger(sanitizedPageNumber)) notFound()

  const combatUnits = await payload.find({
    collection: 'combat-units',
    depth: 1,
    limit: 12,
    page: sanitizedPageNumber,
    overrideAccess: false,
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
        {combatUnits?.page && combatUnits?.totalPages > 1 && (
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

export async function generateMetadata({
  params: paramsPromise,
}: Args): Promise<Metadata> {
  const { pageNumber } = await paramsPromise

  return {
    title: `Illuvilytics - Combat Units Page ${pageNumber || ''}`,
  }
}

export async function generateStaticParams() {
  const payload = await getPayload({ config: configPromise })
  const { totalDocs } = await payload.count({
    collection: 'combat-units',
    overrideAccess: false,
  })

  const totalPages = Math.ceil(totalDocs / 12)

  const pages: { pageNumber: string }[] = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push({ pageNumber: String(i) })
  }

  return pages
}
