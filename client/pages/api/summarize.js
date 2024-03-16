import OpenAI from "openai";

const openai = new OpenAI();

export default async function handler(req, res) {
  const body = req.body;
    const completion = await openai.chat.completions.create({
      messages: [{ role: "system", content: `Summarize the following text: ${body.text}` }],
      model: "gpt-3.5-turbo",
      temperature: 0.3,
    });
    console.log(completion);
    res.status(200).json({ message: completion.choices[0].message.content })
}

