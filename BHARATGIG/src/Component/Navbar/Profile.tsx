import { useState } from 'react';
import { Card, CardContent, Button, Chip, Avatar, LinearProgress, Tabs, Tab, Box } from '@mui/material';
import { 
  Edit, 
  LocationOn, 
  Star, 
  Work, 
  School,
  Email,
  Phone,
  Language,
  Verified,
  Download,
  Share,
  Settings
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`profile-tabpanel-${index}`}
      aria-labelledby={`profile-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

export default function Profile() {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Profile data
  const profileData = {
    name: 'John Doe',
    title: 'Full Stack Developer & UI/UX Designer',
    location: 'Mumbai, India',
    rating: 4.9,
    completedProjects: 47,
    activeProjects: 3,
    successRate: 98,
    avatar: '👨‍💻',
    verified: true,
    description: 'Passionate full-stack developer with 5+ years of experience in creating scalable web applications. I specialize in React, Node.js, and modern design systems.',
    skills: [
      { name: 'React', level: 95 },
      { name: 'Node.js', level: 90 },
      { name: 'TypeScript', level: 88 },
      { name: 'UI/UX Design', level: 85 },
      { name: 'Python', level: 80 },
      { name: 'AWS', level: 75 }
    ],
    languages: ['English', 'Hindi', 'Marathi'],
    certifications: [
      'AWS Certified Developer',
      'Google Cloud Professional',
      'Meta React Developer'
    ]
  };

  const recentWork = [
    {
      title: 'E-commerce Platform',
      client: 'TechStartup Inc.',
      rating: 5,
      review: 'Exceptional work! John delivered exactly what we needed.',
      completedDate: 'Dec 2024',
      budget: '₹85,000'
    },
    {
      title: 'Mobile App Design',
      client: 'Creative Solutions',
      rating: 4.8,
      review: 'Great attention to detail and user experience.',
      completedDate: 'Nov 2024',
      budget: '₹65,000'
    },
    {
      title: 'SaaS Dashboard',
      client: 'DataCorp',
      rating: 5,
      review: 'Outstanding development skills and communication.',
      completedDate: 'Oct 2024',
      budget: '₹1,20,000'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-6 py-8 space-y-6">
      
      {/* Profile Header */}
      <Card className="bg-white shadow-sm border border-gray-200">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-r from-blue-600 to-purple-600 relative">
          
        </div>

        {/* Profile Info */}
        <CardContent className="p-6">
          <div className="flex flex-col lg:flex-row lg:items-start gap-6">
            
            {/* Avatar */}
            <div className="relative -mt-16">
              <Avatar
                sx={{
                  width: 100,
                  height: 100,
                  backgroundColor: '#3b82f6',
                  border: '4px solid white',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
                }}
              >
                <span style={{ fontSize: '2.5rem' }}>{profileData.avatar}</span>
              </Avatar>
              {profileData.verified && (
                <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-blue-500 rounded-full border-2 border-white flex items-center justify-center">
                  <Verified sx={{ fontSize: 14, color: 'white' }} />
                </div>
              )}
            </div>

            {/* Profile Details */}
            <div className="flex-1">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4">
                <div>
                  <h1 className="text-2xl text-gray-800 mb-1">{profileData.name}</h1>
                  <h2 className="text-lg text-gray-600 mb-3">{profileData.title}</h2>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-4">
                    <span className="flex items-center gap-1">
                      <LocationOn className="h-4 w-4" />
                      {profileData.location}
                    </span>
                    <span className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400" />
                      {profileData.rating} ({profileData.completedProjects} reviews)
                    </span>
                  </div>

                  <p className="text-gray-700 max-w-2xl">{profileData.description}</p>
                </div>

                <div className="flex flex-col gap-2">
                  <Button
                    variant="contained"
                    startIcon={<Edit />}
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      backgroundColor: '#3b82f6',
                      '&:hover': {
                        backgroundColor: '#2563eb',
                      }
                    }}
                  >
                    Edit Profile
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<Download />}
                    sx={{
                      borderRadius: '8px',
                      textTransform: 'none',
                      borderColor: '#d1d5db',
                      color: '#374151',
                      '&:hover': {
                        borderColor: '#9ca3af'
                      }
                    }}
                  >
                    Download CV
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-xl text-blue-600 mb-1">{profileData.activeProjects}</div>
            <div className="text-sm text-gray-600">Active Projects</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-xl text-green-600 mb-1">{profileData.completedProjects}</div>
            <div className="text-sm text-gray-600">Completed Projects</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-xl text-purple-600 mb-1">{profileData.rating}/5</div>
            <div className="text-sm text-gray-600">Average Rating</div>
          </CardContent>
        </Card>
        <Card className="bg-white shadow-sm border border-gray-200">
          <CardContent className="p-4 text-center">
            <div className="text-xl text-orange-600 mb-1">{profileData.successRate}%</div>
            <div className="text-sm text-gray-600">Success Rate</div>
          </CardContent>
        </Card>
      </div>

      {/* Tabbed Content */}
      <Card className="bg-white shadow-sm border border-gray-200">
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={tabValue} 
            onChange={handleTabChange} 
            sx={{ 
              px: { xs: 1, sm: 3 },
              '& .MuiTabs-flexContainer': {
                flexDirection: { xs: 'column', sm: 'row' }
              },
              '& .MuiTab-root': {
                minHeight: { xs: '48px', sm: '48px' },
                fontSize: { xs: '0.875rem', sm: '1rem' },
                textTransform: 'none',
                fontWeight: 500,
                px: { xs: 1, sm: 2 },
                py: { xs: 1.5, sm: 1.5 },
                alignItems: 'flex-start',
              }
            }}
            variant="scrollable"
            scrollButtons="auto"
            allowScrollButtonsMobile
          >
            <Tab label="Skills & Expertise" />
            <Tab label="Recent Work" />
            <Tab label="Contact Info" />
          </Tabs>
        </Box>

        {/* Skills Tab */}
        <TabPanel value={tabValue} index={0}>
          <div className="space-y-6">
            
            {/* Technical Skills */}
            <div>
              <h3 className="text-base sm:text-lg text-gray-800 mb-4">Technical Skills</h3>
              <div className="grid grid-cols-1 gap-4">
                {profileData.skills.map((skill) => (
                  <div key={skill.name} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <span className="text-sm sm:text-base text-gray-700">{skill.name}</span>
                      <span className="text-xs sm:text-sm text-gray-500 ml-2">{skill.level}%</span>
                    </div>
                    <LinearProgress
                      variant="determinate"
                      value={skill.level}
                      sx={{
                        height: { xs: 8, sm: 6 },
                        borderRadius: 3,
                        backgroundColor: '#f3f4f6',
                        '& .MuiLinearProgress-bar': {
                          borderRadius: 3,
                          backgroundColor: '#3b82f6',
                        },
                      }}
                    />
                  </div>
                ))}
              </div>
            </div>

           

            {/* Certifications */}
            <div>
              <h3 className="text-base sm:text-lg text-gray-800 mb-4">Certifications</h3>
              <div className="flex flex-wrap gap-2">
                {profileData.certifications.map((cert) => (
                  <Chip
                    key={cert}
                    label={cert}
                    icon={<School />}
                    sx={{
                      backgroundColor: '#f0fdf4',
                      color: '#15803d',
                      borderRadius: '6px',
                      fontSize: { xs: '0.75rem', sm: '0.875rem' },
                      height: { xs: 28, sm: 32 },
                      '& .MuiChip-icon': {
                        fontSize: { xs: '1rem', sm: '1.125rem' }
                      }
                    }}
                  />
                ))}
              </div>
            </div>
          </div>
        </TabPanel>

        {/* Recent Work Tab */}
        <TabPanel value={tabValue} index={1}>
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg text-gray-800">Recent Projects</h3>
            {recentWork.map((work, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4">
                <div className="flex flex-col gap-3 sm:gap-4">
                  <div className="flex-1">
                    <h4 className="text-sm sm:text-base text-gray-800 mb-2">{work.title}</h4>
                    <p className="text-xs sm:text-sm text-gray-600 mb-2">Client: {work.client}</p>
                    <div className="flex items-center gap-1 mb-2">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`h-3 w-3 sm:h-4 sm:w-4 ${
                            i < Math.floor(work.rating) ? 'text-yellow-400' : 'text-gray-300'
                          }`}
                        />
                      ))}
                      <span className="text-xs sm:text-sm text-gray-600 ml-2">({work.rating})</span>
                    </div>
                    <p className="text-xs sm:text-sm text-gray-700 italic mb-3">"{work.review}"</p>
                  </div>
                  <div className="flex justify-between items-center sm:block sm:text-right border-t pt-3 sm:border-t-0 sm:pt-0">
                    <div className="text-sm sm:text-base text-green-600 mb-0 sm:mb-1">{work.budget}</div>
                    <div className="text-xs sm:text-sm text-gray-500">{work.completedDate}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>

        {/* Contact Info Tab */}
        <TabPanel value={tabValue} index={2}>
          <div className="space-y-4">
            <h3 className="text-base sm:text-lg text-gray-800 mb-4">Contact Information</h3>
            <div className="grid grid-cols-1 gap-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Email className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-gray-500">Email</div>
                  <div className="text-sm sm:text-base text-gray-800 break-all">john.doe@example.com</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <Phone className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-gray-500">Phone</div>
                  <div className="text-sm sm:text-base text-gray-800">+91 98765 43210</div>
                </div>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <LocationOn className="h-4 w-4 sm:h-5 sm:w-5 text-gray-500 flex-shrink-0" />
                <div className="min-w-0 flex-1">
                  <div className="text-xs sm:text-sm text-gray-500">Location</div>
                  <div className="text-sm sm:text-base text-gray-800">{profileData.location}</div>
                </div>
              </div>
             
            </div>
          </div>
        </TabPanel>
      </Card>
    </div>
  );
}