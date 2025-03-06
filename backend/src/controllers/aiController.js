const genAI = require("../config/openaiConfig");

const generateSuggestions = async (req, res) => {

    console.log("hii from controlleer");
    try {
        const { websiteType, industry, features } = req.body.userInput;

        if (!websiteType || !industry || !features) {
            return res.status(400).json({ error: "All fields (websiteType, industry, features) are required" });
        }
        console.log("hii from controlleer after if");
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });


        const prompt = `Generate a structured response for a website suggestion:
        - Website Type: ${websiteType}
        - Industry: ${industry}
        - Features: ${features.join(", ")}

        Provide the response in the following JSON format:
        {
          "templateName": "Template Name Here",
          "layout": "Suggested layout",
          "sections": [
            {
              "heading": "Heading 1",
              "subHeading": "Subheading 1",
              "content": "Detailed description"
            },
            {
              "heading": "Heading 2",
              "subHeading": "Subheading 2",
              "content": "Detailed description"
            }
          ]
        }`;

        const response = await model.generateContent({ contents: [{ role: "user", parts: [{ text: prompt }] }] });
        console.log("rsponse: ", response);
        const suggestions = response.response.text();
        const structuredSuggestions = processSuggestions(suggestions);

        res.json({ suggestions });
    } catch (error) {
        console.error("Error in AI suggestion generation:", error);
        res.status(500).json({ error: "Failed to generate AI suggestions" });
    }
};

const processSuggestions = (text) => {

    const sections = text.split("\n\n");

    return sections.map((section) => {
        const lines = section.split("\n");
        return {
            heading: lines[0] || "Untitled Section",
            subHeading: lines[1] || "",
            content: lines.slice(2).join(" ") || "No content available",
        };
    });
};

module.exports = { generateSuggestions };


