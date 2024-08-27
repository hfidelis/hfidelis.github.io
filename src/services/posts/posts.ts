import { Octokit } from 'octokit'

const octokit = new Octokit({
    auth: import.meta.env.VITE_GITHUB_TOKEN,
})

const GITHUB_DATA = {
    owner: 'hfidelis',
    repo: 'hfidelis.github.io',
    path: 'src/services/posts/files',
}
const GITHUB_REQUEST = 'GET /repos/{owner}/{repo}/contents/{path}'

interface Post {
    slug: string
    lang: string
    content: string
}

interface File {
    download_url: string
    name: string
}

const getPostContent = async (link: string): Promise<string> => {
    try {
        const rawContent = await fetch(link)

        return await rawContent.text()
    } catch (error) {
        throw new Error('Error fetching post content')
    }
}

export const getAllPosts = async () => {
    try {
        const postsContent = {}

        const { data } = await octokit.request(GITHUB_REQUEST, GITHUB_DATA) as any
    
        const mappedFiles = data.map((file: any) => {
            const fileData: File = {
                download_url: file.download_url,
                name: file.name,
            }
            
            return fileData
        })
    
        const promises = mappedFiles.map(async (file: File): Promise<Post> => {
            const content: string = await getPostContent(file.download_url)        
    
            const [ slug, lang ]= file.name.replace('md', '').split('.')
    
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
    } catch (error) {
        throw new Error('Error fetching posts')
    }    
}

export const getPostContents = async (slug: string) => {
    try {
        const posts = await getAllPosts()

        if (!(slug in posts)) {
            throw new Error('Post not found')
        }
    
        return posts[slug]
    } catch (error) {
        throw new Error('Error fetching post content')
    }
}
