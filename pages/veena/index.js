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

      <BackLink href="/work">my work</BackLink>

      <div className="section">
        <h1 style={{ marginBottom: '3rem' }}>veena</h1>
        <div className="prose">
          <MDXRemote {...veena.mdxSource} />
        </div>
      </div>
    </>
  )
}
