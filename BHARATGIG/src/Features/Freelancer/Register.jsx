import React, { useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  IconButton,
  TextField,
  Button,
  Typography,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

const steps = [
  "Upload CV",
  "Basic Info",
  "Education",
  "Freelance Links",
  "Skills",
  "Review & Submit",
];

export default function Register() {
  const [activeStep, setActiveStep] = useState(0);
  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    cvFile: null,
    summary: "",
    email: "",
    password: "",
    name: "",
    photo: null,
    education: [{ institute: "", degree: "", start: "", end: "", note: "" }],
    links: [{ label: "", url: "" }],
    skills: [],
  });

  // handle input change
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // handle file upload
  const handleFileUpload = (e, field) => {
    setFormData({ ...formData, [field]: e.target.files[0] });
  };

  // Education - Add new
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [
        ...formData.education,
        { institute: "", degree: "", start: "", end: "", note: "" },
      ],
    });
  };

  // Education - Change
  const handleEducationChange = (index, e) => {
    const updated = [...formData.education];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, education: updated });
  };

  // Links - Add new
  const addLink = () => {
    setFormData({
      ...formData,
      links: [...formData.links, { label: "", url: "" }],
    });
  };

  // Links - Change
  const handleLinkChange = (index, e) => {
    const updated = [...formData.links];
    updated[index][e.target.name] = e.target.value;
    setFormData({ ...formData, links: updated });
  };

  // Skills - Add new
  const addSkill = (skill) => {
    if (skill && !formData.skills.includes(skill)) {
      setFormData({ ...formData, skills: [...formData.skills, skill] });
    }
  };

  // Step navigation
  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      alert("Form Submitted!\n");
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prev) => prev - 1);
  };

  // Render step content
  const renderStepContent = (step) => {
    switch (step) {
      case 0: // Upload CV
        return (
          <div className="flex flex-col gap-4">
            <Button variant="outlined" component="label">
              Upload CV
              <input
                type="file"
                hidden
                onChange={(e) => handleFileUpload(e, "cvFile")}
              />
            </Button>
            {formData.cvFile && (
              <Typography>{formData.cvFile.name}</Typography>
            )}
            <TextField
              label="Summary of CV"
              name="summary"
              value={formData.summary}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </div>
        );

      case 1: // Basic Info
        return (
          <div className="flex flex-col gap-4">
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="outlined" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                onChange={(e) => handleFileUpload(e, "photo")}
              />
            </Button>
            {formData.photo && (
              <Typography>{formData.photo.name}</Typography>
            )}
          </div>
        );

      case 2: // Education
        return (
          <div className="flex flex-col gap-6">
            {formData.education.map((edu, i) => (
              <div key={i} className="flex flex-col gap-2">
                <TextField
                  label="Institute"
                  name="institute"
                  value={edu.institute}
                  onChange={(e) => handleEducationChange(i, e)}
                />
                <TextField
                  label="Degree"
                  name="degree"
                  value={edu.degree}
                  onChange={(e) => handleEducationChange(i, e)}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <TextField
                    type="date"
                    label="Start"
                    name="start"
                    InputLabelProps={{ shrink: true }}
                    value={edu.start}
                    onChange={(e) => handleEducationChange(i, e)}
                  />
                  <TextField
                    type="date"
                    label="End"
                    name="end"
                    InputLabelProps={{ shrink: true }}
                    value={edu.end}
                    onChange={(e) => handleEducationChange(i, e)}
                  />
                </div>
                <TextField
                  label="Note"
                  name="note"
                  value={edu.note}
                  onChange={(e) => handleEducationChange(i, e)}
                />
              </div>
            ))}
            <Button startIcon={<AddCircleOutlineIcon />} onClick={addEducation}>
              Add Another Education
            </Button>
          </div>
        );

      case 3: // Freelance Links
        return (
          <div className="flex flex-col gap-6">
            {formData.links.map((link, i) => (
              <div key={i} className="flex flex-col gap-2">
                <TextField
                  label="Label"
                  name="label"
                  value={link.label}
                  onChange={(e) => handleLinkChange(i, e)}
                />
                <TextField
                  label="URL"
                  name="url"
                  value={link.url}
                  onChange={(e) => handleLinkChange(i, e)}
                />
              </div>
            ))}
            <Button startIcon={<AddCircleOutlineIcon />} onClick={addLink}>
              Add Another Link
            </Button>
          </div>
        );

      case 4: // Skills
        return (
          <div className="flex flex-col gap-4">
            <TextField
              label="Add Skill"
              size="small"
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSkill(e.target.value);
                  e.target.value = "";
                }
              }}
            />
            <div className="flex flex-wrap gap-2">
              {formData.skills.map((s, i) => (
                <span
                  key={i}
                  className="px-3 py-1 border rounded-full text-sm bg-gray-100"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>
        );

      case 5: // Review
        return (
          <div>
            <Typography variant="h6">Review Your Details</Typography>
            <pre className="text-sm bg-gray-100 p-3 rounded-md overflow-x-auto">
              {JSON.stringify(formData, null, 2)}
            </pre>
          </div>
        );

      default:
        return "Unknown Step";
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-6 p-6 bg-white rounded-xl shadow-md">
      <div className="flex justify-center mb-4">
        <img src="vite.svg" alt="Logo" className="w-20 h-auto" />
      </div>

      <h2 className="text-xl font-semibold text-center mb-6">Sign up</h2>

      <Stepper activeStep={activeStep} alternativeLabel>
        {steps.map((label) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
          </Step>
        ))}
      </Stepper>

      <div className="mt-6">{renderStepContent(activeStep)}</div>

      <div className="flex justify-between items-center mt-6">
        <IconButton
          disabled={activeStep === 0}
          onClick={handleBack}
          color="primary"
        >
          <ArrowBackIosNewIcon />
        </IconButton>

        <Button onClick={handleNext} color="primary">
          {activeStep === steps.length - 1 ? "Submit" : <ArrowForwardIosIcon />}
        </Button>
      </div>
    </div>
  );
}
