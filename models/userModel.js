const { database } = require("../config/dbConfig");

const usersCollection = async ()=>{
    try {
      // Here Iam creating Schema for userCollection
      const userCollection = await database.createCollection("users", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["userName", "email", "password"],
            properties: {
              userName: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              email: {
                bsonType: "string",
                description: "must be a string and is required",
              },
              password: {
                bsonType: "string",
                description: "must be a string and is required",
              },
            },
          },
        },
      });
      return userCollection;
    } catch (error) {
        console.log("error = ", error);
        throw new Error(error);
    }
}

module.exports = {
    usersCollection
}
