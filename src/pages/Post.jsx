import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import appwriteService from "../appwrite/config";
import { Button, Container } from "../components";
import parse from "html-react-parser";
import { useSelector } from "react-redux";

export default function Post() {
    const [post, setPost] = useState(null);
    const { slug } = useParams();
    const navigate = useNavigate();

    const userData = useSelector((state) => state.auth.userData);

    const isAuthor = post && userData ? post.userId === userData.$id : false;

    useEffect(() => {
        if (slug) {
            appwriteService.getPost(slug).then((post) => {
                if (post) {
                    console.log("post: ", post)
                    setPost(post);
                }
                else navigate("/");
            });
        } else navigate("/");
    }, [slug, navigate]);

    const deletePost = () => {
        appwriteService.deletePost(post.$id).then((status) => {
            if (status) {
                appwriteService.deleteFile(post.featuredImage);
                navigate("/");
            }
        });
    };

    return post ? (
        <div className="py-8 mx-auto">
            <Container>
                <div className="mb-4 w-full">
                    <h1 className="text-5xl text-black font-bold text-center">{post.title}</h1>
                </div>
                <div className="h-auto w-3/4 mb-4 p-2 block mx-auto">
                    <img
                        src={appwriteService.getFilePreview(post.image)}
                        alt={post.title}
                        className="rounded-xl h-full w-full"
                    />
                </div>
                    {/* {isAuthor && (
                        <div className="absolute right-6 top-6">
                            <Link to={`/edit-post/${post.$id}`}>
                                <Button className="mr-3 border-4 border-orange bg-orange hover:bg-white">
                                    Edit
                                </Button>
                            </Link>
                            <Button className="mr-3 border-4 border-orange bg-orange hover:bg-white">
                                Delete
                            </Button>
                        </div>
                    )} */}
                {/* </div> */}
                
                <div className="browser-css">
                    {parse(post.content)}
                    </div>
            </Container>
        </div>
    ) : null;
}
