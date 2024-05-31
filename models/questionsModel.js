const { database } = require("../config/dbConfig");


const questionsCollection = async ()=>{
    try {
      // Here Iam creating Schema for questionCollection
        const questionCollection = await database.createCollection(
          "questions",
          {
            validator: {
              $jsonSchema: {
                bsonType: "object",
                required: ["question", "options", "correctAnswer"],
                properties: {
                  question: {
                    bsonType: "string",
                  },
                  options: {
                    bsonType: "array",
                    items: {
                      bsonType: "string",
                    },
                  },
                  correctAnswer: {
                    bsonType: "string",
                  },
                },
              },
            },
          }
        );
        return questionCollection
    } catch (error) {
        console.log("error = ", error);
        throw new Error(error);
    }
}


module.exports = {
    questionsCollection
}