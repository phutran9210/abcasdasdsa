var express = require("express");
var router = express.Router();
const fs = require("fs");
const path = require("path");
var bodyParser = require("body-parser");

/* GET home page. */
const questionsFilePath = path.join(
  __dirname,
  "../ask-community-project/questions.json"
);

const readQuestionsFile = (callback) => {
  fs.readFile(questionsFilePath, "utf-8", (err, data) => {
    if (err) {
      callback(err);
    } else {
      const questions = JSON.parse(data);
      callback(null, questions);
    }
  });
};
const writeQuestionsFile = (questions, callback) => {
  fs.writeFile(questionsFilePath, JSON.stringify(questions), (err) => {
    callback(err);
  });
};

router.get("/", (req, res) => {
  fs.readFile(questionsFilePath, "utf-8", (err, data) => {
    if (err) {
      console.error("Error:", err);
      res.status(500).send("Lỗi khi đọc file questions.json");
    } else {
      const questions = JSON.parse(data);

      res.status(200).json(questions);
    }
  });
});

router.get("/:id", (req, res) => {
  fs.readFile(questionsFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading questions file" });
    }

    const questions = JSON.parse(data);
    const question = questions.find(
      (question) => question.id === parseInt(req.params.id)
    );

    if (!question) {
      return res.status(404).json({ error: "Question not found" });
    }

    return res.status(200).json(question);
  });
});
router.post("/", (req, res) => {
  fs.readFile(questionsFilePath, "utf-8", (err, data) => {
    if (err) {
      return res.status(500).json({ error: "Error reading questions file" });
    }
    const questions = JSON.parse(data);
    const existingQuestion = questions.find(
      (question) => question.content === req.body.content
    );
    if (existingQuestion) {
      return res.status(409).json({
        messenge: "content đã tồn tại",
      });
    }
    const newQuestion = req.body;
    newQuestion.id = Date.now();
    const checkedQuestion = {
      content: newQuestion.content,
      like: newQuestion.like ? parseInt(newQuestion.like) : 0,
      dislike: newQuestion.dislike ? parseInt(newQuestion.dislike) : 0,
      id: newQuestion.id,
    };
    questions.push(checkedQuestion);
    fs.writeFile(questionsFilePath, JSON.stringify(questions), (err) => {
      if (err) {
        res.status(500).json({
          messenger: "Lỗi khi ghi file",
        });
      }
      return res.status(201).json({
        messenger: "Ghi mới thành công",
      });
    });
  });
});

router.put("/:id", (req, res) => {
  readQuestionsFile((error, questions) => {
    if (error) {
      res.status(500).json({ error: "Error reading questions file" });
    } else {
      const questionIndex = questions.findIndex(
        (question) => question.id === parseInt(req.params.id)
      );
      if (questionIndex === -1) {
        return res.status(404).json({ message: "Question not found" });
      }
      const updatedQuestion = {
        ...questions[questionIndex],
        ...req.body,
      };
      questions[questionIndex] = updatedQuestion;
      writeQuestionsFile(questions, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error writing questions file" });
        } else {
          return res.status(200).json({ message: "Update successfully" });
        }
      });
    }
  });
});
router.delete("/:id", (req, res) => {
  readQuestionsFile((err, questions) => {
    if (err) {
      res.status(500).json({
        messenger: "Lỗi khi đọc file",
      });
    } else {
      const questionIndex = questions.findIndex(
        (question) => question.id === parseInt(req.params.id)
      );
      if (questionIndex === -1) {
        return res.status(404).json({ message: "Question not found" });
      }

      questions.splice(questionIndex, 1);
      writeQuestionsFile(questions, (err) => {
        if (err) {
          return res
            .status(500)
            .json({ error: "Error writing questions file" });
        } else {
          return res.status(200).json({ message: "Update successfully" });
        }
      });
    }
  });
});
module.exports = router;
