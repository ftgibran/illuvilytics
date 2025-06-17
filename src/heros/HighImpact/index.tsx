'use client'
import React, { useEffect } from 'react'

import { CMSLink } from '@/components/Link'
import { Media } from '@/components/Media'
import RichText from '@/components/RichText'
import type { Page } from '@/payload-types'
import { useHeaderTheme } from '@/providers/HeaderTheme'

export const HighImpactHero: React.FC<Page['hero']> = ({
  links,
  media,
  richText,
}) => {
  const { setHeaderTheme } = useHeaderTheme()

  useEffect(() => {
    setHeaderTheme('dark')
  })

  return (
    <div
      className={
        'relative -mt-[10.4rem] flex items-center justify-center text-white pointer-events-none'
      }
      data-theme={'dark'}
      style={{
        WebkitMaskImage:
          'linear-gradient(to bottom, transparent, black 12rem, black 70%, transparent 100%)',
      }}
    >
      <div
        className={
          'container z-10 relative flex items-center justify-center md:justify-stretch'
        }
      >
        <div className={'max-w-[30rem] pointer-events-auto'}>
          {richText && (
            <RichText className={'mb-6'} data={richText} enableGutter={false} />
          )}
          {Array.isArray(links) && links.length > 0 && (
            <ul className={'flex justify-center md:justify-stretch gap-4'}>
              {links.map(({ link }, i) => {
                return (
                  <li key={i}>
                    <CMSLink {...link} />
                  </li>
                )
              })}
            </ul>
          )}
        </div>
      </div>

      <div className={'min-h-[100vh] select-none pointer-events-none'}>
        {media && typeof media === 'object' && (
          <Media
            fill
            imgClassName={'-z-10 object-cover'}
            priority
            resource={media}
          />
        )}
      </div>

      <div
        className={
          'absolute w-full min-h-[100vh] select-none pointer-events-none'
        }
        style={{
          backdropFilter: 'blur(20px)',
          background:
            'linear-gradient(to right, rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7) 30rem, transparent)',
          WebkitMaskImage:
            'linear-gradient(to right, black 10rem, transparent)',
        }}
      />
    </div>
  )
}
