import clsx from 'clsx'
import React from 'react'

interface Props {
  className?: string
  loading?: 'lazy' | 'eager'
  priority?: 'auto' | 'high' | 'low'
  isMonochromatic?: boolean
}

export const Logo = (props: Props) => {
  const {
    loading: loadingFromProps,
    priority: priorityFromProps,
    className,
    isMonochromatic,
  } = props

  const loading = loadingFromProps || 'lazy'
  const priority = priorityFromProps || 'low'

  return (
    /* eslint-disable @next/next/no-img-element */
    <div className={'flex flex-row gap-0 items-center'}>
      <img
        alt={'Payload Logo'}
        width={193}
        height={34}
        loading={loading}
        fetchPriority={priority}
        className={clsx('w-full h-16', className)}
        src={isMonochromatic ? '/logo-white.webp' : '/logo.webp'}
      />

      <span className={'text-2xl font-bold tracking-widest text-white'}>
        Illuvilytics
      </span>
    </div>
  )
}
