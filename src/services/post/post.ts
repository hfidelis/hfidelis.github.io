interface Post {
    slug: string
    lang: string
    content: string
}

const posts = import.meta.glob(
    '@/services/post/files/*.md',
    { import: 'default', eager: true },
)
const postPaths = Object.keys(posts)

class PostService {
    private static instance: PostService

    private constructor() {}

    public static getInstance(): PostService {
        if (!PostService.instance) {
            PostService.instance = new PostService()
        }

        return PostService.instance
    }

    private getPostContent = async (path: string): Promise<string> => {
        /* vite-ignore */
        const content = await import(path)

        const rawContent = await fetch(content.default)

        return await rawContent.text()
    }

    public getAllPosts = async (): Promise<object> => {
        const postsContent = {}

        const promises = postPaths.map(async (path: string): Promise<Post> => {
            const content: string = await this.getPostContent(path)

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

    public getPostData = async (slug: string): Promise<{ [key: string]: string }> => {
        const posts = await this.getAllPosts()

        if (!(slug in posts)) {
            throw new Error('Post not found')
        }

        return posts[slug]
    }
}

const postService = PostService.getInstance()

export default postService