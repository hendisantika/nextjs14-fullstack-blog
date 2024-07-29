/** @format */

import {EditDelete} from '@/components/blogs/EditDelete';
import Image from 'next/image';

async function fetchBlog(id: string) {
    try {
        const data = await fetch(`http://localhost:3000/api/blogs/${id}`, {
            cache: 'no-store',
        });
        return data.json();
    } catch (error) {
        throw new Error('Failed Fetch Resource');
    }
}

export default async function BlogDetail({
                                             params,
                                         }: {
    params: { id: string };
}) {
    const blog = await fetchBlog(params.id);
    return (
        <section className='bg-white dark:bg-gray-900'>
            <div className='container px-6 py-10 mx-auto'>
                <div className='mt-8 lg:-mx-6 lg:flex lg:items-center'>
                    <Image
                        className='object-cover w-full lg:mx-6 lg:w-1/2 rounded-xl h-72 lg:h-96'
                        src={blog.data.imageURL}
                        alt={blog.data.title}
                        width={500}
                        height={500}
                    />

                    <div className='mt-6 lg:w-1/2 lg:mt-0 lg:mx-6 '>
                        <div className='flex justify-between items-center'>
                            <p className='text-sm text-blue-500 uppercase'>category</p>
                            <EditDelete blog={blog.data}/>
                        </div>

                        <div
                            className='block mt-4 text-2xl font-semibold text-gray-800 hover:underline dark:text-white md:text-3xl'>
                            {blog.data.title}
                        </div>

                        <p className='mt-3 text-sm text-gray-500 dark:text-gray-300 md:text-sm'>
                            {blog.data.description}
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
}