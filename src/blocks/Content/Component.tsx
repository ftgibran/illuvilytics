import React, { useCallback } from 'react'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import type { ContentBlock as ContentBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
  const { columns, centralized, multipleColumns, content, enableLink, link } =
    props

  return (
    <div className={'container my-16'}>
      {multipleColumns ? (
        <div className={'grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16'}>
          {columns?.map((props, index) => (
            <Display
              key={index}
              index={index}
              length={columns.length}
              centralized={centralized}
              {...props}
            />
          ))}
        </div>
      ) : (
        <Display
          enableLink={enableLink}
          link={link}
          content={content}
          centralized={centralized}
        />
      )}
    </div>
  )
}

type DisplayProps = NonNullable<ContentBlockProps['columns']>[number] & {
  centralized?: boolean | null
  index?: number
  length?: number
}

const Display = (props: DisplayProps) => {
  const {
    enableLink,
    link,
    content,
    size,
    centralized,
    index = 0,
    length = 1,
  } = props

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
        {
          'col-span-4': size,
          flex: centralized,
          'flex-col': centralized,
          'items-stretch': !centralized,
          'items-center': centralized,
          'text-center': centralized,
        },
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
      {content && (
        <RichText
          data={content}
          enableGutter={false}
          className={cn({
            flex: centralized,
            'flex-col': centralized,
            'items-stretch': !centralized,
            'items-center': centralized,
            'text-center': centralized,
          })}
        />
      )}

      {enableLink && <CMSLink {...link} />}
    </div>
  )
}
