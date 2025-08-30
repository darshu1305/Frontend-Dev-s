import { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import { CheckCircle, Close, Dashboard, Add, Celebration } from '@mui/icons-material';

interface SuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  organizationName: string;
  onRegisterAnother: () => void;
  onGoToDashboard: () => void;
}

export default function SuccessModal({ 
  isOpen, 
  onClose, 
  organizationName, 
  onRegisterAnother, 
  onGoToDashboard 
}: SuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      const timer = setTimeout(() => setShowConfetti(false), 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-fade-in"
        onClick={onClose}
      />
      
      {/* Confetti Effects */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {[...Array(20)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 animate-confetti"
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 2}s`,
                animationDuration: `${2 + Math.random() * 2}s`,
                backgroundColor: ['#3b82f6', '#8b5cf6', '#10b981', '#f59e0b', '#ef4444'][Math.floor(Math.random() * 5)]
              }}
            />
          ))}
        </div>
      )}

      {/* Modal Content */}
      <div className="relative bg-white rounded-3xl shadow-2xl max-w-md w-full mx-4 animate-modal-enter overflow-hidden">
        {/* Gradient Header */}
        <div className="relative bg-gradient-to-br from-blue-500 via-purple-600 to-indigo-600 px-5 pt-3 pb-3">
          {/* Close Button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors duration-200"
          >
            <Close className="w-4 h-4" />
          </button>

          {/* Success Icon */}
          <div className="text-center mb-4">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-white/20 rounded-full blur-xl animate-pulse"></div>
              <div className="relative w-20 h-20 bg-white rounded-full flex items-center justify-center mx-auto shadow-lg animate-bounce-gentle">
                <CheckCircle className="w-12 h-12 text-green-500 animate-check-mark" />
              </div>
            </div>
          </div>

          {/* Success Text */}
          <div className="text-center text-white">
            <h2 className="text-2xl mb-2 animate-slide-up">
              🎉 Registration Successful!
            </h2>
            <p className="text-white/90 animate-slide-up delay-100">
              Welcome to BHARATGIG
            </p>
          </div>
        </div>

        {/* Content Body */}
        <div className="px-8 py-6">
          {/* Organization Details */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 mb-6 animate-slide-up delay-200">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Celebration className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Organization Name</p>
                <p className="text-lg text-gray-800 truncate max-w-[200px]">
                  {organizationName || 'Your Organization'}
                </p>
              </div>
            </div>
          </div>

          {/* Success Message */}
          <div className="text-center mb-6 animate-slide-up delay-300">
            <p className="text-gray-600 leading-relaxed">
              Your organization has been successfully registered with BHARATGIG. 
              
            </p>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-3 gap-3 mb-6 animate-slide-up delay-400">
            <div className="text-center p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xs text-green-700">Verified</p>
            </div>
            <div className="text-center p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Dashboard className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-blue-700">Dashboard Ready</p>
            </div>
            <div className="text-center p-3 bg-purple-50 rounded-lg">
              <div className="w-8 h-8 bg-purple-100 rounded-lg mx-auto mb-2 flex items-center justify-center">
                <Add className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-purple-700">Start Hiring</p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="space-y-3 animate-slide-up delay-500">
            <Button
              variant="contained"
              fullWidth
              startIcon={<Dashboard />}
              onClick={onGoToDashboard}
              sx={{
                borderRadius: '12px',
                padding: '10px 20px',
                background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 600,
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  boxShadow: '0 6px 20px rgba(59, 130, 246, 0.4)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Go to Dashboard
            </Button>

            <Button
              variant="outlined"
              fullWidth
              startIcon={<Add />}
              onClick={onRegisterAnother}
              sx={{
                borderRadius: '12px',
                padding: '10px 20px',
                borderColor: '#e5e7eb',
                backgroundColor: '#f9fafb',
                color: '#374151',
                textTransform: 'none',
                fontSize: '16px',
                fontWeight: 500,
                '&:hover': {
                  borderColor: '#d1d5db',
                  backgroundColor: '#f3f4f6',
                  transform: 'translateY(-1px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              Register Another Organization
            </Button>
          </div>

          {/* Footer Note */}
          <div className="text-center mt-3 pt-4 border-t border-gray-100 animate-slide-up delay-600">
            <p className="text-xs text-gray-500">
              Check your email for setup instructions and next steps
            </p>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-white/30 rounded-full animate-ping"></div>
        <div className="absolute top-6 left-8 w-1 h-1 bg-white/40 rounded-full animate-ping delay-500"></div>
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-400 rounded-full animate-pulse"></div>
      </div>

      <style >{`
        @keyframes modal-enter {
          0% {
            opacity: 0;
            transform: scale(0.7) translateY(50px);
          }
          50% {
            transform: scale(1.05) translateY(-10px);
          }
          100% {
            opacity: 1;
            transform: scale(1) translateY(0);
          }
        }

        @keyframes confetti {
          0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
          }
          100% {
            transform: translateY(100vh) rotate(720deg);
            opacity: 0;
          }
        }

        @keyframes bounce-gentle {
          0%, 100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        @keyframes check-mark {
          0% {
            transform: scale(0);
            opacity: 0;
          }
          50% {
            transform: scale(1.2);
          }
          100% {
            transform: scale(1);
            opacity: 1;
          }
        }

        @keyframes slide-up {
          0% {
            opacity: 0;
            transform: translateY(20px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-modal-enter {
          animation: modal-enter 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        .animate-confetti {
          animation: confetti linear forwards;
        }

        .animate-bounce-gentle {
          animation: bounce-gentle 2s ease-in-out infinite;
        }

        .animate-check-mark {
          animation: check-mark 0.6s ease-out 0.3s both;
        }

        .animate-slide-up {
          animation: slide-up 0.6s ease-out both;
        }

        .delay-100 {
          animation-delay: 0.1s;
        }

        .delay-200 {
          animation-delay: 0.2s;
        }

        .delay-300 {
          animation-delay: 0.3s;
        }

        .delay-400 {
          animation-delay: 0.4s;
        }

        .delay-500 {
          animation-delay: 0.5s;
        }

        .delay-600 {
          animation-delay: 0.6s;
        }
      `}</style>
    </div>
  );
}