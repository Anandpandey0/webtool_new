// models/VillageModel.js

const mongoose = require('mongoose');

// Define schema
const villageSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true
  },
  features: [{
    type: {
      type: String,
      required: true
    },
    geometry: {
      type: {
        type: String,
        required: true
      },
      coordinates: {
        type: [[[Number]]], // Nested array of arrays of numbers (coordinates)
        required: true
      }
    },
    properties: {
      id: {
        type: Number,
        required: true
      },
      Village: {
        type: String,
        required: true
      }
    }
  }]
});

// Create model
const VillageModel = mongoose.model('Village', villageSchema);

module.exports = VillageModel;
