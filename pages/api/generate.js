import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function (req, res) {
  if (!configuration.apiKey) {
    res.status(500).json({
      error: {
        message: "OpenAI API key not configured, please follow instructions in README.md",
      }
    });
    return;
  }

  const start = req.body.start || '';
  const end = req.body.end || '';
  if ((start.trim().length === 0) || (start.trim().length === 0)) {
    res.status(400).json({
      error: {
        message: "Please enter valid locations",
      }
    });
    return;
  }

  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: generatePrompt(start, end),
      temperature: 0.4,
      max_tokens: 100,
    });
    const totalTokensUsed = completion.data.usage.total_tokens;
    // Extract and send the generated directions
    res.status(200).json({ result: completion.data.choices[0].text });
    console.log(`Total tokens used: ${totalTokensUsed}`);
  } catch(error) {
    // Consider adjusting the error handling logic for your use case
    if (error.response) {
      console.error(error.response.status, error.response.data);
      res.status(error.response.status).json(error.response.data);
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      res.status(500).json({
        error: {
          message: 'An error occurred during your request.',
        }
      });
    }
  }
}

function generatePrompt(start, end) {
  return `Find the shortest path available from ${start} to ${end} assuming you were travelling by car
  with some waypoints along the way and with latitude and longitude for each of the waypoints.
  Format the answer for each point like this: "waypoint > (latitude,longitude)".
  Put a line between each waypoint.`;
}
