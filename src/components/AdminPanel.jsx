import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ADMIN_USERNAME = 'admin2g';
const ADMIN_PASSWORD = 'spooky@hell';

const AdminPanel = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [form, setForm] = useState({
    title: '',
    content: '',
    image: '',
    author: '',
    date: '',
    category: ''
  });
  const [message, setMessage] = useState('');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isLoggedIn) fetchArticles();
  }, [isLoggedIn]);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const res = await axios.get('http://localhost:3000/news');
      setArticles(res.data);
    } catch (err) {
      setMessage('Error fetching articles.');
    }
    setLoading(false);
  };

  const handleLoginChange = e => {
    setLoginForm({ ...loginForm, [e.target.name]: e.target.value });
  };

  const handleLogin = e => {
    e.preventDefault();
    if (
      loginForm.username === ADMIN_USERNAME &&
      loginForm.password === ADMIN_PASSWORD
    ) {
      setIsLoggedIn(true);
      setMessage('');
    } else {
      setMessage('Invalid credentials');
    }
  };

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:3000/addnews', form);
      setMessage('News article added successfully!');
      setForm({ title: '', content: '', image: '', author: '', date: '', category: '' });
      fetchArticles();
    } catch (err) {
      setMessage('Error adding news article.');
    }
  };

  const handleDelete = async id => {
    if (!window.confirm('Are you sure you want to delete this article?')) return;
    try {
      await axios.delete(`http://localhost:3000/news/${id}`);
      setMessage('Article deleted.');
      fetchArticles();
    } catch (err) {
      setMessage('Error deleting article.');
    }
  };

  if (!isLoggedIn) {
    return (
      <div style={{ maxWidth: 400, margin: '40px auto', padding: 20, border: '1px solid #ccc', borderRadius: 8 }}>
        <h2>Admin Login</h2>
        <form onSubmit={handleLogin}>
          <input name="username" value={loginForm.username} onChange={handleLoginChange} placeholder="Username" required style={{ width: '100%', marginBottom: 10 }} />
          <input name="password" type="password" value={loginForm.password} onChange={handleLoginChange} placeholder="Password" required style={{ width: '100%', marginBottom: 10 }} />
          <button type="submit" style={{ width: '100%' }}>Login</button>
        </form>
        {message && <p style={{ color: 'red' }}>{message}</p>}
      </div>
    );
  }

  return (
    <div style={{ maxWidth: 700, margin: '40px auto', padding: 20 }}>
      <h2>Add News Article</h2>
      <form onSubmit={handleSubmit} style={{ marginBottom: 30 }}>
        <input name="title" value={form.title} onChange={handleChange} placeholder="Title" required style={{ width: '100%', marginBottom: 10 }} />
        <textarea name="content" value={form.content} onChange={handleChange} placeholder="Content" required style={{ width: '100%', marginBottom: 10 }} />
        <input name="image" value={form.image} onChange={handleChange} placeholder="Image URL" style={{ width: '100%', marginBottom: 10 }} />
        <input name="author" value={form.author} onChange={handleChange} placeholder="Author" style={{ width: '100%', marginBottom: 10 }} />
        <input name="date" value={form.date} onChange={handleChange} placeholder="Date" type="date" style={{ width: '100%', marginBottom: 10 }} />
        <input name="category" value={form.category} onChange={handleChange} placeholder="Category" required style={{ width: '100%', marginBottom: 10 }} />
        <button type="submit" style={{ width: '100%' }}>Add News</button>
      </form>
      {message && <p>{message}</p>}
      <h2>All News Articles</h2>
      {loading ? <p>Loading...</p> : (
        <ul style={{ listStyle: 'none', padding: 0 }}>
          {articles.map(article => (
            <li key={article._id} style={{ border: '1px solid #eee', borderRadius: 6, marginBottom: 10, padding: 10 }}>
              <strong>{article.title}</strong> <br />
              <small>Category: {article.category}</small>
              <button onClick={() => handleDelete(article._id)} style={{ float: 'right', color: 'white', background: 'red', border: 'none', borderRadius: 4, padding: '4px 10px', cursor: 'pointer' }}>Delete</button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AdminPanel;