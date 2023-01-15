const express = require("express");
const { Configuration, OpenAIApi } = require("openai");
const bodyParser = require("body-parser");
const cors = require("cors");

const configuration = new Configuration({
  organization: "org-rG2TQVKqo01acJruNsbSJYwH",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// add body parser and cors to express
const app = express();
app.use(bodyParser.json());
app.use(cors());

// const response = await openai.listEngines();

// create a simple express api that calls the function above

const port = 3080;

app.post("/", async (req, res) => {
  const { message } = req.body;
  console.log(message, "message");

  const response = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${message}`,
    max_tokens: 500,
    temperature: 0.5,
  });
  res.json({
    message: response.data.choices[0].text,
  });
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
