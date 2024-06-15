import React from 'react'
import HeadPost from '../../components/post/posts/HeadPost'
import PostContainer from '../../components/post/container/PostContainer'
import Post from '../../components/post/posts/Post'
import HeadText from '../../components/head-text/HeadText'
import { useLoaderData, useRouteLoaderData } from 'react-router'

const Home = () => {

  let posts = useLoaderData();

  return (
    <>
    <div className="w-[96%] 600:w-[90%] mx-auto flex flex-col gap-[40px] mt-[50px]">
    <HeadText text={"Leatest Blog You shouldn't missed"}/>
    <HeadPost post={posts[0]}/>
    </div>
    <div className="mt-[100px]"></div>
<PostContainer>
{
  posts.sort((a,b) => a - b).map((post,index) => <Post key={index} post={post}/>)
}
</PostContainer>
    </>
  )
}

export default Home

export const homeLoader = async () => {
  let res = await fetch(
    `http://localhost:8080/posts`,
  )
 if(res.status === 503){
    throw json({message : "No Internet Connection!"} , {status : 503})
  }

  if(!res.ok) {
  throw json({message : 'Something gone wrong!'} , {status : 500})
  }
  let data = await res.json();
  return data.posts;
}
