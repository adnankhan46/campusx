import React, { useEffect } from 'react';
import PostCard from '../components/PostCard';
import Navbar from '../components/Navbar';
import BottomBar from '../components/Bottombar';
// import Comment from '../components/Comment';
import CommentSection from '../components/CommentSection';
import { useGetSinglePostQuery } from '../redux/posts/postApi';
import { useParams } from 'react-router-dom';


const PostPage = () => {
  const {postId} = useParams();
  // console.log(postId);
  const { data: post, error, isLoading } = useGetSinglePostQuery(postId);
  // Scroll to the top of the page when the component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <div className="flex flex-col items-center min-h-screen bg-slate-300 mb-[120px]">
    <Navbar/>
    
    <div className='mt-4 flex flex-col w-full md:w-1/2 items-center'>
    {(isLoading) &&
      <PostCard
      key={"Loading"}
      text={"Loading"}
      section={"Loading"}
      gender={"Loading"}
      profilePicture={"Loading"}
      postImage={"Loading"}
      time={"Loading"}
      />}

    {post ? <PostCard
   
          text={post.post.text}
          section={post.post.section}
          gender={post.post.gender}
          profilePicture={post.post.profilePicture}
          postImage={post.post.postImage}
          time={new Date(post.post.createdAt).toLocaleString()}
          postId={post.post.postId}
          postUser={post.post.user}
    /> :  (
      isLoading ?
      <div>Loading...</div>
      : <div>No Posts</div>)}
    <h1 className="text-xl md:text-4xl font-bold my-4">Comments</h1>
    {/* <Comment/> */}
    <CommentSection/>
    </div>
    {error && <div className="text-red-500">Error: {error.data.message}</div>}
    <BottomBar/>
    </div>
    
  )  
};

  

export default PostPage;

