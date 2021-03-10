import React from 'react';

export default function Post({ username, body, styling }) {
  console.log(styling);
  return (
    <div className={`Post ${styling}`}>
      <h4>{username}</h4>
      <p>{body}</p>
    </div>
  );
}
