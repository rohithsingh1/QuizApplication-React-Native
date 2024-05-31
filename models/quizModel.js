const { database } = require("../config/dbConfig");

const quizzesCollection = async ()=>{
    try {
      // Here Iam creating Schema for quizCollection
      const quizCollection = await database.createCollection("quizzes", {
        validator: {
          $jsonSchema: {
            bsonType: "object",
            required: ["title", "description", "timer", "points", "ownerId"],
            properties: {
              title: {
                bsonType: "string",
              },
              description: {
                bsonType: "string",
              },
              timer: {
                bsonType: "string",
              },
              points: {
                bsonType: "string",
              },
              ownerId: {
                bsonType: "objectId",
              },
              questions: {
                bsonType: "array",
                items: {
                  bsonType: "objectId",
                },
              },
              updatedAt: {
                bsonType: "date",
              },
            },
          },
        },
      });

      return quizCollection;
    } catch (error) {
        console.log("error = ", error);
        throw new Error(error);
    }
}


module.exports = {
    quizzesCollection
}