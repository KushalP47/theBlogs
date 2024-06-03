import React, {useCallback, useEffect} from 'react'
import { useForm } from 'react-hook-form'
import {Button, RTE, Input, Select} from '../index.js'
import appWriteService from '../../appwrite/config.js';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';


function PostForm({post = null}) {
    const {register, handleSubmit, watch, setValue, control, getValues} = useForm({
        defaultValues: {
            title: post?.title || "",
            slug: post?.slug || "",
            content: post?.content || "",
            status: post?.status || "active",
        } 
    })
    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const submit = async (data) => {
        if(post) {  // updating the post
            const file = data.image[0] ? appWriteService.uploadFile(data.image[0]) : null

            // deleting the old file
            if(file) {
                appWriteService.deleteFile(post.image)
            }

            const dbPost = await appWriteService.updatePost(post.$id, {...data, 
                image: file ? file.$id : undefined})

            if(dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        } else {
            const file = await appWriteService.uploadFile(data.image[0]);
            if (file) {
                const fileId = file.$id;
                data.image = fileId;
                console.log(data.image)
                const dbPost = await appWriteService.createPost({ ...data, userId: userData.$id });

                if (dbPost) {
                    navigate(`/post/${dbPost.$id}`);
                }
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if(value && typeof value === 'string') {
            return value
            .trim()
            .toLowerCase()
            .replace(/[^a-zA-Z\d\s]+/g, '-')
            .replace(/\s/g, "-");
        }

        return ""
    }, [])

    useEffect(() => {
        console.log("useEffect called in PostForm.jsx")
        const subscription = watch((value, {name}) => {
            if(name === 'title') {
                setValue('slug', slugTransform(value.title), { shouldValidate: true });
            } else {
                console.log("Error at PostForm")
            }
        })

        return (() => {
            subscription.unsubscribe()
        })
    }, [watch, slugTransform, setValue])


    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">
            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />
                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue("slug", slugTransform(e.currentTarget.value), { shouldValidate: true });
                    }}
                />
                <RTE label="Content" name="content" control={control} defaultValue={getValues("content")} />
            </div>
            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image", { required: !post })}
                />
                {post && (
                    <div className="w-full mb-4">
                        <img
                            src={appWriteService.getFilePreview(post.image)}
                            alt={post.title}
                            className="rounded-lg"
                        />
                    </div>
                )}
                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />
                <Button type="submit" bgColor={"bg-orange"} className="w-full border-4 border-orange hover:bg-white">
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    );
}

export default PostForm
