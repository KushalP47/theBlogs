import React, { useState, useEffect } from 'react'
import { Container, PostCard } from '../components'
import appWriteService from '../appwrite/config.js'
import { useSelector } from 'react-redux';

function Home() {
    const [posts, setPosts] = useState([])
    const authStatus = useSelector((state) => state.auth.status)
    const [flag, setFlag] = useState(0)
    useEffect(() => {
        if(authStatus) {
            setFlag(1)
            appWriteService.getPosts().then((postsArr) => {
                if (postsArr) {
                    console.log("posts[]: ",postsArr)
                    setPosts(postsArr.documents)
                }
            })
        } else {
            setFlag(0);
        }
    }, [authStatus])
    if(flag === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                User Need to Login
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else if(posts.length === 0) {
        return (
            <div className="w-full py-8 mt-4 text-center">
                <Container>
                    <div className="flex flex-wrap">
                        <div className="p-2 w-full">
                            <h1 className="text-2xl font-bold hover:text-gray-500">
                                No Posts to display
                            </h1>
                        </div>
                    </div>
                </Container>
            </div>
        )
    } else {
        return (
            <div className='w-full py-8'>
                <Container>
                    <div className='flex flex-wrap'>
                    {posts.map((post) => (
                            <div key={post.$id} className='p-2 w-1/4'>
                                <PostCard {...post}/>
                            </div>
                        ))}
                    </div>
                </Container>
            </div>
        )
    }
}

export default Home
