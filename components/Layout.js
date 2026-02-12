import Head from 'next/head'
import Nav from './Nav'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="page-container">
        <Nav />
        <main className="page-content">
          {children}
        </main>
      </div>
    </>
  )
}
