import {Blogs} from "@/types";
import {model, models, Schema} from "mongoose";

const blogSchema = new Schema<Blogs>({
    title: {
        type: String,
        required: [true, 'Title should not be empty']
    },
    description: {
        type: String,
        required: [true, 'Description should not be empty']
    },
    imageURL: {
        type: String,
        default: ''
    }
}, {timestamps: true})

export const Blog = models.Blogs || model<Blogs>('Blogs', blogSchema)