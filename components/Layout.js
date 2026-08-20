import Head from 'next/head'
import Nav from './Nav'

export default function Layout({ children }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link rel="icon" href="/headshot-square.png" type="image/png" sizes="512x512" />
        <link rel="apple-touch-icon" href="/headshot-square.png" />
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
