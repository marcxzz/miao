'use client';

import { useEffect, useState } from 'react';

export default function Page() {
  const [comments, setComments] = useState([]);
  const [comment, setComment] = useState('');

  async function handleSubmit(e) {
    e.preventDefault();

    await fetch('/api/comments', {
      method: 'POST',
      body: JSON.stringify({ comment }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    setComment('');
    fetchComments();
  }

  async function fetchComments() {
    const res = await fetch('/api/comments');
    const data = await res.json();
    console.log('DEBUG - fetch response:', data); // 👈 AGGIUNTA
    setComments(data);
  }

  useEffect(() => {
    fetchComments();
  }, []);

  return (
    <>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto mt-8">
        <div className="mb-5">
          <label htmlFor="comment" className="block mb-2 text-sm font-medium text-gray-900">Comment</label>
          <input
            type="text"
            id="comment"
            name="comment"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Write a comment"
            required
            className="bg-gray-50 border border-gray-300 text-sm rounded-lg block w-full p-2.5"
          />
        </div>
        <button type="submit" className="bg-blue-700 text-white px-4 py-2 rounded-lg">
          Submit
        </button>
      </form>

      <table className="mt-10 mx-auto border">
        <thead>
          <tr>
            <th className="border border-gray-300 px-4 py-2">ID</th>
            <th className="border border-gray-300 px-4 py-2">Comment</th>
          </tr>
        </thead>
        <tbody>
          {Array.isArray(comments) ? (
            comments.map((comm) => (
              <tr key={comm.id}>
                <td className="border border-gray-300 px-4 py-2">{comm.id}</td>
                <td className="border border-gray-300 px-4 py-2">{comm.comment}</td>
              </tr>
            ))
          ) : (
            <tr><td>Error</td></tr>
          )}
        </tbody>
      </table>
    </>
  );
}
