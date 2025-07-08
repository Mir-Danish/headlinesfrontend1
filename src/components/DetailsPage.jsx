import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './DetailsPage.css';

const DetailsPage = () => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios.get(`http://localhost:3000/news/${postId}`)
      .then(res => {
        setPost(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        setPost(null);
      });
  }, [postId]);

  if (loading) return <div className="details-page"><p>Loading...</p></div>;
  if (!post) return <div className="details-page"><p>Post not found.</p></div>;


  console.log('Loaded post:', post);
  console.log('Rendered content:', post.content);
  return (
    <div className="details-page">
      <div className="details-container">
        {/* <button className="back-button" onClick={() => navigate('/')}>
          ← Back to Home
        </button> */}
        
        <div className="post-header">
          <div className="post-meta">
            <span className="category">{post.category}</span>
            <span className="date">{post.date}</span>
            <span className="author">{post.author}</span>
          </div>
          <h1 className="post-title">{post.title}</h1>
          
        </div>

        <div className="post-image-container">
          <img src={post.image} alt={post.title} className="post-image" />
        </div>

        <div className="post-content">
          {post.content.split('\n').map((line, idx) => (
            <React.Fragment key={idx}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>

        {/* <div className="post-footer">
          <div className="share-buttons">
            <button className="share-btn">Share on Facebook</button>
            <button className="share-btn">Share on Twitter</button>
         
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default DetailsPage;