import { MDXRemote } from 'next-mdx-remote'
import PageMeta from '@/components/PageMeta'
import BackLink from '@/components/BackLink'
import { getContentByName } from '@/lib/mdx'

export async function getStaticProps() {
  const veena = await getContentByName('veena')
  return { props: { veena } }
}

export default function Veena({ veena }) {
  return (
    <>
      <PageMeta title="veena" />

      <BackLink scrollTarget="thoughts">my thoughts</BackLink>

      <div className="section">
        <h1>veena</h1>
        <aside className="retrospective-note">
          <p>
            <span>note from aug 25, 2026:</span> here are the scribbling thoughts and ambitions of 21-year-old me. in hindsight, i recognize a continued difficulty in execution, but i appreciate the desire to self-express and share thoughts.
          </p>
        </aside>
        <div className="prose">
          <MDXRemote {...veena.mdxSource} />
        </div>
      </div>
    </>
  )
}
