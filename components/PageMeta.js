import Head from 'next/head'

export default function PageMeta({ title, description }) {
  const fullTitle = title ? `${title} — sheldon lewis` : 'sheldon lewis'
  const desc = description || 'sheldon lewis — personal site'

  return (
    <Head>
      <title>{fullTitle}</title>
      <meta name="description" content={desc} />
    </Head>
  )
}
