import BlogList from "@/components/blogs/BlogList"

async function fetchBlogs() {
    try {
        const data = await fetch('http://localhost:3000/api/blogs', {
            cache: 'no-store'
        })
        return data.json()
    } catch (error) {
        throw new Error('Failed Fetch Resource')
    }
}

export default async function BlogPage() {
    const blogs = await fetchBlogs()
    return <div>
        <BlogList blogs={blogs.data}/>
    </div>
}