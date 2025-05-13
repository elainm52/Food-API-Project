import mongoose from 'mongoose';

const RecipeSchema = new mongoose.Schema({
  id: Number,
  title: String,
  image: String,
  nutrition: Object,
  readyInMinutes: Number,
  servings: Number
  }, {
  timestamps: true
});

const FavouriteRecipe = mongoose.model('FavouriteRecipe', RecipeSchema);
export default FavouriteRecipe;