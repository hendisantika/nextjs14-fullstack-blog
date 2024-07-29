export interface Blogs {
    title: string,
    description: string,
    imageURL: string,
}

export interface DTOBlogs {
    _id: string
    title: string,
    description: string,
    imageURL: string,
    createdAt: string,
    updatedAt: string,
    __v: number
}