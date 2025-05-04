export default async function Page({
    params,
  }: {
    params: Promise<{ slug: string }>
  }) {
    const { slug } = await params
    const { default: Post } = await import(`@/stories/${slug}.mdx`)
   
    return <Post />
  }
   
  export function generateStaticParams() {
    return ['about', 'prk', 'tray'].map((slug) => ({
      slug,
    }))
  }
  
  // Setting this to false will cause things not listed in generateStaticParams to 404
  export const dynamicParams = false