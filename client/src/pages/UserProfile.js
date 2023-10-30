import React from 'react';
import './css/ProfilePage.css'; // Import your custom CSS for styling
import { useSelector } from 'react-redux';

function UserProfile() {
  const user = {
    name: 'John Doe',
    email: 'john.doe@example.com',
    profilePicture: 'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_1280.png', // Replace with the actual image URL
    bio: "I'm a web developer and designer. I love creating amazing web applications.",
  };

  const userData = useSelector(state => state?.auth?.user)
  return (
    <div className="profile-container mt-5">
      <div className="profile-header">
        <div className="profile-picture">
          <img src={user.profilePicture} alt={user.name} />
        </div>
        <div className="user-info">
          <h1>{userData?.username}</h1>
          <p>{user.email}</p>
        </div>
      </div>
      <div className="profile-bio">
        <p>{user.bio}</p>
      </div>
      {/* You can add more sections or components for additional profile details */}
    </div>
  );
}

export default UserProfile;
