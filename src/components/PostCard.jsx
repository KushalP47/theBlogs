import React from 'react'
import appwriteService from '../appwrite/config.js';
import { Link } from 'react-router-dom';

function PostCard({$id, image, title}) {
    console.log("id: ", $id)
    console.log("image: ", image)
    console.log("title: ", title)
    return (
        <Link to={`/post/${$id}`}>
            <div className='w-full bg-gray-100 rounded-xl p-4'>
                <div className='w-full justify-center mb-4'>
                    <img src={appwriteService.getFilePreview(image)} alt={title} className='rounded-xl h-full w-full justify-center'/>
                </div>
                <h2 className='text-xl font-bold'>
                    {title}
                </h2>
            </div>
        </Link>
    )
}

export default PostCard
