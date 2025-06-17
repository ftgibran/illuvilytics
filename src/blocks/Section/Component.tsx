import React, { useCallback } from 'react'

import RichText from '@/components/RichText'
import type { SectionBlock as SectionBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const SectionBlock: React.FC<SectionBlockProps> = (props) => {
  const { columns, multipleColumns, content } = props

  return (
    <section className={'container'}>
      {multipleColumns ? (
        <div className={'grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16'}>
          {columns?.map((props, index) => (
            <Display
              key={index}
              index={index}
              length={columns.length}
              {...props}
            />
          ))}
        </div>
      ) : (
        <Display content={content} />
      )}
    </section>
  )
}

type DisplayProps = NonNullable<SectionBlockProps['columns']>[number] & {
  index?: number
  length?: number
}

const Display = (props: DisplayProps) => {
  const { content, size, index = 0, length = 1 } = props

  const isSize = useCallback(
    (current: typeof size, centralized?: boolean) =>
      centralized !== undefined
        ? centralized && size === current
        : size === current,
    [size],
  )

  return (
    <div
      className={cn(
        { 'col-span-4': size },
        {
          'lg:col-span-4': isSize('oneThird'),
          'lg:col-start-5': isSize('oneThird', true) && length === 1 && !index,
          'lg:col-start-3': isSize('oneThird', true) && length === 2 && !index,
        },
        {
          'lg:col-span-6': isSize('half'),
          'lg:col-start-4': isSize('half', true) && length === 1 && !index,
        },
        {
          'lg:col-span-8': isSize('twoThirds'),
          'lg:col-start-3': isSize('twoThirds', true) && length === 1 && !index,
        },
      )}
    >
      {content && <RichText data={content} enableGutter={false} />}
    </div>
  )
}
