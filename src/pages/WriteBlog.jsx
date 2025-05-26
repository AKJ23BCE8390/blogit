import React, { useState } from 'react';
import '../styles/writeBlog.css';

import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

import { db, storage } from '../firebaseconfig';  // Make sure your firebaseconfig exports storage too

function WriteBlog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [tags, setTags] = useState('');
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content) {
      alert('Please fill out the required fields!');
      return;
    }

    setLoading(true);

    try {
      let imageUrl = null;

      if (image) {
        // Create a storage reference
        const imageRef = ref(storage, `blog-images/${Date.now()}_${image.name}`);
        // Upload image
        await uploadBytes(imageRef, image);
        // Get downloadable URL
        imageUrl = await getDownloadURL(imageRef);
      }

      // Prepare blog data
      const blogData = {
        title,
        content,
        tags: tags
          .split(',')
          .map((tag) => tag.trim())
          .filter((tag) => tag.length > 0),
        imageUrl,
        createdAt: serverTimestamp(),
      };

      // Save blog data to Firestore
      await addDoc(collection(db, 'blog'), blogData);

      alert('Blog submitted successfully!');

      // Reset form
      setTitle('');
      setContent('');
      setTags('');
      setImage(null);
    } catch (error) {
      console.error('Error submitting blog:', error);
      alert('Failed to submit blog.');
    }

    setLoading(false);
  };

  return (
    <div className="write-blog-page">
      <h2 className="write-blog-heading">📝 Write a New Blog</h2>
      <form className="blog-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Blog Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          disabled={loading}
        />

        <textarea
          placeholder="Write your blog content here..."
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={10}
          disabled={loading}
        />

        <input
          type="text"
          placeholder="Tags (comma separated)"
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          disabled={loading}
        />

        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
          disabled={loading}
        />

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Publishing...' : 'Publish Blog'}
        </button>
      </form>
    </div>
  );
}

export default WriteBlog;
