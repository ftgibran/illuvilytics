'use client'

import { useState } from 'react'

import { Suit } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { SuitFilters } from './SuitFilters'

interface SuitsListProps {
  suits: Suit[]
}

export function SuitsList({ suits }: SuitsListProps) {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedTier, setSelectedTier] = useState<string>('all')

  const filteredSuits = suits.filter((suit) => {
    const typeMatch = selectedType === 'all' || suit.type === selectedType
    const tierMatch =
      selectedTier === 'all' || suit.tier.toString() === selectedTier

    return typeMatch && tierMatch
  })

  return (
    <div className={cn('container')}>
      <SuitFilters
        selectedType={selectedType}
        selectedTier={selectedTier}
        onTypeChange={setSelectedType}
        onTierChange={setSelectedTier}
      />

      <div
        className={
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6'
        }
      >
        {filteredSuits.map((suit) => (
          <div
            key={suit.id}
            className={'bg-card p-4 rounded-lg border border-border'}
          >
            <div className={'flex items-center justify-between mb-2'}>
              <h3 className={'text-lg font-semibold'}>{suit.name}</h3>
              <div className={'text-sm'}>Tier {suit.tier}</div>
            </div>
            <div className={'mb-2'}>
              <div className={'text-sm'}>
                <span className={'font-medium'}>Type:</span> {suit.type}
              </div>
              <div className={'text-sm'}>
                <span className={'font-medium'}>Variation:</span>{' '}
                {suit.variation}
              </div>
            </div>
            <div className={'mt-2'}>
              <div className={'text-sm text-muted-foreground'}>
                {suit.displayDescription || 'No description available'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
