const mongoose = require('mongoose');

const RecipeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  nutrition: Object,
  readyInMinutes: Number,
  servings: Number
});

module.exports = mongoose.model('FavouriteRecipe', RecipeSchema);
