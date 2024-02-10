// import React, { useState, useEffect } from 'react';


// function Posts() {
//   const [posts, setPosts] = useState<Post[]>([]);

//   useEffect(() => {
//     fetch('https://jsonplaceholder.typicode.com/posts')
//       .then(response => response.json())
//       .then(data => {
//         const modifiedData = data.map((item: Post) => ({
//           ...item,
//           wordCount: item.body.split(/\s+/).length // Calculate word count
//         }));
//         setPosts(modifiedData);
//       });
//   }, []);

//   return (
//     <div>
//       <h1>Posts</h1>
//       <ul>
//         {posts.map(post => (
//           <li key={post.id}>
//             <strong>User ID:</strong> {post.userId}<br />
//             <strong>ID:</strong> {post.id}<br />
//             <strong>Title:</strong> {post.title}<br />
//             <strong>Body:</strong> {post.body}<br />
//             <strong>Word Count:</strong> {post.wordCount}<br />
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Posts;

import React, { useState, useEffect } from 'react';

type Post = {
  userId: number;
  id: number;
  title: string;
  body: string;
  wordCount: number; // Add wordCount property
};

const DEFAULT_PER_PAGE = 50;

function Posts() {
  const [searchTerm, setSearchTerm] = useState('');
  const [posts, setPosts] = useState<Post[]>([]); // Initialize with the correct type
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchPosts();
  }, [currentPage]);

  const fetchPosts = async () => {
    const response = await fetch(`http://jsonplaceholder.typicode.com/posts?_page=${currentPage}&_limit=${DEFAULT_PER_PAGE}`);
    const data = await response.json();
    setPosts(data);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  const handleDelete = (postId: number) => {
    fetch(`http://jsonplaceholder.typicode.com/posts/${postId}`, {
      method: 'DELETE',
    })
    .then(response => {
      if (response.ok) {
        setPosts(posts.filter(post => post.id !== postId));
      } else {
        console.error('Failed to delete post');
      }
    })
    .catch(error => {
      console.error('Error deleting post:', error);
    });
  };

  const filteredPosts = posts.filter(post =>
    post.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPages = Math.ceil(filteredPosts.length / DEFAULT_PER_PAGE);

  console.log('totalPages:', filteredPosts.length , DEFAULT_PER_PAGE);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const renderPosts = () => {
    const startIndex = (currentPage - 1) * DEFAULT_PER_PAGE;
    const endIndex = startIndex + DEFAULT_PER_PAGE;
    return filteredPosts.slice(startIndex, endIndex).map(post => (
      <li key={post.id} className="border border-gray-300 rounded p-4 mb-4">
        <strong>User ID:</strong> {post.userId}<br />
        <strong>ID:</strong> {post.id}<br />
        <strong>Title:</strong> {post.title}<br />
        <strong>Body:</strong> {post.body}<br />
        <button
          onClick={() => handleDelete(post.id)}
          className="bg-red-500 text-white px-4 py-2 rounded mt-2"
        >
          Delete
        </button>
      </li>
    ));
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Posts</h1>
      <input
        type="text"
        placeholder="Search by keyword"
        value={searchTerm}
        onChange={handleSearch}
        className="border border-gray-300 text-black rounded px-4 py-2 mb-4"
      />
      <p className="mb-2">Page {currentPage} of {totalPages}</p>
      <ul>
        {renderPosts()}
      </ul>
      <div>
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className="bg-blue-500 text-white px-4 py-2 rounded mr-2"
        >
          Previous
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Posts;
