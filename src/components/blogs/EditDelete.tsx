/** @format */

'use client';

import {Delete, Edit} from 'lucide-react';

import {Button} from '@/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import AddBlog from './AddBlog';
import {DTOBlogs} from '@/types';
import {useToast} from '../ui/use-toast';
import {useRouter} from 'next/navigation';

export function EditDelete({blog}: { blog: DTOBlogs }) {
    const {toast} = useToast();
    const router = useRouter();

    async function handleDeleteById() {
        try {
            const apiResponse = await fetch(
                `http://localhost:3000/api/blogs/${blog._id}`,
                {
                    method: 'DELETE',
                }
            );
            const result = await apiResponse.json();
            if (result?.success) {
                toast({
                    title: 'Succeed deleted blog data',
                    description: 'Page Updated',
                });
                router.push('/blogs');
                router.refresh()

            }
        } catch (error) {
            console.error(error)
            toast({
                title: 'Failed deleted blog data',
                description: 'Page Updated',
            });
        }
    }

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button variant='ghost'>. . .</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className='w-56'>
                <DropdownMenu>
                    <DropdownMenuGroup>
                        <DropdownMenuItem>
                            <AddBlog
                                blog={blog}
                                title='Update Blog'
                                description='Update your Blog here. Click save when youre done.'>
                                <div className='flex gap-1'>
                                    <Edit className='mr-2 h-4 w-4'/>
                                    <span>Edit</span>
                                </div>
                            </AddBlog>
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={handleDeleteById}>
                            <Delete className='mr-2 h-4 w-4'/>
                            <span>Delete</span>
                        </DropdownMenuItem>
                    </DropdownMenuGroup>
                </DropdownMenu>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}