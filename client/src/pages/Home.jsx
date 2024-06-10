import React from 'react'
import BottomBar from '../components/Bottombar';
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';
import PostCard from '../components/PostCard';

import { useGetPostsQuery } from '../redux/posts/postApi';


function Home() {
  const {currentUser} = useSelector((state)=> state.user);
  const { data: posts, error, isLoading } = useGetPostsQuery();

  return (
    <div className=" overflow-x-hidden flex flex-col items-center min-h-screen bg-white mb-[120px]">
    <Navbar/>
      <div className="mt-4 flex flex-col w-full md:w-1/2 items-center">
      {/*<h1 className="text-2xl md:text-4xl font-bold mb-4">Home</h1>*/}

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

      {posts ? (
        posts.map((post, index) => (
          <PostCard
          key={index}
          text={post.text}
          section={post.section}
          gender={post.gender}
          profilePicture={post.profilePicture}
          postImage={post.postImage}
          time={new Date(post.createdAt).toLocaleString()}
          />
        ))
      ) : (
        isLoading ?
        <div>Loading...</div>
        : <div>No Posts</div>
      )}

      </div>
      {error && <div className="text-red-500">Error: {error.data.message}</div>}
      <BottomBar/>
    </div>
  )
}

export default Home
