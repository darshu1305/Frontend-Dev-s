import { useState } from 'react';
import { Card, CardContent, Button, Avatar, IconButton, TextField, InputAdornment } from '@mui/material';
import { 
  FavoriteBorder, 
  Favorite,
  ChatBubbleOutline, 
  Share, 
  MoreVert,
  Add,
  Search,
  TrendingUp,
  EmojiEmotions
} from '@mui/icons-material';

export default function Feed() {
  const [searchQuery, setSearchQuery] = useState('');
  const [newPost, setNewPost] = useState('');

  // Mock feed data
  const posts = [
    {
      id: 1,
      author: {
        name: 'Sarah Chen',
        avatar: '👩‍💼',
        role: 'UI/UX Designer',
        verified: true
      },
      content: 'Just completed an amazing project for a fintech startup! The challenge was creating an intuitive dashboard for complex financial data. Here\'s what I learned... 🚀',
      image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmaW50ZWNoJTIwZGFzaGJvYXJkfGVufDF8fHx8MTc1NjIwMzI1OXww&ixlib=rb-4.1.0&q=80&w=1080',
      timestamp: '2 hours ago',
      likes: 24,
      comments: 8,
      shares: 3,
      liked: false,
      trending: true
    },
    {
      id: 2,
      author: {
        name: 'Rajesh Kumar',
        avatar: '👨‍💻',
        role: 'Full Stack Developer',
        verified: false
      },
      content: 'Sharing my experience with the latest React 19 features. The new concurrent rendering is a game-changer for performance! Who else is excited about these updates? #React #WebDev',
      timestamp: '4 hours ago',
      likes: 156,
      comments: 32,
      shares: 18,
      liked: true,
      trending: false
    },
    {
      id: 3,
      author: {
        name: 'Priya Sharma',
        avatar: '👩‍🎨',
        role: 'Graphic Designer',
        verified: true
      },
      content: 'Color psychology in branding is fascinating! Here\'s a quick guide on how different colors can impact your brand perception and user emotions. What\'s your favorite brand color combo?',
      image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2xvcjIwcGFsZXR0ZXxlbnwxfHx8fDE3NTYyMDMyNTl8MA&ixlib=rb-4.1.0&q=80&w=1080',
      timestamp: '1 day ago',
      likes: 89,
      comments: 15,
      shares: 7,
      liked: false,
      trending: false
    }
  ];

  const trendingTopics = [
    { tag: '#ReactJS', posts: '2.4k' },
    { tag: '#WebDesign', posts: '1.8k' },
    { tag: '#Freelancing', posts: '3.1k' },
    { tag: '#StartupLife', posts: '956' },
    { tag: '#AI', posts: '4.2k' }
  ];

  const toggleLike = (postId: number) => {
    // Implementation for like functionality would go here
    console.log('Toggled like for post:', postId);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Sidebar - Trending */}
        <div className="lg:col-span-1 space-y-6">
          
          {/* Trending Topics */}
          <Card className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-lg animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="h-5 w-5 text-orange-500" />
                <h3 className="text-lg text-gray-800">Trending</h3>
              </div>
              <div className="space-y-3">
                {trendingTopics.map((topic) => (
                  <div key={topic.tag} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded-lg cursor-pointer transition-colors">
                    <span className="text-blue-600 hover:text-blue-700">{topic.tag}</span>
                    <span className="text-xs text-gray-500">{topic.posts}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <Card className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-lg animate-slide-up delay-200">
            <CardContent className="p-6">
              <h3 className="text-lg text-gray-800 mb-4">Your Activity</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Posts this week</span>
                  <span className="text-gray-800">5</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Likes received</span>
                  <span className="text-gray-800">127</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Comments</span>
                  <span className="text-gray-800">43</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Profile views</span>
                  <span className="text-gray-800">89</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Main Feed */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Header */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-8 animate-scale-in">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
              <div>
                <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
                  Community Feed 📱
                </h1>
                <p className="text-gray-600">
                  Stay connected with the BHARATGIG community.
                </p>
              </div>
              
              {/* Search */}
              <div className="flex-1 max-w-md">
                <TextField
                  fullWidth
                  placeholder="Search posts..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Search className="text-gray-400" />
                      </InputAdornment>
                    ),
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f9fafb',
                      '&:hover .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#d1d5db',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#3b82f6',
                      },
                    },
                  }}
                />
              </div>
            </div>
          </div>

          {/* Create Post */}
          <Card className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-lg animate-slide-up">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <Avatar sx={{ width: 48, height: 48, backgroundColor: '#3b82f6' }}>
                  👤
                </Avatar>
                <div className="flex-1">
                  <TextField
                    fullWidth
                    multiline
                    rows={3}
                    placeholder="What's on your mind? Share your thoughts with the community..."
                    value={newPost}
                    onChange={(e) => setNewPost(e.target.value)}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        borderRadius: '12px',
                        backgroundColor: '#f9fafb',
                        '&:hover .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#d1d5db',
                        },
                        '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                          borderColor: '#3b82f6',
                        },
                      },
                    }}
                  />
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center gap-2">
                      <IconButton size="small" sx={{ color: '#6b7280' }}>
                        📷
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#6b7280' }}>
                        📎
                      </IconButton>
                      <IconButton size="small" sx={{ color: '#6b7280' }}>
                        <EmojiEmotions />
                      </IconButton>
                    </div>
                    <Button
                      variant="contained"
                      startIcon={<Add />}
                      disabled={!newPost.trim()}
                      sx={{
                        borderRadius: '10px',
                        textTransform: 'none',
                        background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                        '&:hover': {
                          background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        },
                        '&:disabled': {
                          background: '#e5e7eb',
                          color: '#9ca3af'
                        }
                      }}
                    >
                      Post
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Posts */}
          <div className="space-y-6">
            {posts.map((post, index) => (
              <Card 
                key={post.id}
                className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
                style={{ animationDelay: `${(index + 2) * 0.1}s` }}
              >
                <CardContent className="p-6">
                  
                  {/* Post Header */}
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <Avatar sx={{ width: 48, height: 48, backgroundColor: '#3b82f6' }}>
                        {post.author.avatar}
                      </Avatar>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-gray-800">{post.author.name}</h4>
                          {post.author.verified && (
                            <div className="w-4 h-4 bg-blue-500 rounded-full flex items-center justify-center">
                              <span className="text-white text-xs">✓</span>
                            </div>
                          )}
                          {post.trending && (
                            <span className="text-xs bg-orange-100 text-orange-600 px-2 py-1 rounded-full">
                              🔥 Trending
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600">{post.author.role}</p>
                        <p className="text-xs text-gray-500">{post.timestamp}</p>
                      </div>
                    </div>
                    <IconButton size="small" sx={{ color: '#6b7280' }}>
                      <MoreVert />
                    </IconButton>
                  </div>

                  {/* Post Content */}
                  <div className="mb-4">
                    <p className="text-gray-700 mb-3">{post.content}</p>
                    {post.image && (
                      <div className="rounded-xl overflow-hidden">
                        <img
                          src={post.image}
                          alt="Post content"
                          className="w-full h-64 object-cover"
                        />
                      </div>
                    )}
                  </div>

                  {/* Post Actions */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="flex items-center gap-6">
                      
                      {/* Like */}
                      <button
                        onClick={() => toggleLike(post.id)}
                        className="flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors"
                      >
                        {post.liked ? (
                          <Favorite className="h-5 w-5 text-red-500" />
                        ) : (
                          <FavoriteBorder className="h-5 w-5" />
                        )}
                        <span className="text-sm">{post.likes}</span>
                      </button>

                      {/* Comment */}
                      <button className="flex items-center gap-2 text-gray-600 hover:text-blue-500 transition-colors">
                        <ChatBubbleOutline className="h-5 w-5" />
                        <span className="text-sm">{post.comments}</span>
                      </button>

                      {/* Share */}
                      <button className="flex items-center gap-2 text-gray-600 hover:text-green-500 transition-colors">
                        <Share className="h-5 w-5" />
                        <span className="text-sm">{post.shares}</span>
                      </button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Load More */}
          <div className="text-center animate-fade-in">
            <Button
              variant="outlined"
              size="large"
              sx={{
                borderRadius: '12px',
                padding: '12px 32px',
                borderColor: '#e5e7eb',
                backgroundColor: '#f9fafb',
                color: '#374151',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#d1d5db',
                  backgroundColor: '#f3f4f6'
                }
              }}
            >
              Load More Posts
            </Button>
          </div>
        </div>
      </div>

      <style >{`
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}