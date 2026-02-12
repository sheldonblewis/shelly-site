import { MDXRemote } from 'next-mdx-remote'
import PageMeta from '@/components/PageMeta'
import BackLink from '@/components/BackLink'
import { getThoughtSlugs, getThoughtBySlug } from '@/lib/mdx'

export async function getStaticPaths() {
  const slugs = getThoughtSlugs()
  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  }
}

export async function getStaticProps({ params }) {
  const thought = await getThoughtBySlug(params.slug)
  if (!thought) return { notFound: true }
  return { props: { thought } }
}

export default function ThoughtPost({ thought }) {
  return (
    <>
      <PageMeta title={thought.frontmatter.title} />

      <BackLink href="/thoughts">thoughts</BackLink>

      <div className="section">
        <div className="thought-date" style={{ marginBottom: '0.5rem' }}>
          {thought.frontmatter.date}
        </div>
        <h1 style={{ marginBottom: '2rem' }}>{thought.frontmatter.title}</h1>
        <div className="prose">
          <MDXRemote {...thought.mdxSource} />
        </div>
      </div>
    </>
  )
}
