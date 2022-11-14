import { css } from '@emotion/css'
import Image, { ImageProps } from 'next/image'
import { ReactElement } from 'react'

const style = css`
  object-fit: cover;
`

export interface CoveredImageProps extends Omit<ImageProps, 'alt' | 'width' | 'height'> {
  size: [number, number]
}

export default function CoveredImage (props: CoveredImageProps): ReactElement {
  return (
    <Image
      className={style}
      width={props.size[0]}
      height={props.size[1]}
      {...props}
      alt={''}
    />
  )
}
