interface StoryProps {
    children: React.ReactNode
}

export default function StoryLayout(props: Readonly<StoryProps>) {
    return (
        <div id="story">{props.children}</div>
    )
}