import { Button } from '@mui/material';
import { ArrowForward, Person, Business, Star, TrendingUp, Shield, CheckCircle } from '@mui/icons-material';
// import { ImageWithFallback } from '../Features/Organisation/Image/svgs-removebg-preview.png';

export default function App() {
  const handleFreelancerRegister = () => {
    console.log('Register as Freelancer clicked');
    // Handle freelancer registration logic
  };

  const handleOrganizationRegister = () => {
    console.log('Register as Organization clicked');
    // Handle organization registration logic
  };

  return (
    <div className="h-screen relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-72 h-72 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute top-1/4 right-0 w-96 h-96 bg-gradient-to-br from-purple-400/20 to-pink-400/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-gradient-to-br from-indigo-400/20 to-blue-400/20 rounded-full blur-3xl animate-pulse delay-2000"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-4 h-4 bg-blue-500/30 rotate-45 animate-bounce delay-300"></div>
        <div className="absolute top-40 left-20 w-6 h-6 bg-purple-500/30 rounded-full animate-bounce delay-700"></div>
        <div className="absolute bottom-40 right-40 w-5 h-5 bg-indigo-500/30 rotate-45 animate-bounce delay-1200"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col h-full">
        {/* Compact Header */}
        <header className="w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3">
            <div className="relative">
              {/* { <ImageWithFallback
                src="https://images.unsplash.com/photo-1746046936818-8d432ebd3d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzU2MjAzMjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="BHARATGIG Logo"
                className="w-10 h-10 rounded-lg object-cover ring-2 ring-blue-200 shadow-lg"
              /> } */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wide">
                BHARATGIG
              </h1>
              <p className="text-xs text-gray-600">Connect• Create • Collaborate</p>
            </div>
          </div>
        </header>

        {/* Main Content */}                                        
        <main className="flex-1 flex items-center justify-center px-6 py-4">
          <div className="w-full max-w-5xl">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
              
              {/* Left Stats Panel */}
              <div className="hidden lg:block space-y-4"> 
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl flex items-center justify-center">
                      <TrendingUp className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-lg text-gray-800">50k+</p>
                      <p className="text-xs text-gray-600">Active Users</p>
                    </div>
                  </div>
                </div>
                
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl flex items-center justify-center">
                      <Star className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-lg text-gray-800">4.9★</p>
                      <p className="text-xs text-gray-600">User Rating</p>
                    </div>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl flex items-center justify-center">
                      <Shield className="w-5 h-5 text-white" />
                    </div>
                    <div>
                      <p className="text-lg text-gray-800">100%</p>
                      <p className="text-xs text-gray-600">Secure</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Center Form Container */}
              <div className="relative">
                {/* Decorative Background Pattern */}
                <div className="absolute inset-0 opacity-5">
                  <div className="absolute top-4 left-4 w-20 h-20 border-2 border-blue-500 rounded-full"></div>
                  <div className="absolute bottom-4 right-4 w-16 h-16 border-2 border-purple-500 rounded-xl rotate-45"></div>
                  <div className="absolute top-1/2 left-2 w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-400 rounded-full"></div>
                </div>

                {/* Main Glow Effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-blue-400/30 via-purple-400/30 to-indigo-400/30 rounded-3xl blur-2xl"></div>
                
                <div className="relative bg-white/95 backdrop-blur-lg rounded-3xl shadow-2xl border border-white/50 p-8 overflow-hidden">
                  {/* Top decorative border */}
                  <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-blue-500 via-purple-500 to-indigo-500"></div>
                  
                  <div className="text-center mb-8">
                    <div className="relative inline-block">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-30"></div>
                      <div className="relative w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                        </svg>
                      </div>
                    </div>
                    
                    <h2 className="text-2xl bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
                      Join BHARATGIG
                    </h2>
                    

                    {/* Feature badges */}
                    <div className="flex justify-center gap-2 mb-6">
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Free to join
                      </span>
                      <span className="inline-flex items-center gap-1 px-3 py-1 bg-purple-50 text-purple-700 rounded-full text-xs">
                        <CheckCircle className="w-3 h-3" />
                        Instant setup
                      </span>
                    </div>
                  </div>

                  {/* Registration Options Grid */}
                  <div className="space-y-4">
                    {/* Freelancer Registration Card */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                      <div className="relative bg-gradient-to-r from-blue-500/5 to-purple-500/5 border border-blue-200/50 rounded-2xl p-1">
                        <Button
                          variant="contained"
                          fullWidth
                          size="large"
                          startIcon={<Person />}
                          endIcon={<ArrowForward />}
                          onClick={handleFreelancerRegister}
                          sx={{
                            background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                            color: 'white',
                            padding: '16px 24px',
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 600,
                            boxShadow: '0 8px 25px rgba(59, 130, 246, 0.3)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.2), transparent)',
                              transition: 'left 0.5s',
                            },
                            '&:hover': {
                              background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                              boxShadow: '0 12px 35px rgba(59, 130, 246, 0.4)',
                              transform: 'translateY(-2px)',
                              '&:before': {
                                left: '100%',
                              },
                            },
                            '&:active': {
                              transform: 'translateY(0px)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <div className="flex flex-col items-center">
                            <span> Freelancer</span>
                            <span className="text-xs opacity-80">Start earning today</span>
                          </div>
                        </Button>
                      </div>
                    </div>

                    {/* Enhanced Divider */}
                    <div className="relative py-1">
                      <div className="absolute inset-0 flex items-center">
                        <div className="w-full h-px bg-gradient-to-r from-transparent via-gray-300 to-transparent"></div>
                      </div>
                      <div className="relative flex justify-center">
                        <span className="px-6 py-1 bg-white border border-gray-200 text-gray-500 rounded-full text-sm shadow-sm">
                          or
                        </span>
                      </div>
                    </div>

                    {/* Organization Registration Card */}
                    <div className="relative group">
                      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl blur opacity-20 group-hover:opacity-30 transition duration-500"></div>
                      <div className="relative bg-gradient-to-r from-indigo-500/5 to-purple-500/5 border border-indigo-200/50 rounded-2xl p-1">
                        <Button
                          variant="outlined"
                          fullWidth
                          size="large"
                          startIcon={<Business />}
                          endIcon={<ArrowForward />}
                          onClick={handleOrganizationRegister}
                          sx={{
                            borderWidth: '2px',
                            borderColor: '#6366f1',
                            background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.08), rgba(139, 92, 246, 0.08))',
                            color: '#6366f1',
                            padding: '16px 24px',
                            borderRadius: '12px',
                            textTransform: 'none',
                            fontSize: '16px',
                            fontWeight: 600,
                            boxShadow: '0 4px 15px rgba(99, 102, 241, 0.1)',
                            position: 'relative',
                            overflow: 'hidden',
                            '&:before': {
                              content: '""',
                              position: 'absolute',
                              top: 0,
                              left: '-100%',
                              width: '100%',
                              height: '100%',
                              background: 'linear-gradient(90deg, transparent, rgba(99, 102, 241, 0.1), transparent)',
                              transition: 'left 0.5s',
                            },
                            '&:hover': {
                              borderWidth: '2px',
                              borderColor: '#6366f1',
                              background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.15), rgba(139, 92, 246, 0.15))',
                              boxShadow: '0 8px 25px rgba(99, 102, 241, 0.2)',
                              transform: 'translateY(-2px)',
                              '&:before': {
                                left: '100%',
                              },
                            },
                            '&:active': {
                              transform: 'translateY(0px)',
                            },
                            transition: 'all 0.3s ease',
                          }}
                        >
                          <div className="flex flex-col items-center">
                            <span> Organization</span>
                            <span className="text-xs opacity-80">Find top talent</span>
                          </div>
                        </Button>
                      </div>
                    </div>
                  </div>

                  {/* Bottom CTA */}
                  <div className="mt-2 pt-6 border-t border-gray-200/60 text-center">
                    <p className="text-sm text-gray-600 mb-3">
                      Already have an account?
                    </p>
                    <button className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-gray-50 to-gray-100 text-gray-700 rounded-xl hover:from-gray-100 hover:to-gray-200 transition-all duration-300 shadow-sm hover:shadow-md text-sm border border-gray-200/50">
                      Sign in here
                      <ArrowForward className="ml-2 w-3 h-3" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Right Features Panel */}
              <div className="hidden lg:block space-y-4">
                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-orange-400 to-red-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-800 mb-1">Quick Start</p>
                    <p className="text-xs text-gray-600">Setup in minutes</p>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-800 mb-1">Verified</p>
                    <p className="text-xs text-gray-600">Trusted platform</p>
                  </div>
                </div>

                <div className="bg-white/60 backdrop-blur-sm rounded-2xl p-4 border border-white/40 shadow-lg">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-emerald-400 to-green-500 rounded-xl mx-auto mb-2 flex items-center justify-center">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-800 mb-1">No Fees</p>
                    <p className="text-xs text-gray-600">Free to join</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}