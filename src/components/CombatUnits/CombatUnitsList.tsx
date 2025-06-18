'use client'

import Image from 'next/image'
import { useState } from 'react'

import { CombatUnit } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { CombatUnitFilters } from './CombatUnitFilters'

const classIcons: Record<string, string> = {
  Fighter: 'Fighter',
  Rogue: 'Rogue',
  Bulwark: 'Bulwark',
  Psion: 'Psion',
  Empath: 'Empath',
  None: 'None',
}

const elementIcons: Record<string, string> = {
  Water: 'Water',
  Earth: 'Earth',
  Fire: 'Fire',
  Nature: 'Nature',
  Air: 'Air',
  None: 'None',
}

interface CombatUnitsListProps {
  units: CombatUnit[]
}

export function CombatUnitsList({ units }: CombatUnitsListProps) {
  const [selectedClass, setSelectedClass] = useState<string>('all')
  const [selectedElement, setSelectedElement] = useState<string>('all')

  const filteredUnits = units.filter((unit) => {
    const classMatch = selectedClass === 'all' || unit.class === selectedClass
    const elementMatch =
      selectedElement === 'all' || unit.element === selectedElement

    return classMatch && elementMatch
  })

  return (
    <div className={cn('container')}>
      <CombatUnitFilters
        selectedClass={selectedClass}
        selectedElement={selectedElement}
        onClassChange={setSelectedClass}
        onElementChange={setSelectedElement}
      />

      <div
        className={
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6'
        }
      >
        {filteredUnits.map((unit) => (
          <div
            key={unit.id}
            className={'bg-card p-4 rounded-lg border border-border'}
          >
            <div className={'flex items-center justify-between mb-2'}>
              <h3 className={'text-lg font-semibold'}>{unit.name}</h3>
              <div className={'text-sm'}>Stage {unit.stage}</div>
            </div>
            <div className={'flex gap-2 mb-2'}>
              {unit.class !== 'None' && (
                <div className={'flex items-center gap-1'}>
                  <Image
                    src={`https://firebasestorage.googleapis.com/v0/b/illuvilytics.firebasestorage.app/o/class_affinity%2F${classIcons[unit.class]}.png?alt=media`}
                    alt={unit.class}
                    width={24}
                    height={24}
                  />
                  <span className={'text-sm'}>{unit.class}</span>
                </div>
              )}
              {unit.element !== 'None' && (
                <div className={'flex items-center gap-1'}>
                  <Image
                    src={`https://firebasestorage.googleapis.com/v0/b/illuvilytics.firebasestorage.app/o/class_affinity%2F${elementIcons[unit.element]}.png?alt=media`}
                    alt={unit.element}
                    width={24}
                    height={24}
                  />
                  <span className={'text-sm'}>{unit.element}</span>
                </div>
              )}
            </div>
            {unit.data &&
              typeof unit.data === 'object' &&
              'ImageURL' in unit.data && (
                <div
                  className={'relative w-full h-40 rounded-md overflow-hidden'}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={(unit.data.ImageURL as string) || ''}
                    alt={unit.name}
                    className={'object-cover'}
                  />
                </div>
              )}
          </div>
        ))}
      </div>
    </div>
  )
}
