import OpenAI from "openai";

const openai = new OpenAI();

export default async function handler(req, res) {
	const { sessionId, text, isInitialMessage } = req.body;
	try {
		let messages;
		if (isInitialMessage) {
			messages = [
				{
					role: "system",
					content: `You are a legal document bot. Anything else apart from property related document stuff is out of bounds. DONT TALK ABOUT ANYTHING ELSE APART EXCEPT FOR THE TEXT PROVIDED TO YOU. Also Summarize the following text:  ${text}`,
				},
			];
		} else {
			messages = chatSessions[sessionId] || [];
			messages.push({ role: "user", content: text });
		}

		const completion = await openai.chat.completions.create({
			messages: messages,
			model: "gpt-3.5-turbo-0125",
			temperature: 0,
		});

		if (isInitialMessage) {
			// Store the initial summary to start the conversation
			chatSessions[sessionId] = [
				{ role: "system", content: completion.choices[0].message.content },
			];
		} else {
			// Update the session with the new system response
			chatSessions[sessionId].push({
				role: "system",
				content: completion.choices[0].message.content,
			});
		}

		res
			.status(200)
			.json({ message: completion.choices[0].message.content, sessionId });
	} catch (error) {
		console.log(error);
		return res.status(500).json({ error: "Internal server error" });
	}
}
