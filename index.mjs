import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import "express-async-errors";
import posts from "./routes/posts.mjs";
import mongoose from "mongoose";

const FavouriteRecipe = require('./models/FavouritesRecipe');

const app = express(); // ✅ First, create the app

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

// Add routes and Mongo connection here...

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
const PORT = process.env.PORT || 5050;

// Load the /posts routes
app.use("/favourites", posts);

// Global error handling
app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})

app.post('/api/favourites', async (req, res) => {
  try {
    const recipe = new FavouriteRecipe(req.body);
    await recipe.save();
    res.status(201).send('Saved to favourites!');
  } catch (err) {
    res.status(500).send('Error saving recipe');
  }
});

// Get all favorites
app.get('/api/favourites', async (req, res) => {
  try {
    const recipes = await FavouriteRecipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Error fetching favourites');
  }
});

mongoose.connect('mongodb+srv://s00250500:rzIxGJEGbhe9j9UF@cluster0.fyhiqa7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true, 
}).then(() => console.log('MongoDB connected'));
