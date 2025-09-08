import { useState } from 'react';
import { Badge, Tooltip } from '@mui/material';
import { 
  Notifications, 
  Search, 
  Settings,
  KeyboardArrowDown,
  Menu,
  Close
} from '@mui/icons-material';
// import { ImageWithFallback } from './figma/ImageWithFallback';

interface NavItem {
  name: string;
  component: React.ComponentType;
  icon: string;
}

interface NavbarProps {
  navItems: NavItem[];
  activeComponent: string;
  setActiveComponent: (component: string) => void;
}

export default function Navbar({ navItems, activeComponent, setActiveComponent }: NavbarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleNavItemClick = (itemName: string) => {
    setActiveComponent(itemName);
    setIsMobileMenuOpen(false); // Close mobile menu when item is clicked
  };

  return (
    <nav className="w-full bg-white/95 backdrop-blur-lg shadow-xl border-b border-white/50 sticky top-0 z-40 animate-slide-down">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo and Desktop Navigation */}
          <div className="flex items-center space-x-6">
            {/* BHARATGIG Logo */}
            <div className="flex items-center gap-3">
              <div className="relative">
                {/* <ImageWithFallback
                  src="https://images.unsplash.com/photo-1746046936818-8d432ebd3d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzU2MjAzMjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                  alt="BHARATGIG Logo"
                  className="w-10 h-10 rounded-lg object-cover ring-2 ring-blue-200 shadow-lg"
                /> */}
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
              </div>
              <div>
                <h1 className="text-lg sm:text-xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wide">
                  BHARATGIG
                </h1>
                <p className="text-xs text-gray-600 hidden sm:block">Freelancer Platform</p>
              </div>
            </div>

            {/* Desktop Navigation Items */}
            <div className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <button
                  key={item.name}
                  onClick={() => setActiveComponent(item.name)}
                  className={`
                    relative px-4 py-2 rounded-xl transition-all duration-300 flex items-center gap-2 group
                    ${activeComponent === item.name
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                      : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                    }
                  `}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {/* Icon */}
                  <span className="text-sm">{item.icon}</span>
                  
                  {/* Label */}
                  <span className={`
                    text-sm transition-all duration-300 
                    ${activeComponent === item.name ? 'font-medium' : 'font-normal'}
                  `}>
                    {item.name}
                  </span>

                  {/* Active Indicator */}
                  {activeComponent === item.name && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1.5 h-1.5 bg-white rounded-full animate-pulse"></div>
                  )}

                  {/* Hover Effect */}
                  <div className={`
                    absolute inset-0 rounded-xl bg-gradient-to-r from-blue-500/10 to-purple-600/10 opacity-0 
                    group-hover:opacity-100 transition-opacity duration-300
                    ${activeComponent === item.name ? 'opacity-0' : ''}
                  `}></div>

                
                </button>
              ))}
            </div>
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            
            {/* Search Bar - Hidden on small screens */}
            <div className="relative hidden xl:block">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search className="h-4 w-4 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search..."
                className="w-48 pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm
                         focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
                         transition-all duration-200"
              />
            </div>

            {/* Search Icon for smaller screens */}
            <button className="xl:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200">
              <Search className="h-5 w-5" />
            </button>

            {/* Notifications - Hidden on very small screens */}
            <Tooltip title="Notifications" arrow>
              <div className="hidden sm:block relative p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 cursor-pointer">
                <Badge 
                  badgeContent={3} 
                  sx={{ 
                    '& .MuiBadge-badge': { 
                      backgroundColor: '#ef4444', 
                      color: 'white',
                      fontSize: '0.65rem',
                      minWidth: '16px',
                      height: '16px',
                      right: 2,
                      top: 2
                    } 
                  }}
                >
                  <Notifications className="h-5 w-5" />
                </Badge>
              </div>
            </Tooltip>

            {/* Settings - Hidden on very small screens */}
            <Tooltip title="Settings" arrow>
              <button className="hidden sm:flex p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200">
                <Settings className="h-5 w-5" />
              </button>
            </Tooltip>

            {/* Profile Dropdown */}
            <div className="relative hidden md:block">
              <button className="flex items-center gap-2 p-1.5 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200 group">
                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-white text-sm">👤</span>
                </div>
                <div className="hidden xl:block text-left">
                  <p className="text-sm">John Doe</p>
                  <p className="text-xs text-gray-500">Freelancer</p>
                </div>
                <KeyboardArrowDown className="h-4 w-4 transform group-hover:rotate-180 transition-transform duration-200 hidden lg:block" />
              </button>
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              onClick={toggleMobileMenu}
              className="lg:hidden p-2 text-gray-600 hover:text-gray-800 hover:bg-gray-50 rounded-lg transition-all duration-200"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? (
                <Close className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        <div className={`
          lg:hidden overflow-hidden transition-all duration-300 ease-in-out
          ${isMobileMenuOpen ? 'max-h-100 opacity-100' : 'max-h-0 opacity-0'}
        `}>
          <div className="py-4 space-y-2 border-t border-gray-100">
            {navItems.map((item, index) => (
              <button
                key={item.name}
                onClick={() => handleNavItemClick(item.name)}
                className={`
                  w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 text-left
                  ${activeComponent === item.name
                    ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-lg'
                    : 'text-gray-600 hover:text-gray-800 hover:bg-gray-50'
                  }
                `}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                {/* Icon */}
                <span className="text-lg">{item.icon}</span>
                
                {/* Label */}
                <span className={`
                  flex-1 transition-all duration-300 
                  ${activeComponent === item.name ? 'font-medium' : 'font-normal'}
                `}>
                  {item.name}
                </span>

               

                {/* Active indicator */}
                {activeComponent === item.name && (
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                )}
              </button>
            ))}

            {/* Mobile-only actions */}
            <div className="pt-4 space-y-2 border-t border-gray-100 mt-4">
           

             

              {/* Settings - Mobile */}
              <button className="sm:hidden w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition-all duration-200">
                <Settings className="h-5 w-5" />
                <span>Settings</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-600 to-indigo-600 opacity-50"></div>
      
      {/* Floating particles for extra visual appeal */}
      <div className="absolute top-2 left-20 w-1 h-1 bg-blue-400/30 rounded-full animate-ping"></div>
      <div className="absolute top-4 right-32 w-1 h-1 bg-purple-400/40 rounded-full animate-ping delay-1000"></div>
      <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-indigo-400/30 rounded-full animate-ping delay-500"></div>
    </nav>
  );
}
