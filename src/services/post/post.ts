import { Octokit } from 'octokit'

interface Post {
    slug: string
    lang: string
    content: string
}

interface File {
    download_url: string
    name: string
}

class PostService {
    private static instance: PostService

    private octokit = new Octokit()
    private owner: string = 'hfidelis'
    private repo: string = 'learning-in-public'
    private path: string = 'posts'

    private GITHUB_DATA: { [key: string]: string } = {
        owner: this.owner,
        repo: this.repo,
        path: this.path,
    }
    private GITHUB_REQUEST: string = 'GET /repos/{owner}/{repo}/contents/{path}'

    private constructor() {}

    public static getInstance(): PostService {
        if (!PostService.instance) {
            PostService.instance = new PostService()
        }

        return PostService.instance
    }

    private getPostContent = async (link: string): Promise<string> => {
        try {
            const rawContent = await fetch(link)
    
            return await rawContent.text()
        } catch (_) {
            throw new Error('Error fetching post content')
        }
    }
    
     public getAllPosts = async () => {
        try {
            const postsContent = {}
    
            const { data } = await this.octokit.request(this.GITHUB_REQUEST, this.GITHUB_DATA) as any
        
            const mappedFiles = data.map((file: any) => {
                const fileData: File = {
                    download_url: file.download_url,
                    name: file.name,
                }
                
                return fileData
            })
        
            const promises = mappedFiles.map(async (file: File): Promise<Post> => {
                const content: string = await this.getPostContent(file.download_url)        
        
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
        } catch (_) {
            throw new Error('Error fetching posts')
        }    
    }
    
    public getPostData = async (slug: string): Promise<{ [key: string]: string }> => {
        try {
            const posts = await this.getAllPosts()
    
            if (!(slug in posts)) {
                throw new Error('Post not found')
            }
        
            return posts[slug]
        } catch (_) {
            throw new Error('Error fetching post content')
        }
    }
}

const postService = PostService.getInstance()

export default postService
