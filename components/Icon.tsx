import Image from 'next/image'
import { ReactElement } from 'react'

export interface IconProps {
  name: string
  alt: string
}

export default function Icon (props: IconProps): ReactElement {
  const lightSrc = `icons/${props.name}.svg`
  const darkSrc = `icons/${props.name}-dark.svg`

  return (
    <picture>
      <source srcSet={darkSrc} media='(prefers-color-scheme: dark)' />
      <Image src={lightSrc} alt={props.alt} width={32} height={32} className='inline-block' style={{ verticalAlign: 'middle' }} />
    </picture>
  )
}
