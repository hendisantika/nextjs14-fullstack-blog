/** @format */

import {ReactNode, useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {Input} from '@/components/ui/input';
import {Label} from '@/components/ui/label';
import {Textarea} from '../ui/textarea';
import {useRouter} from 'next/navigation';
import {useToast} from '../ui/use-toast';

export default function AddBlog({
                                    title,
                                    description,
                                    blog,
                                    children,
                                }: {
    title: string;
    description: string;
    blog?: any;
    children: ReactNode;
}) {
    const initialState = {
        title: '',
        description: '',
        imageURL: '',
    };
    const router = useRouter()
    const {toast} = useToast()
    const [openBlogDialog, setOpenBlogDialog] = useState<boolean>(false);
    const [formData, setFormData] = useState(initialState);
    useEffect(() => {
        if (blog) {
            setFormData({
                title: blog.title,
                description: blog.description,
                imageURL: blog.imageURL,
            });
        }
    }, [blog]);

    async function handleSaveBlog() {
        try {
            const apiResponse =
                blog !== null && blog !== undefined
                    ? await fetch(`http://localhost:3000/api/blogs/${blog._id}`, {
                        method: 'PUT',
                        body: JSON.stringify(formData),
                    })
                    : await fetch('http://localhost:3000/api/blogs', {
                        method: 'POST',
                        body: JSON.stringify(formData),
                    });
            const result = await apiResponse.json()
            if (result?.success) {
                setFormData(initialState)
                setOpenBlogDialog(false)
                toast({
                    title: "Succeed save blog data",
                    description: "Page Updated",
                })
                router.refresh()
            }

        } catch (error) {
            console.error(error)
            toast({
                title: "Failed save blog data",
                description: "There was a problem with your request",
            })
            setFormData(initialState)
        }
    }

    return (
        <div>
            <div onClick={() => setOpenBlogDialog(true)}>{children}</div>
            <Dialog
                open={openBlogDialog}
                onOpenChange={() => {
                    setOpenBlogDialog(false);
                }}>
                <DialogTrigger asChild></DialogTrigger>
                <DialogContent className='sm:max-w-[425px]'>
                    <DialogHeader>
                        <DialogTitle>{title}</DialogTitle>
                        <DialogDescription>{description}</DialogDescription>
                    </DialogHeader>
                    <div className='grid gap-4 py-4'>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label
                                htmlFor='title'
                                className='text-right'>
                                Title
                            </Label>
                            <Input
                                id='title'
                                name='title'
                                value={formData.title}
                                onChange={(e) => {
                                    setFormData({...formData, [e.target.name]: e.target.value});
                                }}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label
                                htmlFor='description'
                                className='text-right'>
                                Description
                            </Label>
                            <Textarea
                                id='description'
                                name='description'
                                value={formData.description}
                                onChange={(e) => {
                                    setFormData({...formData, [e.target.name]: e.target.value});
                                }}
                                className='col-span-3'
                            />
                        </div>
                        <div className='grid grid-cols-4 items-center gap-4'>
                            <Label
                                htmlFor='imageURL'
                                className='text-right'>
                                Image URL
                            </Label>
                            <Input
                                id='imageURL'
                                name='imageURL'
                                value={formData.imageURL}
                                onChange={(e) => {
                                    setFormData({...formData, [e.target.name]: e.target.value});
                                }}
                                className='col-span-3'
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button
                            onClick={handleSaveBlog}
                            type='submit'>
                            Save changes
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    );
}