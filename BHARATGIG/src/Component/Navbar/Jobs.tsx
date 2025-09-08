import { useState } from 'react';
import { Card, CardContent, Button, Chip, TextField, InputAdornment } from '@mui/material';
import { 
  Search, 
  FilterList, 
  AccessTime, 
  AttachMoney, 
  LocationOn,
  BookmarkBorder,
  Star,
  ArrowForward
} from '@mui/icons-material';

export default function Jobs() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('All');

  // Mock job data
  const jobs = [
    {
      id: 1,
      title: 'Full Stack Web Developer',
      company: 'TechStartup Inc.',
      location: 'Remote',
      budget: '₹50,000 - ₹80,000',
      duration: '3 months',
      skills: ['React', 'Node.js', 'MongoDB'],
      postedTime: '2 hours ago',
      applicants: 8,
      rating: 4.8,
      description: 'Looking for an experienced full stack developer to build a modern web application...',
      urgent: true
    },
    {
      id: 2,
      title: 'UI/UX Designer for Mobile App',
      company: 'Creative Solutions',
      location: 'Mumbai, India',
      budget: '₹35,000 - ₹50,000',
      duration: '2 months',
      skills: ['Figma', 'Adobe XD', 'Prototyping'],
      postedTime: '5 hours ago',
      applicants: 15,
      rating: 4.6,
      description: 'We need a talented UI/UX designer to create an intuitive mobile app interface...',
      urgent: false
    },
    {
      id: 3,
      title: 'Content Writer & SEO Specialist',
      company: 'Digital Marketing Co.',
      location: 'Bangalore, India',
      budget: '₹25,000 - ₹40,000',
      duration: '1 month',
      skills: ['Content Writing', 'SEO', 'WordPress'],
      postedTime: '1 day ago',
      applicants: 23,
      rating: 4.5,
      description: 'Seeking a skilled content writer with SEO expertise for our digital marketing campaigns...',
      urgent: false
    }
  ];

  const filters = ['All', 'Web Development', 'Design', 'Writing', 'Marketing'];

  return (
    <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
      
      {/* Header Section */}
      <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-8 animate-scale-in">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div>
            <h1 className="text-3xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent mb-2">
              Available Jobs 💼
            </h1>
            <p className="text-gray-600">
              Discover exciting opportunities that match your skills and interests.
            </p>
          </div>
          
          {/* Search Bar */}
          <div className="flex-1 max-w-md">
            <TextField
              fullWidth
              placeholder="Search jobs..."
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

      {/* Filters */}
      <div className="bg-white/95 backdrop-blur-lg rounded-2xl shadow-lg border border-white/50 p-6 animate-slide-up">
        <div className="flex flex-wrap items-center gap-3">
          <FilterList className="text-gray-600" />
          <span className="text-gray-700 mr-2">Filter by:</span>
          {filters.map((filter) => (
            <Button
              key={filter}
              variant={selectedFilter === filter ? "contained" : "outlined"}
              onClick={() => setSelectedFilter(filter)}
              sx={{
                borderRadius: '20px',
                textTransform: 'none',
                ...(selectedFilter === filter ? {
                  background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                  boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                } : {
                  borderColor: '#e5e7eb',
                  color: '#374151',
                  '&:hover': {
                    borderColor: '#d1d5db',
                    backgroundColor: '#f3f4f6'
                  }
                })
              }}
            >
              {filter}
            </Button>
          ))}
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-lg animate-slide-up delay-200">
          <CardContent className="p-6 text-center">
            <div className="text-2xl text-blue-600 mb-2">156</div>
            <div className="text-gray-600">Total Jobs</div>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-lg animate-slide-up delay-300">
          <CardContent className="p-6 text-center">
            <div className="text-2xl text-green-600 mb-2">42</div>
            <div className="text-gray-600">New This Week</div>
          </CardContent>
        </Card>
        <Card className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-lg animate-slide-up delay-400">
          <CardContent className="p-6 text-center">
            <div className="text-2xl text-purple-600 mb-2">12</div>
            <div className="text-gray-600">Applied Jobs</div>
          </CardContent>
        </Card>
      </div>

      {/* Job Listings */}
      <div className="space-y-6">
        {jobs.map((job, index) => (
          <Card 
            key={job.id}
            className="bg-white/95 backdrop-blur-lg border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 animate-slide-up"
            style={{ animationDelay: `${(index + 5) * 0.1}s` }}
          >
            <CardContent className="p-6">
              <div className="flex flex-col lg:flex-row lg:items-start justify-between gap-6">
                
                {/* Job Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <div className="flex items-center gap-2 mb-2">
                        <h3 className="text-xl text-gray-800">{job.title}</h3>
                        {job.urgent && (
                          <Chip 
                            label="Urgent" 
                            size="small" 
                            sx={{ 
                              backgroundColor: '#fee2e2', 
                              color: '#dc2626',
                              fontSize: '0.75rem',
                              height: '20px'
                            }} 
                          />
                        )}
                      </div>
                      <div className="flex items-center gap-4 text-sm text-gray-600 mb-2">
                        <span className="flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" />
                          {job.rating}
                        </span>
                        <span>{job.company}</span>
                        <span className="flex items-center gap-1">
                          <LocationOn className="h-4 w-4" />
                          {job.location}
                        </span>
                      </div>
                    </div>
                    <Button
                      variant="text"
                      sx={{ 
                        minWidth: 'auto', 
                        p: 1,
                        color: '#6b7280',
                        '&:hover': { backgroundColor: '#f3f4f6' }
                      }}
                    >
                      <BookmarkBorder className="h-5 w-5" />
                    </Button>
                  </div>

                  <p className="text-gray-600 mb-4">{job.description}</p>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {job.skills.map((skill) => (
                      <Chip
                        key={skill}
                        label={skill}
                        size="small"
                        sx={{
                          backgroundColor: '#dbeafe',
                          color: '#1d4ed8',
                          borderRadius: '6px',
                          fontSize: '0.75rem'
                        }}
                      />
                    ))}
                  </div>

                  {/* Job Details */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <AttachMoney className="h-4 w-4" />
                      {job.budget}
                    </span>
                    <span className="flex items-center gap-1">
                      <AccessTime className="h-4 w-4" />
                      {job.duration}
                    </span>
                    <span>{job.applicants} applicants</span>
                    <span>Posted {job.postedTime}</span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col gap-3 lg:w-48">
                  <Button
                    variant="contained"
                    endIcon={<ArrowForward />}
                    fullWidth
                    sx={{
                      borderRadius: '12px',
                      padding: '12px 24px',
                      background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                      textTransform: 'none',
                      boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                      '&:hover': {
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                        transform: 'translateY(-2px)',
                      }
                    }}
                  >
                    Apply Now
                  </Button>
                  <Button
                    variant="outlined"
                    fullWidth
                    sx={{
                      borderRadius: '12px',
                      padding: '12px 24px',
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
                    View Details
                  </Button>
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
          Load More Jobs
        </Button>
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
        .delay-300 { animation-delay: 0.3s; }
        .delay-400 { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}