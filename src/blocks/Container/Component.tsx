import React from 'react'

import RichText from '@/components/RichText'
import type { ContainerBlock as ContainerBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const ContainerBlock: React.FC<ContainerBlockProps> = (props) => {
  const { size, content } = props

  return (
    <div className={'my-5 flex justify-center'}>
      <div
        className={cn('', {
          ['max-w-screen-sm']: size === 'sm',
          ['max-w-screen-md']: size === 'md',
          ['max-w-screen-lg']: size === 'lg',
          ['max-w-screen-xl']: size === 'xl',
        })}
      >
        {content && <RichText data={content} enableGutter={false} />}
      </div>
    </div>
  )
}
