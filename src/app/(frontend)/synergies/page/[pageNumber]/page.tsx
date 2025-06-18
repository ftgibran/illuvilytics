import configPromise from '@payload-config'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import React from 'react'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { SynergiesList } from '@/components/Synergies/SynergiesList'
import { Synergy } from '@/payload-types'

import PageClient from '../../page.client'

export const dynamic = 'force-static'
export const revalidate = 600

type Args = {
  params: Promise<{
    pageNumber: string
  }>
}

export default async function Page({ params: paramsPromise }: Args) {
  const { pageNumber } = await paramsPromise
  const pageNum = Number(pageNumber)

  if (!pageNum) {
    return notFound()
  }

  const payload = await getPayload({ config: configPromise })

  const synergies = await payload.find({
    collection: 'synergies',
    depth: 1,
    limit: 12,
    page: pageNum,
    overrideAccess: false,
    pagination: true,
    select: {
      name: true,
      description: true,
      tier: true,
      type: true,
      requiredUnits: true,
      effects: true,
    },
  })

  if (!synergies.docs.length) {
    return notFound()
  }

  return (
    <div className={'pt-24 pb-24'}>
      <PageClient />

      <div className={'container mb-16'}>
        <div className={'prose dark:prose-invert max-w-none'}>
          <h1>Synergies</h1>
        </div>
      </div>

      <div className={'container mb-8'}>
        <PageRange
          collection={'synergies'}
          currentPage={synergies.page}
          limit={12}
          totalDocs={synergies.totalDocs}
        />
      </div>

      <SynergiesList synergies={synergies.docs as Synergy[]} />

      <div className={'container'}>
        {synergies.totalPages > 1 && synergies.page && (
          <Pagination
            collection={'synergies'}
            page={synergies.page}
            totalPages={synergies.totalPages}
          />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Illuvilytics - Synergies`,
  }
}
