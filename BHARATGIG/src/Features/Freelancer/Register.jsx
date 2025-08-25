import React, { useRef, useState } from "react";
import {
  Stepper,
  Step,
  StepLabel,
  IconButton,
  TextField,
  Button,
  Typography,
  Alert,
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
  const [error, setError] = useState("");

  const formRef = useRef({
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

  const [, forceUpdate] = useState(0);
  const refresh = () => forceUpdate((prev) => prev + 1);

  const handleChange = (e) => {
    formRef.current[e.target.name] = e.target.value;
  };

  const handleFileUpload = (e, field) => {
    formRef.current[field] = e.target.files[0];
    refresh();
  };

  const handleEducationChange = (index, e) => {
    formRef.current.education[index][e.target.name] = e.target.value;
    refresh();
  };
  const addEducation = () => {
    formRef.current.education.push({
      institute: "",
      degree: "",
      start: "",
      end: "",
      note: "",
    });
    refresh();
  };

  const handleLinkChange = (index, e) => {
    formRef.current.links[index][e.target.name] = e.target.value;
    refresh();
  };
  const addLink = () => {
    formRef.current.links.push({ label: "", url: "" });
    refresh();
  };

  const handleNext = () => {
    setError("");

    // Validation
    switch (activeStep) {
      case 0:
        if (!formRef.current.cvFile) {
          setError("Please upload your CV.");
          return;
        }
        if (!formRef.current.summary.trim()) {
          setError("Please enter a summary of your CV.");
          return;
        }
        break;
      case 1:
        if (!formRef.current.name.trim()) {
          setError("Name is required.");
          return;
        }
        if (!formRef.current.email.trim()) {
          setError("Email is required.");
          return;
        }
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formRef.current.email)) {
          setError("Please enter a valid email address.");
          return;
        }
        if (!formRef.current.password) {
          setError("Password is required.");
          return;
        }
        if (formRef.current.password.length < 6) {
          setError("Password must be at least 6 characters.");
          return;
        }
        if (!formRef.current.photo) {
          setError("Please upload a photo.");
          return;
        }
        break;
      case 4:
        if (formRef.current.skills.length === 0) {
          setError("Please enter at least one skill.");
          return;
        }
        break;
      default:
        break;
    }

    if (activeStep === steps.length - 1) {
      console.log("Final Submitted Data:", formRef.current);
      alert("Form submitted successfully!");
    } else {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => setActiveStep((prev) => prev - 1);

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div className="flex flex-col gap-4">
            {error && <Alert severity="error">{error}</Alert>}
            <Button variant="outlined" component="label">
              Upload CV
              <input
                type="file"
                hidden
                accept=".pdf,.doc,.docx"
                onChange={(e) => handleFileUpload(e, "cvFile")}
              />
            </Button>
            {formRef.current.cvFile && (
              <div className="mt-2">
                <Typography>{formRef.current.cvFile.name}</Typography>
                {formRef.current.cvFile.type === "application/pdf" && (
                  <iframe
                    src={URL.createObjectURL(formRef.current.cvFile)}
                    width="100%"
                    height="300px"
                    title="CV Preview"
                  ></iframe>
                )}
              </div>
            )}
            <TextField
              label="Summary of CV"
              name="summary"
              defaultValue={formRef.current.summary}
              onChange={handleChange}
              fullWidth
              multiline
            />
          </div>
        );
      case 1:
        return (
          <div className="flex flex-col gap-4">
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Email"
              name="email"
              defaultValue={formRef.current.email}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Password"
              name="password"
              type={showPassword ? "text" : "password"}
              defaultValue={formRef.current.password}
              onChange={handleChange}
              fullWidth
            />
            <TextField
              label="Name"
              name="name"
              defaultValue={formRef.current.name}
              onChange={handleChange}
              fullWidth
            />
            <Button variant="outlined" component="label">
              Upload Photo
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => handleFileUpload(e, "photo")}
              />
            </Button>
            {formRef.current.photo && (
              <div className="mt-2">
                <img
                  src={URL.createObjectURL(formRef.current.photo)}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-md border"
                />
              </div>
            )}
          </div>
        );
      case 2:
        return (
          <div className="flex flex-col gap-6">
            {formRef.current.education.map((edu, i) => (
              <div key={i} className="flex flex-col gap-2">
                <TextField
                  label="Institute"
                  name="institute"
                  defaultValue={edu.institute}
                  onChange={(e) => handleEducationChange(i, e)}
                />
                <TextField
                  label="Degree"
                  name="degree"
                  defaultValue={edu.degree}
                  onChange={(e) => handleEducationChange(i, e)}
                />
                <div className="flex flex-col sm:flex-row gap-3">
                  <TextField
                    type="date"
                    label="Start"
                    name="start"
                    InputLabelProps={{ shrink: true }}
                    defaultValue={edu.start}
                    onChange={(e) => handleEducationChange(i, e)}
                  />
                  <TextField
                    type="date"
                    label="End"
                    name="end"
                    InputLabelProps={{ shrink: true }}
                    defaultValue={edu.end}
                    onChange={(e) => {
                      handleEducationChange(i, e);
                      // Validation: ensure end date is after start date
                      if (edu.start && e.target.value < edu.start) {
                        alert("End Date must be after Start Date");
                        handleEducationChange(i, { target: { name: "end", value: "" } });
                      }
                    }}
                    InputProps={{
                      inputProps: {
                        min: edu.start || undefined, 
                      },
                    }}
                  />
                </div>

                <TextField
                  label="Note"
                  name="note"
                  defaultValue={edu.note}
                  onChange={(e) => handleEducationChange(i, e)}
                />
              </div>
            ))}
            <Button startIcon={<AddCircleOutlineIcon />} onClick={addEducation}>
              Add Another Education
            </Button>
          </div>
        );
      case 3:
        return (
          <div className="flex flex-col gap-6">
            {formRef.current.links.map((link, i) => (
              <div key={i} className="flex flex-col gap-2">
                <TextField
                  label="Label"
                  name="label"
                  defaultValue={link.label}
                  onChange={(e) => handleLinkChange(i, e)}
                />
                <TextField
                  label="URL"
                  name="url"
                  defaultValue={link.url}
                  onChange={(e) => handleLinkChange(i, e)}
                />
              </div>
            ))}
            <Button startIcon={<AddCircleOutlineIcon />} onClick={addLink}>
              Add Another Link
            </Button>
          </div>
        );
      case 4:
        return (
          <div className="flex flex-col gap-4">
            {error && <Alert severity="error">{error}</Alert>}
            <TextField
              label="Skills (comma separated)"
              size="small"
              defaultValue={formRef.current.skills.join(", ")}
              onChange={(e) => {
                formRef.current.skills = e.target.value
                  .split(",")
                  .map((s) => s.trim())
                  .filter((s) => s);
              }}
              fullWidth
            />
            <div className="flex flex-wrap gap-2">
              {formRef.current.skills.map((s, i) => (
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
      case 5:
        return (
          <div className="flex flex-col gap-4">
            <Typography variant="h6" className="mb-2">
              Review Your Details
            </Typography>

            <div>
              <Typography className="font-semibold">Name:</Typography>
              <Typography>{formRef.current.name}</Typography>
            </div>

            <div>
              <Typography className="font-semibold">Email:</Typography>
              <Typography>{formRef.current.email}</Typography>
            </div>

            <div>
              <Typography className="font-semibold">Password:</Typography>
              <Typography>{"*".repeat(formRef.current.password.length)}</Typography>
            </div>

            <div className="flex flex-col items-center">
              <Typography className="font-semibold mb-1">Photo:</Typography>
              {formRef.current.photo && (
                <img
                  src={URL.createObjectURL(formRef.current.photo)}
                  alt="Photo Preview"
                  className="w-32 h-32 object-cover rounded-md border"
                />
              )}
            </div>


            <div>
              <Typography className="font-semibold">CV:</Typography>
              {formRef.current.cvFile && (
                <Typography>{formRef.current.cvFile.name}</Typography>
              )}
            </div>

            <div>
              <Typography className="font-semibold">CV Summary:</Typography>
              <Typography>{formRef.current.summary}</Typography>
            </div>

            <div>
              <Typography className="font-semibold">Education:</Typography>
              {formRef.current.education.map((edu, i) => (
                <div key={i} className="ml-4 mb-2">
                  <Typography>
                    {edu.institute} — {edu.degree} ({edu.start} to {edu.end})
                  </Typography>
                  {edu.note && <Typography className="text-sm">Note: {edu.note}</Typography>}
                </div>
              ))}
            </div>

            <div>
              <Typography className="font-semibold">Freelance Links:</Typography>
              {formRef.current.links.map((link, i) => (
                <div key={i} className="ml-4 mb-1">
                  <Typography>
                    {link.label}: {link.url}
                  </Typography>
                </div>
              ))}
            </div>

            <div>
              <Typography className="font-semibold">Skills:</Typography>
              <Typography>{formRef.current.skills.join(", ")}</Typography>
            </div>
          </div>
        );

      default:
        return "Unknown Step";
    }
  };

  return (
    <div className="relative w-full max-w-3xl mx-auto mt-16 " >
      <div className="bg-white rounded-xl shadow-lg pt-20 pb-8 px-6 relative">
        <div className="absolute -top-12 left-1/2 transform -translate-x-1/2">
          <img
            src="logo.png"
            alt="Logo"
            className="w-24 h-24 rounded-full border-4 border-white shadow-md object-cover"
          />
        </div>

        <h2 className="text-2xl font-bold text-center mb-6">Sign Up</h2>

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

          <Button
            onClick={handleNext}
            color="primary"
            variant="contained"
            className="px-6 py-2"
          >
            {activeStep === steps.length - 1 ? "Submit" : <ArrowForwardIosIcon />}
          </Button>
        </div>

        {/* Login link */}
        <Typography className="mt-4 text-center text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-blue-600 underline">
            Login
          </a>
        </Typography>
      </div>
    </div>
  );
}
