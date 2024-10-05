import React from 'react';

function UserInfo({ user }) {
  if (!user) return null;

  return (
    <div style={{ position: 'absolute', top: 10, right: 10 }}>
      <span>{user.name}</span>
    </div>
  );
}

export default UserInfo