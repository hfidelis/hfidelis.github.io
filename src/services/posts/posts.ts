interface Post {
    slug: string
    lang: string
    content: string
}

const posts = import.meta.glob(
    '@/services/posts/files/*.md',
    { import: 'default', eager: true },
)
const postPaths = Object.keys(posts)

const getPostContent = async (path: string): Promise<string> => {
    const content = await import(path)

    const rawContent = await fetch(content.default)

    return await rawContent.text()
}

export const getAllPosts = async () => {
    const postsContent = {}

    const promises = postPaths.map(async (path: string): Promise<Post> => {
        const content: string = await getPostContent(path)

        const formattedPath = path.split('/').pop()?.replace('.md', '')

        const [ slug, lang ]= formattedPath!.split('.')
        
        
        return { slug, lang, content }
    })

    const results: Array<Post> = await Promise.all(promises)

    results.forEach((post: Post): void => {        
        if (!(post.slug in postsContent)) {
            postsContent[post.slug] = {}
        }

        postsContent[post.slug][post.lang] = post.content
    })

    return postsContent
}

export const getPostContents = async (slug: string) => {
    const posts = await getAllPosts()

    if (!(slug in posts)) {
        throw new Error('Post not found')
    }

    return posts[slug]
}
