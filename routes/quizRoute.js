const router = require("express").Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { ObjectId } = require("mongodb");
const { quizzesCollection } = require("../models/quizModel");
const { questionsCollection } = require("../models/questionsModel");


// API to create a quiz
router.post("/create-quiz", authMiddleware, async (req, res) => {
  try {
    const { title, description, timer, points, questions } = req.body;
    // Quiz Collection
    const QuizCollection = await quizzesCollection();
    // Questions Collection
    const QuestionCollection = await questionsCollection();

    // Creating a new Quiz and Storing in the Database in QuizCollection
    await QuizCollection.insertOne({
      title,
      description,
      timer,
      points,
      ownerId: new ObjectId(req.body.userId),
      updatedAt: new Date(),
    })
      .then(async (quizResponse) => {
        const quizId = quizResponse.insertedId;
        const questionsArr = [...questions];
        // Inserting questions in the QuestionsCollection
        await QuestionCollection.insertMany(questionsArr, { ordered: true })
          .then(async (questionsResponse) => {
            // list of ObjectIds of Question documents from QuestionColection
            const insertedQuestionIds = Object.values(
              questionsResponse.insertedIds
            );

            // Updating the QuizCollection document by inserting list of 
            // ObjectIds of Question documents from QuestionColection
            // to maintain one to many Relationship
            await QuizCollection.updateOne(
              { _id: quizId },
              {
                $set: { questions: insertedQuestionIds },
              }
            )
              .then((quizUpdatedResponse) => {
                res.send({
                  success: true,
                  message: "insert Successfull",
                  data: quizUpdatedResponse,
                });
              })
              .catch((error) => {
                res.send({
                  success: false,
                  message: error.message,
                });
              });
          })
          .catch((error) => {
            console.log("error = ", error);
            res.send({
              success: false,
              message: error.message,
            });
          });
      })
      .catch((error) => {
        console.log("error = ", error);
        res.send({
          success: false,
          message: error.message,
        });
      });
  } catch (error) {
    console.log("error = ", error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});


// API to list to all the Quizzes
router.post("/all-quizzes",authMiddleware, async (req,res)=>{
    try {
        const QuizCollection = await quizzesCollection();
        // Here Iam populating the questions documents from QuestionCollection
        const quizzes = await QuizCollection.aggregate([
          {
            $lookup: {
              from: "questions",
              localField: "questions",
              foreignField: "_id",
              as: "questions"
            },
          },
        ]).toArray();
        res.send({
            success: true,
            data: quizzes,
            message: "list of all quizzes"
        })
    } catch (error) {
        console.log("error = ", error);
        res.send({
          success: false,
          message: error.message,
        });
    }
})

router.post("/all-user-quizzes", authMiddleware, async (req, res) => {
  try {
    const ownerId = new ObjectId(req.body.userId);
    const QuizCollection = await quizzesCollection();
    const quizzes = await QuizCollection.aggregate([
        {
            $match:{
                ownerId: ownerId
            }
        },
      {
        $lookup: {
          from: "questions",
          localField: "questions",
          foreignField: "_id",
          as: "questionsList",
        },
      },
    ]).toArray();
    res.send({
      success: true,
      data: quizzes,
      message: "list of all quizzes",
    });
  } catch (error) {
    console.log("error = ", error);
    res.send({
      success: false,
      message: error.message,
    });
  }
});

module.exports = router;
