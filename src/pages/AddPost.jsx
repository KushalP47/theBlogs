import React from 'react'
import { Container, PostForm } from '../components/index.js'
function AddPost() {
    console.log("AddPost Page is called")
    return (
        <div className='py-8'>
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost
