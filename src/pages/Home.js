import React, { useEffect, useState } from 'react';
import axios from 'axios';

export default function Home() {
    const [posts, setPosts] = useState([]);
    const [editPost, setEditPost] = useState(null);
    const [showEditAlert, setShowEditAlert] = useState(false);
    const [showDeleteAlert, setShowDeleteAlert] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const deletePost = (postId) => {
        axios.delete(`http://127.0.0.1:8000/api/posts/${postId}`)
            .then((response) => {
                console.log(response.data);
                fetchPosts();
                setShowDeleteAlert(true);
                setTimeout(() => setShowDeleteAlert(false), 2000);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const handleEdit = (post) => {
        setEditPost(post);
    };

    const updatePost = () => {
        axios.put(`http://127.0.0.1:8000/api/posts/${editPost.id}`, editPost)
            .then((response) => {
                console.log(response.data);
                setEditPost(null);
                fetchPosts();
                setShowEditAlert(true);
                setTimeout(() => setShowEditAlert(false), 2000);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    const fetchPosts = () => {
        axios.get('http://127.0.0.1:8000/api/posts')
            .then((response) => {
                const postsData = response.data.posts;
                setPosts(postsData);
            })
            .catch((error) => {
                console.error(error);
            });
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Published Posts</h2>
            {showEditAlert && (
                <div className="alert alert-success" role="alert">
                    Post successfully edited!
                </div>
            )}
            {showDeleteAlert && (
                <div className="alert alert-success" role="alert">
                    Post successfully deleted!
                </div>
            )}
            
            <table className="table table-striped">
                <thead>
                    <tr>
                        <th scope="col">Title</th>
                        <th scope="col">Content</th>
                        <th scope="col">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{post.title}</td>
                            <td style={{ fontFamily: 'Arial, sans-serif', fontSize: '16px' }}>{post.content}</td>
                            <td>
                                <button className="btn btn-warning me-2" onClick={() => handleEdit(post)}>Edit</button>
                                <button className="btn btn-danger" onClick={() => deletePost(post.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {editPost && (
                <div>
                    <h4>Edit Post</h4>
                    <input
                        type="text"
                        className="form-control"
                        value={editPost.title}
                        onChange={(e) => setEditPost({ ...editPost, title: e.target.value })}
                    />
                    <input
                        type="text"
                        className="form-control"
                        value={editPost.content}
                        onChange={(e) => setEditPost({ ...editPost, content: e.target.value })}
                    />
                    <button className="btn btn-primary" onClick={updatePost}>Update</button>
                </div>
            )}
        </div>
    );
}