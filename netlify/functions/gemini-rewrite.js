const { GoogleGenerativeAI } = require("@google/generative-ai");

exports.handler = async function (event) {
  try {
    const { text } = JSON.parse(event.body);

    if (!text || text.trim().length < 5) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: "Input must be at least 5 characters." }),
      };
    }

    const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    const prompt = `Correct the grammar of the following sentence or paragraph, but don't change the meaning or tone:\n\n"${text}"\n\nReturn only the corrected version without explanation.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;

    const rewritten = response.text();

    return {
      statusCode: 200,
      body: JSON.stringify({
        result: rewritten,
      }),
    };
  } catch (err) {
    console.log("err", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Something went wrong.",
      }),
    };
  }
};
