import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/posts.mjs";
import mongoose from "mongoose";
const bodyParser = require('body-parser');
const FavoriteRecipe = require('./models/FavoriteRecipe');

const PORT = process.env.PORT || 5050;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
const app = express();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Load the /posts routes
app.use("/cars", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.post('/api/favorites', async (req, res) => {
  try {
    const recipe = new FavoriteRecipe(req.body);
    await recipe.save();
    res.status(201).send('Saved to favorites!');
  } catch (err) {
    res.status(500).send('Error saving recipe');
  }
});

// Get all favorites
app.get('/api/favorites', async (req, res) => {
  try {
    const recipes = await FavoriteRecipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Error fetching favorites');
  }
});

mongoose.connect('mongodb+srv://s00250500:rzIxGJEGbhe9j9UF@cluster0.fyhiqa7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
}).then(() => console.log('MongoDB connected'));
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
