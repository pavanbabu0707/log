import { useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Header, BackgroundEffects } from './components';
import { Feed, Following, Discover, AuthorityProfile } from './pages';

export default function App() {
  // Global state
  const [searchQuery, setSearchQuery] = useState('');
  const [likedPosts, setLikedPosts] = useState(new Set());
  const [following, setFollowing] = useState(new Set([1, 2])); // Start with some followed

  // Handle like/unlike
  const handleLike = (postId) => {
    setLikedPosts(prev => {
      const newSet = new Set(prev);
      if (newSet.has(postId)) {
        newSet.delete(postId);
      } else {
        newSet.add(postId);
      }
      return newSet;
    });
  };

  // Handle follow/unfollow
  const handleFollow = (authorityId) => {
    setFollowing(prev => {
      const newSet = new Set(prev);
      if (newSet.has(authorityId)) {
        newSet.delete(authorityId);
      } else {
        newSet.add(authorityId);
      }
      return newSet;
    });
  };

  return (
    <div className="min-h-screen bg-dark-950 text-white">
      {/* Background ambient effects */}
      <BackgroundEffects />

      {/* Header */}
      <Header 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />

      {/* Routes */}
      <Routes>
        <Route 
          path="/" 
          element={
            <Feed 
              likedPosts={likedPosts}
              onLike={handleLike}
              following={following}
              onFollow={handleFollow}
            />
          } 
        />
        <Route 
          path="/following" 
          element={
            <Following 
              likedPosts={likedPosts}
              onLike={handleLike}
              following={following}
              onFollow={handleFollow}
            />
          } 
        />
        <Route 
          path="/discover" 
          element={
            <Discover 
              following={following}
              onFollow={handleFollow}
              searchQuery={searchQuery}
            />
          } 
        />
        <Route 
          path="/authority/:handle" 
          element={
            <AuthorityProfile 
              likedPosts={likedPosts}
              onLike={handleLike}
              following={following}
              onFollow={handleFollow}
            />
          } 
        />
      </Routes>
    </div>
  );
}
