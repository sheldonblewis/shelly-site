/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ['js', 'jsx', 'mdx'],
  async redirects() {
    return [
      {
        source: '/places',
        destination: '/adventures',
        permanent: true,
      },
    ]
  },
}

module.exports = nextConfig
