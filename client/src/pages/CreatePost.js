import React, { useState } from 'react';
import { Navigate } from 'react-router-dom';
import Editor from './Editor'; // Assuming you already have this
import 'react-quill/dist/quill.snow.css';

const Createpost = () => {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [file, setFile] = useState(null);
  const [redirect, setRedirect] = useState(false);

  async function create(e) {
    e.preventDefault();

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', file); // pass the File object directly

    const response = await fetch('http://localhost:4000/post', {
      method: 'POST',
      body: data,
      credentials: 'include',
    });

    if (response.ok) {
      setRedirect(true);
    } else {
      alert('Failed to create post');
    }
  }

  if (redirect) {
    return <Navigate to="/" />;
  }

  return (
    <div>
      <form onSubmit={create}>
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Summary"
          value={summary}
          onChange={(e) => setSummary(e.target.value)}
          required
        />
        <input
          type="file"
          onChange={(e) => setFile(e.target.files[0])}
          required
        />
        <Editor value={content} onChange={setContent} />
        <button className="mt-6">Create Post</button>
      </form>
    </div>
  );
};

export default Createpost;
