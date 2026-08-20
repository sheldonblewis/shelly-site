/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  async redirects() {
    return [
      {
        source: '/me',
        destination: '/#top',
        permanent: true,
      },
      {
        source: '/work',
        destination: '/#work',
        permanent: true,
      },
      {
        source: '/adventures',
        destination: '/#adventures',
        permanent: true,
      },
      {
        source: '/places',
        destination: '/#adventures',
        permanent: true,
      },
      {
        source: '/thoughts',
        destination: '/#thoughts',
        permanent: true,
      },
      {
        source: '/contact',
        destination: '/#contact',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
