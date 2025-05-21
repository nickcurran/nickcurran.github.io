import { ReactElement } from 'react'

export default async function Page ({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<ReactElement> {
  const { slug } = await params
  const { default: Post } = await import(`@/stories/${slug}.mdx`)

  return <Post />
}

export function generateStaticParams (): Array<{ slug: string }> {
  return ['about', 'prk', 'tray'].map((slug) => ({
    slug
  }))
}

// Setting this to false will cause things not listed in generateStaticParams to 404
export const dynamicParams = false
