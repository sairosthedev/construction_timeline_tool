const axios = require('axios');

const MAX_RETRIES = 3;
const RETRY_DELAY = 1000;

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Mock ML prediction
const calculateMockPrediction = (resources, weatherScore, previousDelays) => {
  // Basic linear model for testing
  const baseDelay = 5; // base delay in days
  const resourceFactor = Math.max(0, (10 - resources) / 2);
  const weatherFactor = weatherScore * 2;
  const historyFactor = previousDelays * 0.5;
  
  return Math.round(baseDelay + resourceFactor + weatherFactor + historyFactor);
};

exports.predict = async (req, res) => {
  try {
    const { resources, weatherConditions, previousDelays = 0 } = req.body;

    // Validate inputs
    if (!resources || !weatherConditions) {
      return res.status(400).json({ 
        success: false,
        error: 'Missing required fields' 
      });
    }

    const weatherScores = { 'Good': 1, 'Fair': 2, 'Poor': 3 };
    const weatherScore = weatherScores[weatherConditions];

    if (!weatherScore) {
      return res.status(400).json({ 
        success: false,
        error: 'Invalid weather conditions' 
      });
    }

    // Calculate mock prediction
    const prediction = calculateMockPrediction(
      parseInt(resources), 
      weatherScore, 
      parseInt(previousDelays)
    );

    return res.json({
      success: true,
      prediction: {
        estimated_delay: prediction,
        confidence_score: 0.85,
        factors: {
          resources,
          weather: weatherConditions,
          previous_delays: previousDelays
        }
      }
    });

  } catch (err) {
    console.error('Prediction error:', err);
    res.status(500).json({
      success: false,
      error: 'Error processing prediction request'
    });
  }
};
