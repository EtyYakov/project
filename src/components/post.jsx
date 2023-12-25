import React, {useEffect, useState } from 'react';
import { Sidebar } from 'primereact/sidebar';
import { Button } from 'primereact/button';
import axios from 'axios';
import CreatePost from './createPost';

export default function Post(props) {
    const [visible, setVisible] = useState(true);
    const [post,setPost]=useState([])
    const [createPost,setCreatePost]=useState(false)
    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${props.user.id}`)
            .then(response => setPost(response.data))
            .catch(error => console.error('Error fetching posts:', error));
    },[props.user.id]);




    return (
        <div className="card flex justify-content-center">
            <Sidebar  position="right" visible={visible} onHide={() => setVisible(false)} className="w-full md:w-20rem lg:w-30rem"
            style={{backgroundColor: '#8DAFF2', color: 'white', padding: '20px'}}> 
                <h2>{props.user.name}</h2>

                {post.map((p)=><><h5>*****</h5><h5>{p.title}</h5><h6>{p.body}</h6></>)}

                <Button onClick={()=>{setCreatePost(true)}}>create more post</Button>
                {createPost?<CreatePost user={props.user} post={post} setPost={setPost} visible1={true} setCreatePost={setCreatePost}></CreatePost>:<></>}
            </Sidebar>
        </div>
    )
}