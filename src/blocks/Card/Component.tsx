import React from 'react'
import type { CardBlock as CardBlockProps } from 'src/payload-types'

import { CMSLink } from '@/components/Link'
import RichText from '@/components/RichText'
import { Card, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'

type Props = {
  className?: string
} & CardBlockProps

export const CardBlock: React.FC<Props> = (props) => {
  const { title, subtitle, content, links } = props

  return (
    <Card className={'w-full h-full p-4 shadow-lg'}>
      <CardTitle className={'text-center'}>{title}</CardTitle>

      <CardHeader className={'text-center'}>{subtitle}</CardHeader>

      {content && (
        <RichText
          data={content}
          enableGutter={false}
          enableProse={false}
          className={'w-full text-sm text-lilac'}
        />
      )}

      <CardFooter>
        {links?.map(({ link }, i) => <CMSLink key={i} size={'lg'} {...link} />)}
      </CardFooter>
    </Card>
  )
}
