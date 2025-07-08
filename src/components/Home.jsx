import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import "../components/Home.css"

const Home = () => {
  const navigate = useNavigate();
  const [newsPosts, setNewsPosts] = useState([]);
  const [smallPosts, setSmallPosts] = useState([]);
  const [latestNews, setLatestNews] = useState([]);
  const [postContainerNews, setPostContainerNews] = useState([]);

  useEffect(() => {
    // Fetch all articles for main/latest news
    axios.get('http://localhost:3000/news')
      .then(res => setNewsPosts(res.data))
      .catch(err => console.error('Error fetching news:', err));

    // Fetch smallposts category articles
    axios.get('http://localhost:3000/news/category/smallposts')
      .then(res => setSmallPosts(res.data))
      .catch(err => console.error('Error fetching smallposts:', err));
    // Fetch LatestNews category articles
    axios.get('http://localhost:3000/news/category/LatestNews')
      .then(res => setLatestNews(res.data))
      .catch(err => console.error('Error fetching latest news:', err));
    // Fetch PostContainerNews category articles
    axios.get('http://localhost:3000/news/category/PostContainerNews')
      .then(res => setPostContainerNews(res.data))
      .catch(err => console.error('Error fetching PostContainerNews:', err));
  }, []);

  const handlePostClick = (postId) => {
    navigate(`/post/${postId}`);
  };

  // Use the first PostContainerNews article as the main post
  const mainPost = postContainerNews[0];

  return (
    
    <div className='main-container'>
      <div className='left-section'>
        
        <div className='post-container clickable-post' onClick={() => mainPost && handlePostClick(mainPost._id)}>
          {mainPost ? (
            <>
              <h2>{mainPost.title}</h2>
              <div className='imagecontainer'>
                {mainPost.image ? (
                  <img src={mainPost.image} alt='IMAGE' className='imageofpost' />
                ) : (
                  <div className='image-placeholder'>No image</div>
                )}
              </div>
              {/* <p>{mainPost.content}</p> */}
            </>
          ) : (
            <p>No PostContainerNews found.</p>
          )}
        </div>

        <div className='small-posts-section'>
          {smallPosts.length === 0 ? (
            <p>No small posts found.</p>
          ) : (
            smallPosts.map(post => (
              <div key={post._id} className='small-posts clickable-post' onClick={() => handlePostClick(post._id)}>
                <div className='post-content'>
                  <h3>{post.title}</h3>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {/* PostContainerNews section
      <div className='post-container-news-section'>
        <h2>Post Container News</h2>
        <div className='post-container-news-content'>
          {postContainerNews.length === 0 ? (
            <p>No PostContainerNews found.</p>
          ) : (
            postContainerNews.map(({_id, title, content})=>(
              <div key={_id} className='latestnewsposts clickable-post' onClick={() => handlePostClick(_id)}>
                <h3>{title}</h3>
                <p>{content}</p>
              </div>
            ))
          )}
        </div>
      </div> */}

      {/* Latest news section */}
      <div className='latest-news-section'>
        <h2>Latest News</h2>
        <div className='latest-news-content'>
          {latestNews.length === 0 ? (
            <p>No latest news found.</p>
          ) : (
            latestNews.map(({_id, title, content})=>(
              <div key={_id} className='latestnewsposts clickable-post' onClick={() => handlePostClick(_id)}>
                <h3>{title}</h3>
                <p>{content}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Home; 