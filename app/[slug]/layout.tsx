import { ReactElement } from 'react'

interface StoryProps {
  children: React.ReactNode
}

export default function StoryLayout (props: Readonly<StoryProps>): ReactElement {
  return (
    <div id='story'>{props.children}</div>
  )
}
