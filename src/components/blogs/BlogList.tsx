import {DTOBlogs} from "@/types";
import BlogItem from "./BlogItem";

export default function BlogList({blogs}: { blogs: any }) {
    return <div className="grid grid-cols-4 gap-4">
        {blogs.map((blog: DTOBlogs) => {
            return <div key={blog._id}>
                <BlogItem blog={blog}/>
            </div>
        })}
    </div>
}