import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'
import { serialize } from 'next-mdx-remote/serialize'
import rehypeSlug from 'rehype-slug'

const mdxOptions = {
  rehypePlugins: [rehypeSlug],
}

const thoughtsDir = path.join(process.cwd(), 'content/thoughts')
const contentDir = path.join(process.cwd(), 'content')

// get all thought slugs for getStaticPaths
export function getThoughtSlugs() {
  if (!fs.existsSync(thoughtsDir)) return []
  return fs
    .readdirSync(thoughtsDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''))
}

// get all thoughts with frontmatter for the index page
export function getAllThoughts() {
  const slugs = getThoughtSlugs()
  const thoughts = slugs.map((slug) => {
    const filePath = path.join(thoughtsDir, `${slug}.mdx`)
    const source = fs.readFileSync(filePath, 'utf8')
    const { data } = matter(source)
    return {
      slug,
      date: data.date || '',
      title: data.title || '',
      preview: data.preview || '',
    }
  })

  // sort newest first
  thoughts.sort((a, b) => (a.date < b.date ? 1 : -1))
  return thoughts
}

// get a single thought by slug, serialized for rendering
export async function getThoughtBySlug(slug) {
  const filePath = path.join(thoughtsDir, `${slug}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  const mdxSource = await serialize(content, { mdxOptions })
  return {
    frontmatter: {
      date: data.date || '',
      title: data.title || '',
    },
    mdxSource,
  }
}

// get a content file by name (e.g. 'veena')
export async function getContentByName(name) {
  const filePath = path.join(contentDir, `${name}.mdx`)
  if (!fs.existsSync(filePath)) return null
  const source = fs.readFileSync(filePath, 'utf8')
  const { data, content } = matter(source)
  const mdxSource = await serialize(content, { mdxOptions })
  return {
    frontmatter: data,
    mdxSource,
  }
}
