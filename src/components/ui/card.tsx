import * as React from 'react'

import { cn } from '@/utilities/ui'

const Card: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div
    className={cn(
      'rounded-xl bg-card text-card-foreground shadow-sm',
      className,
    )}
    ref={ref}
    {...props}
  />
)

const CardHeader: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div
    className={cn('flex flex-col leading-snug text-light-blue p-2', className)}
    ref={ref}
    {...props}
  />
)

const CardTitle: React.FC<
  {
    ref?: React.Ref<HTMLHeadingElement>
  } & React.HTMLAttributes<HTMLHeadingElement>
> = ({ className, ref, ...props }) => (
  <h3
    className={cn(
      'text-2xl mt-2 font-bold leading-none tracking-tight',
      className,
    )}
    ref={ref}
    {...props}
  />
)

const CardDescription: React.FC<
  {
    ref?: React.Ref<HTMLParagraphElement>
  } & React.HTMLAttributes<HTMLParagraphElement>
> = ({ className, ref, ...props }) => (
  <p
    className={cn('text-sm text-muted-foreground', className)}
    ref={ref}
    {...props}
  />
)

const CardContent: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div className={cn('p-6 pt-0', className)} ref={ref} {...props} />
)

const CardFooter: React.FC<
  { ref?: React.Ref<HTMLDivElement> } & React.HTMLAttributes<HTMLDivElement>
> = ({ className, ref, ...props }) => (
  <div
    className={cn('flex justify-center pb-2', className)}
    ref={ref}
    {...props}
  />
)

export { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle }
