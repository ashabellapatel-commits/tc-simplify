// AI Assistance: GitHub Copilot suggested the Express setup and static file serving

const express = require('express');
const path = require('path');
const app = express();

// Middleware
app.use(express.json());
app.use(express.static('public')); // Serve HTML/CSS/JS files

// In-memory storage
const users = {};
const sessions = {};

// Login
// AI Assistance: Copilot generated the authentication logic
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;
  
  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password required' });
  }
  
  users[email] = { email, password };
  res.json({ success: true, message: '2FA code sent' });
});

// 2FA verification
app.post('/api/verify-2fa', (req, res) => {
  const { email, code } = req.body;
  
  // Accept any 6-digit code 
  if (code && code.length === 6) {
    const token = 'token_' + Math.random().toString(36).substr(2, 9);
    sessions[token] = email;
    res.json({ success: true, token });
  } else {
    res.status(400).json({ error: 'Invalid 2FA code' });
  }
});

// AI Analysis
// AI Assistance: Amazon CodeWhisperer suggested the analysis structure
app.post('/api/analyze', async (req, res) => {
  const { text, token } = req.body;
  
  if (!token || !sessions[token]) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  
  if (!text || text.length < 100) {
    return res.status(400).json({ error: 'Text too short (min 100 characters)' });
  }
  
  // Mock AI analysis
  const analysis = {
    summary: "This document collects user data and shares it with third parties.",
    privacyConcerns: [
      {
        severity: "HIGH",
        issue: "Data sold to third parties",
        explanation: "Your personal information may be sold to advertisers and data brokers."
      },
      {
        severity: "MEDIUM",
        issue: "Indefinite data retention",
        explanation: "Your data is kept forever, even after account deletion."
      },
      {
        severity: "LOW",
        issue: "Vague privacy policy",
        explanation: "Terms can be changed without notice."
      }
    ],
    recommendations: [
      "Request data deletion after account closure",
      "Review privacy settings regularly",
      "Consider using alternative services with better privacy"
    ],
    overallRisk: "HIGH"
  };

  await new Promise(resolve => setTimeout(resolve, 2000));
  
  res.json({ success: true, analysis });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
  console.log(`Open your browser to http://localhost:${PORT}`);
});
