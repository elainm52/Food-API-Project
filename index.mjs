import express from "express";
import cors from "cors";
import "./loadEnvironment.mjs";
import posts from "./routes/posts.mjs";
import mongoose from "mongoose";
import bodyParser from 'body-parser';                
import FavouriteRecipe from './models/FavouritesRecipe.js';

const app = express(); 
const PORT = process.env.PORT || 5050;

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());

app.post('/api/favorites', async (req, res) => {
  try {
    const recipe = new FavouriteRecipe(req.body);
    await recipe.save();
    res.status(201).send('Saved to favourites!');
  } catch (err) {
    res.status(500).send('Error saving recipe');
  }
});

app.delete('/api/favorites/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await FavouriteRecipe.findByIdAndDelete(id);
    res.status(200).send('Deleted from favourites!');
  } catch (err) {
    res.status(500).send('Error deleting recipe');
  }
}
);


app.get('/api/favorites', async (req, res) => {
  try {
    const recipes = await FavouriteRecipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).send('Error fetching favourites');
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



app.use("/favorites", posts);


app.use((err, _req, res, next) => {
  res.status(500).send("Uh oh! An unexpected error occured.")
})



mongoose.connect('mongodb+srv://s00250500:rzIxGJEGbhe9j9UF@cluster0.fyhiqa7.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
