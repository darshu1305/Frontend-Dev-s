import { useState } from 'react';
import { Button, Chip, Alert } from '@mui/material';
import { ArrowBack, ArrowForward, CloudUpload, Add, Close, Edit, Info, CheckCircle } from '@mui/icons-material';
// import { ImageWithFallback } from './components/figma/ImageWithFallback';
import Stepper from './Stapper';
import SuccessModal from './SuccessModal';

interface FormData {
  organizationName: string;
  managerId: string;
  logo: File | null;
  location: string;
  tags: string[];
}

interface FormErrors {
  organizationName?: string;
  managerId?: string;
  location?: string;
}

// Move CustomInput component outside to prevent re-creation on every render
const CustomInput = ({ 
  label, 
  value, 
  onChange, 
  error, 
  placeholder 
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
}) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-700 block">{label}</label>
    <input
      type="text"
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder={placeholder}
      className={`
        w-full px-4 py-3 bg-input-background rounded-lg border-2 transition-all duration-200
        focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
        ${error 
          ? 'border-red-300 bg-red-50' 
          : 'border-gray-200 hover:border-gray-300'
        }
      `}
    />
    {error && (
      <p className="text-red-500 text-sm mt-1">{error}</p>
    )}
  </div>
);

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    organizationName: '',
    managerId: '',
    logo: null,
    location: '',
    tags: []
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [newTag, setNewTag] = useState('');
  const [logoPreview, setLogoPreview] = useState<string>('');
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);

  const steps = [
    { label: 'Basic Info', icon: '📋' },
    { label: 'Tags', icon: '🏷️' },
    { label: 'Review', icon: '👁️' }
  ];

  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    
    // Clear error when user starts typing
    if (formErrors[field as keyof FormErrors]) {
      setFormErrors(prev => ({
        ...prev,
        [field]: undefined
      }));
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, logo: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setLogoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);
      
      // Show upload success message
      setShowUploadSuccess(true);
      setTimeout(() => setShowUploadSuccess(false), 3000);
    }
  };

  const handleAddTag = () => {
    if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateStep1 = (): boolean => {
    const errors: FormErrors = {};
    
    if (!formData.organizationName.trim()) {
      errors.organizationName = 'Organization name is required';
    }
    if (!formData.managerId.trim()) {
      errors.managerId = 'Manager ID is required';
    }
    if (!formData.location.trim()) {
      errors.location = 'Location is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    // Tags are optional, so always return true for step 2
    return true;
  };

  const handleNext = () => {
    if (currentStep === 1 && !validateStep1()) {
      return;
    }
    if (currentStep === 2 && !validateStep2()) {
      return;
    }
    
    if (currentStep < 3) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(prev => prev - 1);
    }
  };

  const handleEditStep = (step: number) => {
    setCurrentStep(step);
  };

  const handleSubmit = () => {
    console.log('Form submitted:', formData);
    setShowSuccessModal(true);
  };

  const handleCloseSuccessModal = () => {
    setShowSuccessModal(false);
  };

  const handleRegisterAnother = () => {
    setShowSuccessModal(false);
    // Reset form
    setFormData({
      organizationName: '',
      managerId: '',
      logo: null,
      location: '',
      tags: []
    });
    setLogoPreview('');
    setCurrentStep(1);
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    // Here you would typically navigate to the dashboard
    console.log('Navigating to dashboard...');
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl text-gray-800 mb-8">Organization - Basic Info</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                label="Organization Name"
                value={formData.organizationName}
                onChange={(value) => handleInputChange('organizationName', value)}
                error={formErrors.organizationName}
                placeholder="Enter organization name"
              />
              <CustomInput
                label="Manager ID"
                value={formData.managerId}
                onChange={(value) => handleInputChange('managerId', value)}
                error={formErrors.managerId}
                placeholder="Enter manager ID"
              />
            </div>

            <div className="space-y-3">
              <label className="text-sm text-gray-700 block">Upload Logo</label>
              <div className="flex items-center gap-4">
                <input
                  accept="image/*"
                  style={{ display: 'none' }}
                  id="logo-upload"
                  type="file"
                  onChange={handleLogoUpload}
                />
                <label htmlFor="logo-upload">
                  <Button
                    variant="outlined"
                    component="span"
                    startIcon={<CloudUpload />}
                    sx={{
                      borderRadius: '8px',
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
                    Choose File
                  </Button>
                </label>
                
                {logoPreview && (
                  <div className="flex items-center gap-3 animate-slide-in">
                    <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                      <img
                        src={logoPreview}
                        alt="Logo preview"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </div>
                )}
              </div>
              
              {showUploadSuccess && (
                <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200 animate-slide-down">
                  <CheckCircle className="w-4 h-4" />
                  <span className="text-sm">Uploaded successfully</span>
                </div>
              )}
            </div>

            <CustomInput
              label="Location"
              value={formData.location}
              onChange={(value) => handleInputChange('location', value)}
              error={formErrors.location}
              placeholder="Enter location"
            />
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl text-gray-800 mb-8">Organization - Tags</h2>
            
            <div className="space-y-4">
              <div className="flex gap-3">
                <input
                  type="text"
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                  placeholder="Add a tag"
                  className="flex-1 px-4 py-3 bg-input-background rounded-lg border-2 border-gray-200 
                           focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                           hover:border-gray-300 transition-all duration-200"
                />
                <Button
                  variant="contained"
                  onClick={handleAddTag}
                  disabled={!newTag.trim()}
                  sx={{
                    borderRadius: '8px',
                    padding: '12px 20px',
                    background: 'linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)',
                    minWidth: 'auto',
                    '&:hover': {
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                    },
                    '&:disabled': {
                      background: '#e5e7eb',
                      color: '#9ca3af'
                    }
                  }}
                >
                  <Add />
                </Button>
              </div>

              <div className="space-y-3">
                <label className="text-sm text-gray-700 block">Tags Added:</label>
                <div 
                  className={`
                    p-4 bg-gray-50 rounded-lg border border-gray-200 w-full
                    ${formData.tags.length > 10 
                      ? 'h-[100px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100' 
                      : 'min-h-[60px]'
                    }
                  `}
                >
                  {formData.tags.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 w-full">
                      {/* Display tags in rows of 5 */}
                      {Array.from({ length: Math.ceil(formData.tags.length / 5) }, (_, rowIndex) => (
                        <div key={rowIndex} className="flex flex-wrap gap-2 justify-start">
                          {formData.tags
                            .slice(rowIndex * 5, (rowIndex + 1) * 5)
                            .map((tag, tagIndex) => {
                              const actualIndex = rowIndex * 5 + tagIndex;
                              return (
                                <Chip
                                  key={actualIndex}
                                  label={tag}
                                  onDelete={() => handleRemoveTag(tag)}
                                  deleteIcon={<Close />}
                                  sx={{
                                    backgroundColor: '#dbeafe',
                                    color: '#1d4ed8',
                                    borderRadius: '6px',
                                    height: '30px',
                                    fontSize: '12px',
                                    maxWidth: '120px',
                                    animation: 'slideIn 0.3s ease-out',
                                    '& .MuiChip-deleteIcon': {
                                      color: '#1d4ed8',
                                      fontSize: '16px',
                                      '&:hover': {
                                        color: '#1e40af'
                                      }
                                    },
                                    '& .MuiChip-label': {
                                      paddingLeft: '6px',
                                      paddingRight: '4px',
                                      overflow: 'hidden',
                                      textOverflow: 'ellipsis',
                                      whiteSpace: 'nowrap',
                                      maxWidth: '80px'
                                    }
                                  }}
                                />
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[40px]">
                      <p className="text-gray-500 italic">
                        No tags added yet
                      </p>
                    </div>
                  )}
                </div>
                
                {/* Tags Count Info */}
                {formData.tags.length > 0 && (
                  <div className="flex items-center justify-between text-xs text-gray-500">
                    <span>{formData.tags.length} tag{formData.tags.length !== 1 ? 's' : ''} added</span>
                    {formData.tags.length > 10 && (
                      <span className="text-blue-600 bg-blue-50 px-2 py-1 rounded text-xs">
                        Scroll to see all tags ↓
                      </span>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl text-gray-800 mb-8">Review & Verify</h2>
            
            <Alert 
              severity="info" 
              icon={<Info />}
              sx={{ 
                borderRadius: '12px',
                backgroundColor: '#dbeafe',
                color: '#1d4ed8',
                border: '1px solid #bfdbfe',
                '& .MuiAlert-icon': {
                  color: '#3b82f6'
                }
              }}
            >
              Please review all information before submitting your registration.
            </Alert>

            {/* Basic Information Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-slide-up">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-gray-800">Basic Information</h3>
                <Button
                  variant="text"
                  startIcon={<Edit />}
                  onClick={() => handleEditStep(1)}
                  sx={{
                    color: '#3b82f6',
                    textTransform: 'none',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#eff6ff'
                    }
                  }}
                >
                  Edit
                </Button>
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Organization Name:</p>
                  <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                    {formData.organizationName || 'Not provided'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Manager ID:</p>
                  <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                    {formData.managerId || 'Not provided'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Location:</p>
                  <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                    {formData.location || 'Not provided'}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm text-gray-600">Logo:</p>
                  {logoPreview ? (
                    <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <img
                        src={logoPreview}
                        alt="Logo"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <p className="text-gray-400 italic bg-gray-50 px-3 py-2 rounded-lg">
                      No logo uploaded
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Tags Section */}
            <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6 animate-slide-up delay-100">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg text-gray-800">Tags</h3>
                <Button
                  variant="text"
                  startIcon={<Edit />}
                  onClick={() => handleEditStep(2)}
                  sx={{
                    color: '#3b82f6',
                    textTransform: 'none',
                    borderRadius: '8px',
                    '&:hover': {
                      backgroundColor: '#eff6ff'
                    }
                  }}
                >
                  Edit
                </Button>
              </div>
              
              <div className="bg-gray-50 p-4 rounded-lg min-h-[80px] flex items-center">
                <div className="flex flex-wrap gap-2 w-full">
                  {formData.tags.length > 0 ? (
                    formData.tags.map((tag, index) => (
                      <Chip
                        key={index}
                        label={tag}
                        sx={{
                          backgroundColor: '#dbeafe',
                          color: '#1d4ed8',
                          borderRadius: '6px'
                        }}
                      />
                    ))
                  ) : (
                    <p className="text-gray-400 italic w-full text-center">No tags added</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
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
        {/* Header */}
        <header className="w-full bg-white/80 backdrop-blur-md shadow-lg border-b border-white/20 animate-slide-down">
          <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-3">
            <div className="relative">
              {/* <ImageWithFallback
                src="https://images.unsplash.com/photo-1746046936818-8d432ebd3d0e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjB0ZWNoJTIwY29tcGFueSUyMGxvZ298ZW58MXx8fHwxNzU2MjAzMjU5fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="BHARATGIG Logo"
                className="w-10 h-10 rounded-lg object-cover ring-2 ring-blue-200 shadow-lg"
              /> */}
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wide">
                BHARATGIG
              </h1>
              <p className="text-xs text-gray-600">Organization Registration</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8 animate-fade-in-up">
          {/* Stepper */}
          <Stepper currentStep={currentStep} steps={steps} />

          {/* Form Container */}
          <div className="bg-white/95 backdrop-blur-lg rounded-3xl shadow-xl border border-white/50 p-8 mb-6 animate-scale-in">
            {renderStepContent()}
          </div>

          {/* Navigation Buttons */}
          <div className="flex justify-between animate-fade-in-up delay-200">
            <Button
              variant="outlined"
              startIcon={<ArrowBack />}
              onClick={handleBack}
              disabled={currentStep === 1}
              sx={{
                borderRadius: '12px',
                padding: '12px 24px',
                borderColor: '#e5e7eb',
                backgroundColor: '#f9fafb',
                color: '#6b7280',
                textTransform: 'none',
                '&:hover': {
                  borderColor: '#d1d5db',
                  backgroundColor: '#f3f4f6'
                },
                '&:disabled': {
                  opacity: 0.5,
                  backgroundColor: '#f9fafb'
                }
              }}
            >
              Back
            </Button>

            {currentStep < 3 ? (
              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={handleNext}
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
                Next
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleSubmit}
                sx={{
                  borderRadius: '12px',
                  padding: '12px 24px',
                  background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
                  textTransform: 'none',
                  boxShadow: '0 4px 12px rgba(16, 185, 129, 0.3)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #059669 0%, #047857 100%)',
                    boxShadow: '0 6px 20px rgba(16, 185, 129, 0.4)',
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Submit Registration
              </Button>
            )}
          </div>
        </main>
      </div>

      {/* Success Modal */}
      <SuccessModal
        isOpen={showSuccessModal}
        onClose={handleCloseSuccessModal}
        organizationName={formData.organizationName}
        onRegisterAnother={handleRegisterAnother}
        onGoToDashboard={handleGoToDashboard}
      />

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
        
        @keyframes slide-in {
          0% { transform: translateX(-20px); opacity: 0; }
          100% { transform: translateX(0); opacity: 1; }
        }
        
        @keyframes slide-down {
          0% { transform: translateY(-20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes slide-up {
          0% { transform: translateY(20px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes fade-in-up {
          0% { transform: translateY(30px); opacity: 0; }
          100% { transform: translateY(0); opacity: 1; }
        }
        
        @keyframes scale-in {
          0% { transform: scale(0.95); opacity: 0; }
          100% { transform: scale(1); opacity: 1; }
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
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
        .animate-slide-down { animation: slide-down 0.4s ease-out; }
        .animate-slide-up { animation: slide-up 0.5s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .delay-100 { animation-delay: 0.1s; }
        .delay-200 { animation-delay: 0.2s; }
        
        .bg-gradient-radial {
          background: radial-gradient(circle, var(--tw-gradient-stops));
        }
      `}</style>
    </div>
  );
}