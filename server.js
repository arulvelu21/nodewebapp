const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

// Health check endpoint (useful for monitoring)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'UP', version: '1.0.0' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
}); 