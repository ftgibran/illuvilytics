import React, { Fragment } from 'react'

import RichText from '@/components/RichText'
import type { GridBlock as GridBlockProps } from '@/payload-types'
import { cn } from '@/utilities/ui'

export const GridBlock: React.FC<GridBlockProps> = (props) => {
  const { centralized, nroOfColumns, columns } = props

  return (
    <div className={cn('my-5 flex', { ['justify-center']: centralized })}>
      <div
        className={cn(`grid grid-cols-1 lg:grid-cols-${nroOfColumns} gap-4`, {
          ['flex-1']: !centralized,
        })}
      >
        {columns?.map(({ content }, index) => (
          <Fragment key={index}>
            {content && (
              <RichText
                data={content}
                enableGutter={false}
                className={'w-full'}
                // className={cn({
                //   flex: centralized,
                //   'flex-col': centralized,
                //   'items-stretch': !centralized,
                //   'items-center': centralized,
                //   'text-center': centralized,
                // })}
              />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  )
}
