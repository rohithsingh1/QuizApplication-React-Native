const { MongoClient } = require("mongodb");
require("dotenv").config();

const client = new MongoClient(process.env.MONGODBURL);

const connectToDatabase = () => {
  try {
    // Here we created a new Database "quizDB"
    const database = client.db("quizDB");
    console.log("connected to database successfully");
    return database
  } catch (error) {
    console.error("error = ", error);
    throw new Error(error);
  }
};

const database = connectToDatabase();

module.exports = {
  database,
};
