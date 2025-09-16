import { useState } from 'react';
import { Button, Chip, Alert, Badge, TextField, Autocomplete } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { ArrowBack, ArrowForward, CloudUpload, Add, Close, Edit, Info, CheckCircle, X } from '@mui/icons-material';
import SuccessModal from './SuccessModal';
import Stepper from '../Organisation/Stapper'
import StepperWrapper from './StepperWrapper';
import { getDegrees, getInstitutes, getSkills } from '../../Services/getFeatures';
import { useEffect } from 'react';
import { featureOBJ } from '../../types/featureOBJ';
interface Education {
  institute: string;
  degree: string;
  startDate: string;
  endDate: string;
  note: string;
}

interface FreelanceLink {
  label: string;
  url: string;
}

interface FormData {
  freelancerName: string;
  email: string;
  photo: File | null;
  cv: File | null;
  password: string;
  skills: string[];
  education: Education[];
  freelanceLinks: FreelanceLink[];
  cvSummary: {
    name: string;
    experience: string;
    skills: string[];
    education: string;
    summary: string;
  } | null;
}



interface FormErrors {
  freelancerName?: string;
  email?: string;
  password?: string;
  cv?: string;
  institute?: string;
  degree?: string;
  startDate?: string;
  endDate?: string;
  note?: string;
}

// Move CustomInput component outside to prevent re-creation on every render
const CustomInput = ({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text"
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
}) => (
  <div className="space-y-2">
    <label className="text-sm text-gray-700 block">{label}</label>
    <input
      type={type}
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
  const [dummySkills, setDummySkills] = useState<featureOBJ[]>([]);
  const [dummyInstitutes, setInstitutes] = useState<featureOBJ[]>([]);
  const [dummyDegrees, setDegrees] = useState<featureOBJ[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const instData = await getInstitutes();
        setInstitutes(instData);
        const skills = await getSkills();
        setDummySkills(skills.map((skill: any) => typeof skill === 'string' ? { name: skill } : skill));
        const degData = await getDegrees();
        setDegrees(degData);
      } catch (error) {
        setInstitutes([]);
        setDegrees([]);
        setDummySkills([]);
      }
    };

    fetchData();
  }, []);
  const [currentStep, setCurrentStep] = useState(1);
  const today = new Date().toISOString().split("T")[0];
  const [formData, setFormData] = useState<FormData>({
    freelancerName: '',
    email: '',
    photo: null,
    cv: null,
    password: '',
    skills: [],
    education: [],
    freelanceLinks: [],
    cvSummary: null
  });
  const [formErrors, setFormErrors] = useState<FormErrors>({});
  const [newSkill, setNewSkill] = useState('');
  const [photoPreview, setPhotoPreview] = useState<string>('');
  const [cvPreview, setCVPreview] = useState<string>('');
  const [showUploadSuccess, setShowUploadSuccess] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isProcessingCV, setIsProcessingCV] = useState(false);
  const [newEducation, setNewEducation] = useState<Education>({
    institute: '',
    degree: '',
    startDate: '',
    endDate: '',
    note: ''
  });
  const [newFreelanceLink, setNewFreelanceLink] = useState<FreelanceLink>({
    label: '',
    url: ''
  });
  const [editingEducationIndex, setEditingEducationIndex] = useState<number | null>(null);
  const [editingFreelanceLinkIndex, setEditingFreelanceLinkIndex] = useState<number | null>(null);

  const steps = [
    { label: 'Basic Info', icon: '📋' },
    { label: 'Upload CV', icon: '📄' },
    { label: 'Education', icon: '🎓' },
    { label: 'Freelance Links', icon: '🔗' },
    { label: 'Skills', icon: '⚡' },
    { label: 'Review', icon: '✅' }
  ];

  // Email validation function
  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
  };



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

  const handlePhotoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, photo: file }));
      const reader = new FileReader();
      reader.onload = (e) => {
        setPhotoPreview(e.target?.result as string);
      };
      reader.readAsDataURL(file);

      // Show upload success message
      setShowUploadSuccess(true);
      setTimeout(() => setShowUploadSuccess(false), 3000);
    }
  };

  // Mock AI CV processing function
  const processCVWithAI = async (file: File): Promise<FormData['cvSummary']> => {
    // Simulate AI processing delay
    await new Promise(resolve => setTimeout(resolve, 3000));

    // Mock AI response based on file name or random data
    const mockSummaries = [
      {
        name: "John Doe",
        experience: "5+ years in Full Stack Development",
        skills: ["React", "Node.js", "Python", "AWS", "MongoDB"],
        education: "Bachelor's in Computer Science",
        summary: "Experienced full-stack developer with expertise in modern web technologies and cloud platforms."
      },
      {
        name: "Jane Smith",
        experience: "3+ years in UI/UX Design",
        skills: ["Figma", "Adobe Creative Suite", "Prototyping", "User Research"],
        education: "Master's in Design",
        summary: "Creative UI/UX designer focused on user-centered design and innovative digital experiences."
      },
      {
        name: "Alex Johnson",
        experience: "4+ years in Data Science",
        skills: ["Python", "Machine Learning", "TensorFlow", "SQL", "Tableau"],
        education: "PhD in Data Science",
        summary: "Data scientist specializing in machine learning algorithms and predictive analytics."
      }
    ];

    return mockSummaries[Math.floor(Math.random() * mockSummaries.length)];
  };

  const handleCvUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setFormData(prev => ({ ...prev, cv: file }));

      // Set CV preview for PDF/document files
      const fileName = file.name;
      setCVPreview(fileName);

      // Show upload success message
      setShowUploadSuccess(true);
      setTimeout(() => setShowUploadSuccess(false), 3000);

      // Start AI processing
      setIsProcessingCV(true);
      try {
        const cvSummary = await processCVWithAI(file);
        setFormData(prev => ({ ...prev, cvSummary }));
      } catch (error) {
        console.error('Error processing CV:', error);
      } finally {
        setIsProcessingCV(false);
      }
    }
  };

  const handleAddSkills = () => {
    if (newSkill.trim() && !formData.skills.includes(newSkill.trim())) {
      setFormData(prev => ({
        ...prev,
        skills: [...prev.skills, newSkill.trim()]
      }));
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      skills: prev.skills.filter(skill => skill !== skillToRemove)
    }));
  };

  const handleAddEducation = () => {
    if (!validateStep3()) return; // stop if errors exist

    if (editingEducationIndex !== null) {
      // Update existing education
      setFormData(prev => ({
        ...prev,
        education: prev.education.map((edu, index) =>
          index === editingEducationIndex ? { ...newEducation } : edu
        )
      }));
      setEditingEducationIndex(null);
    } else {
      // Add new education
      setFormData(prev => ({
        ...prev,
        education: [...prev.education, { ...newEducation }]
      }));
    }
    setNewEducation({
      institute: '',
      degree: '',
      startDate: '',
      endDate: '',
      note: ''
    });
    setFormErrors({});
  };

  const handleEditEducation = (index: number) => {
    const eduToEdit = formData.education[index];
    setNewEducation({ ...eduToEdit });
    setEditingEducationIndex(index);
  };

  const handleCancelEditEducation = () => {
    setNewEducation({
      institute: '',
      degree: '',
      startDate: '',
      endDate: '',
      note: ''
    });
    setEditingEducationIndex(null);
  };

  const handleRemoveEducation = (index: number) => {
    setFormData(prev => ({
      ...prev,
      education: prev.education.filter((_, i) => i !== index)
    }));
    // Reset editing state if removing the item being edited
    if (editingEducationIndex === index) {
      handleCancelEditEducation();
    }
  };

  const handleAddFreelanceLink = () => {
    if (newFreelanceLink.label.trim() && newFreelanceLink.url.trim()) {
      if (editingFreelanceLinkIndex !== null) {
        // Update existing freelance link
        setFormData(prev => ({
          ...prev,
          freelanceLinks: prev.freelanceLinks.map((link, index) =>
            index === editingFreelanceLinkIndex ? { ...newFreelanceLink } : link
          )
        }));
        setEditingFreelanceLinkIndex(null);
      } else {
        // Add new freelance link
        setFormData(prev => ({
          ...prev,
          freelanceLinks: [...prev.freelanceLinks, { ...newFreelanceLink }]
        }));
      }
      setNewFreelanceLink({
        label: '',
        url: ''
      });
    }
  };

  const handleEditFreelanceLink = (index: number) => {
    const linkToEdit = formData.freelanceLinks[index];
    setNewFreelanceLink({ ...linkToEdit });
    setEditingFreelanceLinkIndex(index);
  };

  const handleCancelEditFreelanceLink = () => {
    setNewFreelanceLink({
      label: '',
      url: ''
    });
    setEditingFreelanceLinkIndex(null);
  };

  const handleRemoveFreelanceLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      freelanceLinks: prev.freelanceLinks.filter((_, i) => i !== index)
    }));
    // Reset editing state if removing the item being edited
    if (editingFreelanceLinkIndex === index) {
      handleCancelEditFreelanceLink();
    }
  };

  const validateStep1 = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.freelancerName.trim()) {
      errors.freelancerName = 'Freelancer name is required';
    }
    if (!formData.email.trim()) {
      errors.email = 'Email ID is required';
    } else if (!validateEmail(formData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    if (!formData.password.trim()) {
      errors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      errors.password = 'Password must be at least 6 characters long';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  const validateStep3 = (): boolean => {
    const errors: FormErrors = {};
    if (!newEducation.endDate) {
      const start = newEducation.startDate ? new Date(newEducation.startDate) : null;
      const end = new Date(newEducation.endDate);
      const todayDate = new Date(today);

      if (start && end <= start) {
        errors.endDate = "End date must be later than Start date";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateStep2 = (): boolean => {
    const errors: FormErrors = {};

    if (!formData.cv) {
      errors.cv = 'CV upload is required';
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleNext = () => {
    // Step 1 validation
    if (currentStep === 1 && !validateStep1()) return;

    // Step 3 validation + save education
    if (currentStep === 3) {
      if (!validateStep3()) return;
      handleAddEducation();
    }

    // Step 4: optional freelance links
    if (currentStep === 4) {
      const hasData = newFreelanceLink.label.trim() || newFreelanceLink.url.trim();
      if (hasData) handleAddFreelanceLink();
      // No validation blocking → go to next step anyway
    }

    // Step 5: optional skills
    if (currentStep === 5) {
      const hasSkill = newSkill.trim();
      if (hasSkill) handleAddSkills();
    }

    // Move to next step
    if (currentStep < 6) setCurrentStep(prev => prev + 1);
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
      freelancerName: '',
      email: '',
      photo: null,
      cv: null,
      password: '',
      skills: [],
      education: [],
      freelanceLinks: [],
      cvSummary: null
    });
    setPhotoPreview('');
    setCVPreview('');
    setNewEducation({
      institute: '',
      degree: '',
      startDate: '',
      endDate: '',
      note: ''
    });
    setNewFreelanceLink({
      label: '',
      url: ''
    });
    setEditingEducationIndex(null);
    setEditingFreelanceLinkIndex(null);
    setCurrentStep(1);
  };

  const handleGoToDashboard = () => {
    setShowSuccessModal(false);
    // Here you would typically navigate to the dashboard
    console.log('Navigating to dashboard...');
  };
  // 🟢 state
  const [editingFromReview, setEditingFromReview] = useState(false);
  const [editingStep, setEditingStep] = useState<number | null>(null);

  // 🟢 handle edit button inside review page
  const handleEditFromReview = (step: number) => {
    setEditingFromReview(true);   // mark that edit is from review
    setEditingStep(step);         // store which step
    setCurrentStep(step);         // jump to that step
  };


  // 🟢 when user updates data in that step
  const handleUpdateStepData = () => {
    // save changes in formData here if needed

    if (editingFromReview) {
      // ✅ after updating from review → go back to review step
      setCurrentStep(6); // review step
      setEditingFromReview(false);
      setEditingStep(null);
    } else {
      // ✅ normal flow → go to next step
      if (currentStep < 6) {
        setCurrentStep(prev => prev + 1);
      }
      setEditingStep(null);
    }
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl text-gray-800 mb-8">Freelancer - Basic Info</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                label="Freelancer Name"
                value={formData.freelancerName}
                onChange={(value) => handleInputChange('freelancerName', value)}
                error={formErrors.freelancerName}
                placeholder="Enter freelancer name"
              />
              <CustomInput
                label="Email ID"
                value={formData.email}
                onChange={(value) => handleInputChange('email', value)}
                error={formErrors.email}
                placeholder="Enter email ID"
                type="email"
              />
              <CustomInput
                label="Password"
                value={formData.password}
                onChange={(value) => handleInputChange('password', value)}
                error={formErrors.password}
                placeholder="Enter password"
                type="password"
              />
              <div className="space-y-3">
                <label className="text-sm text-gray-700 block">Upload photo</label>
                <div className="flex items-center gap-4">
                  <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="photo-upload"
                    type="file"
                    onChange={handlePhotoUpload}
                  />
                  <label htmlFor="photo-upload">
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

                  {photoPreview && (
                    <div className="flex items-center gap-3 animate-slide-in">
                      <div className="w-16 h-16 rounded-lg overflow-hidden border-2 border-gray-200 shadow-sm">
                        <img
                          src={photoPreview}
                          alt="Photo preview"
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
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl text-gray-800 mb-8">Upload CV</h2>

            <div className="space-y-4">
              <div className="space-y-3">
                <label className="text-sm text-gray-700 block">Upload CV</label>
                <div className="flex items-center gap-4">
                  <input
                    accept=".pdf,.doc,.docx"
                    style={{ display: 'none' }}
                    id="cv-upload"
                    type="file"
                    onChange={handleCvUpload}
                  />
                  <label htmlFor="cv-upload">
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

                  {cvPreview && (
                    <div className="flex items-center gap-3 animate-slide-in">
                      <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                        <span className="text-sm text-blue-700">{cvPreview}</span>
                      </div>
                    </div>
                  )}
                </div>

                {formErrors.cv && (
                  <p className="text-red-500 text-sm mt-1">{formErrors.cv}</p>
                )}

                {showUploadSuccess && (
                  <div className="flex items-center gap-2 text-green-600 bg-green-50 px-3 py-2 rounded-lg border border-green-200 animate-slide-down">
                    <CheckCircle className="w-4 h-4" />
                    <span className="text-sm">CV uploaded successfully</span>
                  </div>
                )}
              </div>

              {/* AI Processing Indicator */}
              {isProcessingCV && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <p className="text-blue-800">Processing your CV with AI...</p>
                      <p className="text-blue-600 text-sm">This may take a few moments</p>
                    </div>
                  </div>
                </div>
              )}

            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl text-gray-800 mb-8">Freelancer - Education</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Institute */}
              <Autocomplete
                freeSolo
                options={dummyInstitutes.map((option) => option.name)}
                value={newEducation.institute}
                onInputChange={(event, newInputValue) => {
                  setNewEducation((prev) => ({ ...prev, institute: newInputValue }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Institute"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

              {/* Degree Autocomplete */}
              <Autocomplete
                freeSolo
                options={dummyDegrees.map((option) => option.name)}
                value={newEducation.degree}
                onInputChange={(event, newInputValue) => {
                  setNewEducation((prev) => ({ ...prev, degree: newInputValue }));
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Degree"
                    variant="outlined"
                    fullWidth
                  />
                )}
              />

              {/* Start Date */}
              <CustomInput
                label="Start"
                value={newEducation.startDate}
                type="date"
                onChange={(value) => {
                  setNewEducation((prev) => ({ ...prev, startDate: value }));

                }}
                placeholder="dd/mm/yyyy"
              />

              {/* End Date */}
              <CustomInput
                label="End"
                value={newEducation.endDate}
                type="date"
                onChange={(value) => {
                  setNewEducation((prev) => ({ ...prev, endDate: value }));

                  const start = newEducation.startDate
                    ? new Date(newEducation.startDate)
                    : null;
                  const end = new Date(value);
                  const todayDate = new Date(today);

                  let error = "";
                  if (start && end <= start) {
                    error = "End date must be later than Start date";
                  }

                  setFormErrors((prev) => ({ ...prev, endDate: error }));
                }}
                error={formErrors.endDate}
                placeholder="dd/mm/yyyy"
              />
            </div>

            {/* Note */}
            <div className="space-y-2">
              <label className="text-sm text-gray-700 block">Note</label>
              <textarea
                value={newEducation.note}
                onChange={(e) =>
                  setNewEducation((prev) => ({ ...prev, note: e.target.value }))
                }
                placeholder="Add any additional notes about your education"
                rows={3}
                className="w-full px-4 py-3 bg-input-background rounded-lg border-2 border-gray-200 
                   focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500
                   hover:border-gray-300 transition-all duration-200 resize-none"
              />
            </div>

            {/* Buttons */}
            <div className="flex gap-3">
              <Button
                onClick={handleAddEducation}
                variant="contained"
                disabled={!newEducation.institute.trim() || !newEducation.degree.trim()}
                sx={{
                  borderRadius: "8px",
                  padding: "12px 20px",
                  background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                  minWidth: "auto",
                  "&:hover": {
                    background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                  },
                  "&:disabled": {
                    background: "#e5e7eb",
                    color: "#9ca3af",
                  },
                }}
              >
                <Add />
                {editingEducationIndex !== null
                  ? "Update Education"
                  : "Add Another Education"}
              </Button>

              {editingEducationIndex !== null && (
                <Button
                  onClick={handleCancelEditEducation}
                  variant="contained"
                  sx={{
                    borderRadius: "8px",
                    padding: "12px 20px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    minWidth: "auto",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    },
                    "&:disabled": {
                      background: "#e5e7eb",
                      color: "#9ca3af",
                    },
                  }}
                >
                  Cancel
                </Button>
              )}
            </div>

            {/* Education List */}
            {formData.education.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm text-gray-700 block">
                  Education Added:
                </label>
                <div className="space-y-3">
                  {formData.education.map((edu, index) => (
                    <div
                      key={index}
                      className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group"
                    >
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button
                          onClick={() => handleEditEducation(index)}
                          className="p-1 text-gray-400 hover:text-blue-500"
                          title="Edit education"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveEducation(index)}
                          className="p-1 text-gray-400 hover:text-red-500"
                          title="Remove education"
                        >
                          <DeleteIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Institute:</span>
                          <p className="text-gray-800">{edu.institute}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Degree:</span>
                          <p className="text-gray-800">{edu.degree}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Duration:</span>
                          <p className="text-gray-800">
                            {edu.startDate} {edu.endDate && `- ${edu.endDate}`}
                          </p>
                        </div>
                        {edu.note && (
                          <div className="md:col-span-2">
                            <span className="text-gray-600">Note:</span>
                            <p className="text-gray-800">{edu.note}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );
      case 4:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl text-gray-800 mb-8">Freelancer - Freelance Links</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <CustomInput
                label="Label"
                value={newFreelanceLink.label}
                onChange={(value) => setNewFreelanceLink(prev => ({ ...prev, label: value }))}
                placeholder="Portfolio/GitHub/etc"
              />
              <CustomInput
                label="URL"
                value={newFreelanceLink.url}
                onChange={(value) => setNewFreelanceLink(prev => ({ ...prev, url: value }))}
                placeholder="https://_____"
                type="url"
              />
            </div>

            <div className="flex gap-3">

              <Button
                onClick={handleAddFreelanceLink}
                variant="contained"
                disabled={!newFreelanceLink.label.trim() || !newFreelanceLink.url.trim()}
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
                {editingFreelanceLinkIndex !== null ? 'Update Links' : 'Add Another Links'}
              </Button>
              {editingFreelanceLinkIndex !== null && (
                <Button
                  onClick={handleCancelEditFreelanceLink}
                  variant="contained"
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
                  Cancel
                </Button>

              )}
            </div>

            {/* Freelance Links List */}
            {formData.freelanceLinks.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm text-gray-700 block">Links Added:</label>
                <div className="space-y-3">

                  {formData.freelanceLinks.map((link, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg border border-gray-200 relative group">
                      <div className="absolute top-2 right-2 flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">

                        <button
                          onClick={() => handleEditFreelanceLink(index)}
                          className="p-1 text-gray-400 hover:text-blue-500"
                          title="Edit link"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => handleRemoveFreelanceLink(index)}
                          className="p-1 text-gray-400 hover:text-red-500"
                          title="Remove link"
                        >
                          <DeleteIcon className="w-4 h-4" />
                        </button>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">

                        <h3>Added Educations:</h3>
                        <br />
                        <div>
                          <span className="text-gray-600">Label:</span>
                          <p className="text-gray-800">{link.label}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">URL:</span>
                          <a
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:text-blue-800 underline break-all"
                          >
                            {link.url}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        );

      case 5:
        return (
          <div className="space-y-6 animate-fade-in">
            <h2 className="text-2xl text-gray-800 mb-8">Freelancer - Skills</h2>

            <div className="space-y-4">
              {/* Input + Add Button in one row */}
              <div className="flex gap-3 items-center">
                {/* Autocomplete Input */}
                <Autocomplete
                  freeSolo
                  options={dummySkills.map(option => option.name)}
                  value={newSkill}
                  onInputChange={(event, newInputValue) => setNewSkill(newInputValue)}
                  onKeyPress={e => e.key === "Enter" && handleAddSkills()}
                  className="flex-1"
                  renderInput={params => (
                    <TextField
                      {...params}
                      placeholder="Add Skills"
                      variant="outlined"
                      fullWidth
                      sx={{
                        "& .MuiOutlinedInput-root": {
                          borderRadius: "8px",
                          backgroundColor: "#f9fafb",
                          borderColor: "#d1d5db",
                        },
                        "& .MuiOutlinedInput-root:hover": {
                          borderColor: "#9ca3af",
                        },
                        "& .MuiOutlinedInput-root.Mui-focused": {
                          borderColor: "#3b82f6",
                          boxShadow: "0 0 0 2px rgba(59, 130, 246, 0.2)",
                        },
                      }}
                    />
                  )}
                />

                {/* Add Button */}
                <Button
                  variant="contained"
                  onClick={handleAddSkills}
                  disabled={!newSkill.trim()}
                  sx={{
                    borderRadius: "8px",
                    padding: "10px 20px",
                    background: "linear-gradient(135deg, #3b82f6 0%, #8b5cf6 100%)",
                    minWidth: "auto",
                    "&:hover": {
                      background: "linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)",
                    },
                    "&:disabled": {
                      background: "#e5e7eb",
                      color: "#9ca3af",
                    },
                  }}
                >
                  <Add />
                </Button>
              </div>

              {/* Skills Added */}
              <div className="space-y-3">
                <label className="text-sm text-gray-700 block">Skills Added:</label>
                <div
                  className={`p-4 bg-gray-50 rounded-lg border border-gray-200 w-full ${formData.skills.length > 10 ? "h-[200px] overflow-y-auto" : "min-h-[100px]"
                    }`}
                >
                  {formData.skills.length > 0 ? (
                    <div className="grid grid-cols-1 gap-2 w-full">
                      {Array.from({ length: Math.ceil(formData.skills.length / 5) }, (_, rowIndex) => (
                        <div key={rowIndex} className="flex flex-wrap gap-2 justify-start">
                          {formData.skills
                            .slice(rowIndex * 5, (rowIndex + 1) * 5)
                            .map((tag, tagIndex) => {
                              const actualIndex = rowIndex * 5 + tagIndex;
                              return (
                                <Chip
                                  key={actualIndex}
                                  label={tag}
                                  onDelete={() => handleRemoveSkill(tag)}
                                  deleteIcon={<Close />}
                                  sx={{
                                    backgroundColor: "#dbeafe",
                                    color: "#1d4ed8",
                                    borderRadius: "6px",
                                    height: "30px",
                                    fontSize: "12px",
                                    maxWidth: "120px",
                                    animation: "slideIn 0.3s ease-out",
                                    "& .MuiChip-deleteIcon": {
                                      color: "#1d4ed8",
                                      fontSize: "16px",
                                      "&:hover": { color: "#1e40af" },
                                    },
                                    "& .MuiChip-label": {
                                      paddingLeft: "6px",
                                      paddingRight: "4px",
                                      overflow: "hidden",
                                      textOverflow: "ellipsis",
                                      whiteSpace: "nowrap",
                                      maxWidth: "80px",
                                    },
                                  }}
                                />
                              );
                            })}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex items-center justify-center h-full min-h-[40px]">
                      <p className="text-gray-500 italic">No tags added yet</p>
                    </div>
                  )}
                </div>

                {formData.skills.length > 0 && (
                  <div className="text-xs text-gray-500">
                    <span>
                      {formData.skills.length} skill{formData.skills.length !== 1 ? "s" : ""} added
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );


      case 6:
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
          '& .MuiAlert-icon': { color: '#3b82f6' },
        }}
      >
        Please review all information before submitting your registration.
      </Alert>

      {/* Basic Information */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg text-gray-800">Basic Information</h3>
          <Button
            variant="text"
            startIcon={<Edit />}
            onClick={() => handleEditFromReview(1)}
            sx={{
              color: '#3b82f6',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#eff6ff' },
            }}
          >
            Edit
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Freelancer Name:</p>
            <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
              {formData.freelancerName || 'Not provided'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Email:</p>
            <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
              {formData.email || 'Not provided'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Password:</p>
            <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
              {formData.password ? '*'.repeat(formData.password.length) : 'Not provided'}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Photo:</p>
            {photoPreview ? (
              <div className="w-20 h-20 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                <img src={photoPreview} alt="Photo" className="w-full h-full object-cover" />
              </div>
            ) : (
              <p className="text-gray-400 italic bg-gray-50 px-3 py-2 rounded-lg">No photo uploaded</p>
            )}
          </div>
        </div>
      </div>

      {/* CV Information */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg text-gray-800">CV Information</h3>
          <Button
            variant="text"
            startIcon={<Edit />}
            onClick={() => handleEditFromReview(2)}
            sx={{
              color: '#3b82f6',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#eff6ff' },
            }}
          >
            Edit
          </Button>
        </div>

        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-1">
              <p className="text-sm text-gray-600">CV:</p>
              {cvPreview ? (
                <div className="flex items-center gap-3 animate-slide-in">
                  <div className="flex items-center gap-2 bg-blue-50 px-3 py-2 rounded-lg border border-blue-200">
                    <span className="text-sm text-blue-700">{cvPreview}</span>
                  </div>
                </div>
              ) : (
                <p className="text-gray-400 italic bg-gray-50 px-3 py-2 rounded-lg">No CV uploaded</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Experience:</p>
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                {formData.cvSummary?.experience || 'Not provided'}
              </p>
            </div>
            <div className="space-y-1">
              <p className="text-sm text-gray-600">Education:</p>
              <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
                {formData.cvSummary?.education || 'Not provided'}
              </p>
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-sm text-gray-600">Summary:</p>
            <p className="text-gray-800 bg-gray-50 px-3 py-2 rounded-lg">
              {formData.cvSummary?.summary || 'Not provided'}
            </p>
          </div>
        </div>
      </div>

      {/* Education Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg text-gray-800">Education</h3>
          <Button
            variant="text"
            startIcon={<Edit />}
            onClick={() => handleEditFromReview(3)}
            sx={{
              color: '#3b82f6',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#eff6ff' },
            }}
          >
            Edit
          </Button>
        </div>

        <div className="space-y-3">
          {formData.education.length > 0 ? (
            formData.education.map((edu, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                  <div>
                    <span className="text-gray-600">Institute:</span>
                    <p className="text-gray-800">{edu.institute || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Degree:</span>
                    <p className="text-gray-800">{edu.degree || 'Not provided'}</p>
                  </div>
                  <div>
                    <span className="text-gray-600">Duration:</span>
                    <p className="text-gray-800">
                      {edu.startDate || 'Not provided'} {edu.endDate && `- ${edu.endDate}`}
                    </p>
                  </div>
                  {edu.note && (
                    <div className="md:col-span-2">
                      <span className="text-gray-600">Note:</span>
                      <p className="text-gray-800">{edu.note}</p>
                    </div>
                  )}
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic text-center">No education added</p>
          )}
        </div>
      </div>

      {/* Freelance Links Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg text-gray-800">Freelance Links</h3>
          <Button
            variant="text"
            startIcon={<Edit />}
            onClick={() => handleEditFromReview(4)}
            sx={{
              color: '#3b82f6',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#eff6ff' },
            }}
          >
            Edit
          </Button>
        </div>

        <div className="space-y-3">
          {formData.freelanceLinks.length > 0 ? (
            formData.freelanceLinks.map((link, index) => (
              <div
                key={index}
                className="bg-gray-50 p-4 rounded-lg cursor-pointer hover:bg-gray-100"
                onClick={() => window.open(link.url, "_blank")}
              >
                <p className="text-blue-600 hover:text-blue-800 underline text-sm">
                  {link.label || link.url}
                </p>
              </div>
            ))
          ) : (
            <p className="text-gray-400 italic text-center">No freelance links added</p>
          )}
        </div>
      </div>

      {/* Skills Section */}
      <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg text-gray-800">Skills</h3>
          <Button
            variant="text"
            startIcon={<Edit />}
            onClick={() => handleEditFromReview(5)}
            sx={{
              color: '#3b82f6',
              textTransform: 'none',
              borderRadius: '8px',
              '&:hover': { backgroundColor: '#eff6ff' },
            }}
          >
            Edit
          </Button>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg min-h-[80px] flex items-center">
          <div className="flex flex-wrap gap-2 w-full">
            {formData.skills.length > 0 ? (
              formData.skills.map((tag, index) => (
                <Chip
                  key={index}
                  label={tag}
                  sx={{ backgroundColor: '#dbeafe', color: '#1d4ed8', borderRadius: '6px' }}
                />
              ))
            ) : (
                    <p className="text-gray-400 italic w-full text-center">No skills added</p>
                  )}
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div className="text-center py-12">
            <h2 className="text-xl text-gray-600">Step {currentStep} - Coming Soon</h2>
          </div>
        );
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

              <div className="absolute -top-1 -right-1 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full animate-ping"></div>
            </div>
            <div>
              <h1 className="text-2xl bg-gradient-to-r from-blue-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent tracking-wide">
                BHARATGIG
              </h1>
              <p className="text-xs text-gray-600">Freelancer Registration</p>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-4xl mx-auto px-6 py-8 animate-fade-in-up">
          {/* Stepper */}
          <StepperWrapper currentStep={currentStep} steps={steps} />

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

            {editingFromReview && editingStep === currentStep ? (
              <Button
                variant="contained"
                onClick={handleUpdateStepData}
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
                Update Data
              </Button>
            ) : currentStep < 6 ? (
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
        freelancerName={formData.freelancerName}
        onRegisterAnother={handleRegisterAnother}
        onGoToDashboard={handleGoToDashboard}
      />

      <style>{`
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
        .animate-fade-in { animation: fade-in 0.6s ease-out; }
        .animate-slide-in { animation: slide-in 0.5s ease-out; }
        .animate-slide-down { animation: slide-down 0.4s ease-out; }
        .animate-fade-in-up { animation: fade-in-up 0.8s ease-out; }
        .animate-scale-in { animation: scale-in 0.4s ease-out; }
        .delay-200 { animation-delay: 0.2s; }
      `}</style>
    </div>
  );
}