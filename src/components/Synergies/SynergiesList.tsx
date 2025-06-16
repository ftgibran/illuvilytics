'use client'

import { useState } from 'react'

import { Synergy } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { SynergyFilters } from './SynergyFilters'

interface SynergiesListProps {
  synergies: Synergy[]
}

export function SynergiesList({ synergies }: SynergiesListProps) {
  const [selectedType, setSelectedType] = useState<string>('all')
  const [selectedTier, setSelectedTier] = useState<string>('all')

  const filteredSynergies = synergies.filter((synergy) => {
    const typeMatch = selectedType === 'all' || synergy.type === selectedType
    const tierMatch =
      selectedTier === 'all' || synergy.tier.toString() === selectedTier

    return typeMatch && tierMatch
  })

  return (
    <div className={cn('container')}>
      <SynergyFilters
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
        {filteredSynergies.map((synergy) => (
          <div
            key={synergy.id}
            className={'bg-card p-4 rounded-lg border border-border'}
          >
            <div className={'flex items-center justify-between mb-2'}>
              <h3 className={'text-lg font-semibold'}>{synergy.name}</h3>
              <div className={'text-sm'}>Tier {synergy.tier}</div>
            </div>
            <div className={'mb-2'}>
              <div className={'text-sm'}>
                <span className={'font-medium'}>Type:</span> {synergy.type}
              </div>
              <div className={'text-sm'}>
                <span className={'font-medium'}>Required Units:</span>{' '}
                {synergy.requiredUnits}
              </div>
            </div>
            <div className={'mt-2'}>
              <div className={'text-sm text-muted-foreground'}>
                {synergy.description || 'No description available'}
              </div>
            </div>
            {synergy.effects && synergy.effects.length > 0 && (
              <div className={'mt-4'}>
                <h4 className={'text-sm font-semibold mb-2'}>Effects:</h4>
                <ul className={'list-disc pl-5 text-sm'}>
                  {synergy.effects.map((effect, index) => (
                    <li key={index}>
                      <span className={'font-medium'}>{effect.name}:</span>{' '}
                      {effect.description}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
