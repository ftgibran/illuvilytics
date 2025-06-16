'use client'

import Image from 'next/image'
import { useState } from 'react'

import { Weapon } from '@/payload-types'
import { cn } from '@/utilities/ui'

import { WeaponFilters } from './WeaponFilters'

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

interface WeaponsListProps {
  weapons: Weapon[]
}

export function WeaponsList({ weapons }: WeaponsListProps) {
  const [selectedClass, setSelectedClass] = useState<string>('all')
  const [selectedElement, setSelectedElement] = useState<string>('all')
  const [selectedType, setSelectedType] = useState<string>('all')

  const filteredWeapons = weapons.filter((weapon) => {
    const classMatch = selectedClass === 'all' || weapon.class === selectedClass
    const elementMatch =
      selectedElement === 'all' || weapon.element === selectedElement
    const typeMatch = selectedType === 'all' || weapon.type === selectedType

    return classMatch && elementMatch && typeMatch
  })

  return (
    <div className={cn('container')}>
      <WeaponFilters
        selectedClass={selectedClass}
        selectedElement={selectedElement}
        selectedType={selectedType}
        onClassChange={setSelectedClass}
        onElementChange={setSelectedElement}
        onTypeChange={setSelectedType}
      />

      <div
        className={
          'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mt-6'
        }
      >
        {filteredWeapons.map((weapon) => (
          <div
            key={weapon.id}
            className={'bg-card p-4 rounded-lg border border-border'}
          >
            <div className={'flex items-center justify-between mb-2'}>
              <h3 className={'text-lg font-semibold'}>{weapon.name}</h3>
              <div className={'text-sm'}>Tier {weapon.tier}</div>
            </div>
            <div className={'flex gap-2 mb-2'}>
              {weapon.class !== 'None' && (
                <div className={'flex items-center gap-1'}>
                  <Image
                    src={`https://firebasestorage.googleapis.com/v0/b/illuvilytics.firebasestorage.app/o/class_affinity%2F${classIcons[weapon.class]}.png?alt=media`}
                    alt={weapon.class}
                    width={24}
                    height={24}
                  />
                  <span className={'text-sm'}>{weapon.class}</span>
                </div>
              )}
              {weapon.element !== 'None' && (
                <div className={'flex items-center gap-1'}>
                  <Image
                    src={`https://firebasestorage.googleapis.com/v0/b/illuvilytics.firebasestorage.app/o/class_affinity%2F${elementIcons[weapon.element]}.png?alt=media`}
                    alt={weapon.element}
                    width={24}
                    height={24}
                  />
                  <span className={'text-sm'}>{weapon.element}</span>
                </div>
              )}
            </div>
            <div className={'mt-2'}>
              <div className={'text-sm text-muted-foreground'}>
                {weapon.displayDescription || 'No description available'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
