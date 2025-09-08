import { useState } from 'react';
// import { ImageWithFallback } from './components/figma/ImageWithFallback';
import Navbar from './Navbar';
import Dashboard from './Dashboard';
import Jobs from './Jobs';
import Feed from './Feed';
import Profile from './Profile';

export default function Naviteams() {
  const [activeComponent, setActiveComponent] = useState('Dashboard');

  // Dynamic navigation items - easily extensible
  const navItems = [
    { name: 'Dashboard', component: Dashboard, icon: '📊' },
    { name: 'Jobs', component: Jobs, icon: '💼' },
    { name: 'Feed', component: Feed, icon: '📱' },
    { name: 'Profile', component: Profile, icon: '👤' }
    // Add more items here as needed
    // { name: 'Analytics', component: Analytics, icon: '📈' },
    // { name: 'Messages', component: Messages, icon: '💬' },
  ];

  const renderActiveComponent = () => {
    const activeItem = navItems.find(item => item.name === activeComponent);
    if (activeItem) {
      const Component = activeItem.component;
      return <Component />;
    }
    return <Dashboard />;
  };

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Enhanced Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
        
        {/* Large Gradient Blobs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-1/4 right-0 w-80 h-80 bg-gradient-to-br from-purple-400/25 to-pink-400/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-br from-indigo-400/20 to-blue-400/25 rounded-full blur-3xl animate-float-slow"></div>
        
        {/* Medium Morphing Shapes */}
        <div className="absolute top-20 right-1/4 w-32 h-32 bg-gradient-to-br from-cyan-300/30 to-blue-400/30 rounded-full blur-2xl animate-morph"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-gradient-to-br from-violet-300/25 to-purple-400/30 rounded-full blur-2xl animate-morph-delayed"></div>
        
        {/* Small Floating Particles */}
        <div className="absolute top-32 left-20 w-3 h-3 bg-blue-400/40 rounded-full animate-particle-float"></div>
        <div className="absolute top-48 right-32 w-2 h-2 bg-purple-400/50 rounded-full animate-particle-float-delayed"></div>
        <div className="absolute bottom-32 left-40 w-4 h-4 bg-indigo-400/40 rounded-full animate-particle-float-slow"></div>
        
        {/* Geometric Shapes */}
        <div className="absolute top-20 right-20 w-6 h-6 bg-blue-500/30 rotate-45 animate-geometric-spin"></div>
        <div className="absolute top-40 left-16 w-8 h-8 bg-purple-500/25 rounded-full animate-geometric-bounce"></div>
        <div className="absolute bottom-40 right-40 w-5 h-5 bg-indigo-500/35 rotate-45 animate-geometric-pulse"></div>
        <div className="absolute bottom-60 left-60 w-7 h-7 bg-cyan-500/30 rounded animate-geometric-wiggle"></div>
        
        {/* Animated Lines */}
        <div className="absolute top-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-300/20 to-transparent animate-line-move"></div>
        <div className="absolute bottom-1/3 left-0 w-full h-px bg-gradient-to-r from-transparent via-purple-300/20 to-transparent animate-line-move-reverse"></div>
        
        {/* Radial Gradients */}
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-radial from-indigo-200/10 via-transparent to-transparent animate-radial-pulse opacity-60"></div>
        
        {/* Additional Floating Elements */}
        <div className="absolute top-16 left-1/3 w-12 h-12 bg-gradient-to-br from-emerald-300/20 to-teal-400/25 rounded-xl blur-sm animate-float-gentle rotate-12"></div>
        <div className="absolute bottom-24 right-1/3 w-16 h-16 bg-gradient-to-br from-rose-300/20 to-pink-400/25 rounded-2xl blur-sm animate-float-gentle-delayed -rotate-12"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Combined Header and Navbar */}
        <Navbar 
          navItems={navItems}
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
        />

        {/* Main Content */}
        <main className="flex-1 animate-fade-in-up">
          {renderActiveComponent()}
        </main>
      </div>

      <style >{`
        @keyframes float {
          0%, 100% { transform: translateY(0px) scale(1); }
          50% { transform: translateY(-20px) scale(1.02); }
        }
        
        @keyframes float-delayed {
          0%, 100% { transform: translateY(0px) rotate(0deg) scale(1); }
          50% { transform: translateY(-30px) rotate(5deg) scale(1.03); }
        }
        
        @keyframes float-slow {
          0%, 100% { transform: translateX(0px) translateY(0px); }
          50% { transform: translateX(-15px) translateY(-25px); }
        }
        
        @keyframes morph {
          0%, 100% { border-radius: 50% 40% 30% 70%; transform: rotate(0deg); }
          25% { border-radius: 30% 70% 70% 30%; transform: rotate(90deg); }
          50% { border-radius: 70% 30% 50% 50%; transform: rotate(180deg); }
          75% { border-radius: 40% 60% 30% 70%; transform: rotate(270deg); }
        }
        
        @keyframes morph-delayed {
          0%, 100% { border-radius: 60% 40% 30% 70%; transform: rotate(0deg) scale(1); }
          33% { border-radius: 30% 60% 70% 40%; transform: rotate(120deg) scale(1.1); }
          66% { border-radius: 70% 30% 40% 60%; transform: rotate(240deg) scale(0.9); }
        }
        
        @keyframes particle-float {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.5; }
          50% { transform: translateY(-40px) translateX(20px); opacity: 1; }
        }
        
        @keyframes particle-float-delayed {
          0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0.3; }
          50% { transform: translateY(-30px) translateX(-15px); opacity: 0.8; }
        }
        
        @keyframes particle-float-slow {
          0%, 100% { transform: translateY(0px) translateX(0px) scale(1); opacity: 0.4; }
          50% { transform: translateY(-35px) translateX(10px) scale(1.2); opacity: 0.9; }
        }
        
        @keyframes geometric-spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        
        @keyframes geometric-bounce {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        
        @keyframes geometric-pulse {
          0%, 100% { transform: scale(1) rotate(45deg); opacity: 0.3; }
          50% { transform: scale(1.3) rotate(45deg); opacity: 0.7; }
        }
        
        @keyframes geometric-wiggle {
          0%, 100% { transform: rotate(-3deg); }
          50% { transform: rotate(3deg); }
        }
        
        @keyframes line-move {
          0% { transform: translateX(-100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(100%); opacity: 0; }
        }
        
        @keyframes line-move-reverse {
          0% { transform: translateX(100%); opacity: 0; }
          50% { opacity: 1; }
          100% { transform: translateX(-100%); opacity: 0; }
        }
        
        @keyframes radial-pulse {
          0%, 100% { transform: translate(-50%, -50%) scale(1); opacity: 0.3; }
          50% { transform: translate(-50%, -50%) scale(1.1); opacity: 0.6; }
        }
        
        @keyframes float-gentle {
          0%, 100% { transform: translateY(0px) rotate(12deg); }
          50% { transform: translateY(-10px) rotate(18deg); }
        }
        
        @keyframes float-gentle-delayed {
          0%, 100% { transform: translateY(0px) rotate(-12deg); }
          50% { transform: translateY(-15px) rotate(-6deg); }
        }
        
        @keyframes fade-in {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes slide-down {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        .animate-float { animation: float 6s ease-in-out infinite; }
        .animate-float-delayed { animation: float-delayed 8s ease-in-out infinite; }
        .animate-float-slow { animation: float-slow 10s ease-in-out infinite; }
        .animate-morph { animation: morph 12s ease-in-out infinite; }
        .animate-morph-delayed { animation: morph-delayed 15s ease-in-out infinite; }
        .animate-particle-float { animation: particle-float 4s ease-in-out infinite; }
        .animate-particle-float-delayed { animation: particle-float-delayed 5s ease-in-out infinite 1s; }
        .animate-particle-float-slow { animation: particle-float-slow 7s ease-in-out infinite 2s; }
        .animate-geometric-spin { animation: geometric-spin 20s linear infinite; }
        .animate-geometric-bounce { animation: geometric-bounce 3s ease-in-out infinite; }
        .animate-geometric-pulse { animation: geometric-pulse 4s ease-in-out infinite; }
        .animate-geometric-wiggle { animation: geometric-wiggle 2s ease-in-out infinite; }
        .animate-line-move { animation: line-move 8s ease-in-out infinite; }
        .animate-line-move-reverse { animation: line-move-reverse 12s ease-in-out infinite; }
        .animate-radial-pulse { animation: radial-pulse 8s ease-in-out infinite; }
        .animate-float-gentle { animation: float-gentle 4s ease-in-out infinite; }
        .animate-float-gentle-delayed { animation: float-gentle-delayed 5s ease-in-out infinite 1s; }
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-down { animation: slide-down 0.4s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}