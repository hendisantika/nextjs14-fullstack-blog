/** @format */

import {DTOBlogs} from '@/types';
import {Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle,} from '@/components/ui/card';
import Image from 'next/image';
import Link from 'next/link';
import {Button} from '../ui/button';

export default function BlogItem({blog}: { blog: DTOBlogs }) {
    return (
        <Card>
            <CardHeader>
                <Image
                    className='object-fill h-48 w-96'
                    src={blog.imageURL}
                    height={300}
                    width={500}
                    alt={blog.title}
                />
            </CardHeader>
            <CardContent>
                <div className='bg-slate-400 p-2 mx-2 text-center rounded-md'>
                    <CardTitle className='flex items-center'>{blog.title}</CardTitle>
                </div>
            </CardContent>
            <CardFooter>
                <div className='flex flex-col gap-4'>
                    <CardDescription>{blog.description.slice(0, 120)}</CardDescription>
                    <Link href={`/blogs/${blog._id}`}>
                        <Button className='bg-slate-400'>
                            Read More
                        </Button>
                    </Link>
                </div>
            </CardFooter>
        </Card>
    );
}