import configPromise from '@payload-config'
import type { Metadata } from 'next/types'
import { getPayload } from 'payload'
import React from 'react'

import { PageRange } from '@/components/PageRange'
import { Pagination } from '@/components/Pagination'
import { SuitsList } from '@/components/Suits/SuitsList'
import { Suit } from '@/payload-types'

import PageClient from './page.client'

export const dynamic = 'force-static'
export const revalidate = 600

export default async function Page() {
  const payload = await getPayload({ config: configPromise })

  const suits = await payload.find({
    collection: 'suits',
    depth: 1,
    limit: 12,
    overrideAccess: false,
    pagination: true,
    select: {
      name: true,
      tier: true,
      type: true,
      variation: true,
      displayDescription: true,
    },
  })

  return (
    <div className={'pt-24 pb-24'}>
      <PageClient />

      <div className={'container mb-16'}>
        <div className={'prose dark:prose-invert max-w-none'}>
          <h1>Suits</h1>
        </div>
      </div>

      <div className={'container mb-8'}>
        <PageRange
          collection={'suits'}
          currentPage={suits.page}
          limit={12}
          totalDocs={suits.totalDocs}
        />
      </div>

      <SuitsList suits={suits.docs as Suit[]} />

      <div className={'container'}>
        {suits.totalPages > 1 && suits.page && (
          <Pagination
            collection={'suits'}
            page={suits.page}
            totalPages={suits.totalPages}
          />
        )}
      </div>
    </div>
  )
}

export function generateMetadata(): Metadata {
  return {
    title: `Illuvilytics - Suits`,
  }
}
