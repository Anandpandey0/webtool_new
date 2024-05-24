const mongoose = require('mongoose');

// Define Schema
const bhoomiScoreSchema = new mongoose.Schema({
    farm_id: Number,
    // Rabi crops
    "2019_Rabi": Number,
    "2020_Rabi": Number,
    "2021_Rabi": Number,
    "2018_Rabi": Number,
    "2022_Rabi": Number,
    "2023_Rabi": Number,
    // Kharif crops
    "2019_Kharib": Number,
    "2020_Kharib": Number,
    "2021_Kharib": Number,
    "2022_Kharib": Number,
    "2023_Kharib": Number,
    Name: String,
    Age: Number,
    Sex: String,
    Area: Number,
    // Rabi crops details
    crop_1_rabi: String,
    value_1_rabi: Number,
    crop_2_rabi: String,
    value_2_rabi: Number,
    crop_3_rabi: String,
    value_3_rabi: Number,
    // Kharif crops details
    crop_1_kharif: String,
    value_1_kharif: Number,
    crop_2_kharif: String,
    value_2_kharif: Number,
    crop_3_kharif: String,
    value_3_kharif: Number,
    Village: String,
    Kharif_soil: Number,
    Rabi_Soil: Number,
    Current_rabi: String,
    Current_Kharif: String
});

mongoose.models = {};
const BhoomiScore = mongoose.model("bhoomiScore", bhoomiScoreSchema);

export default BhoomiScore;