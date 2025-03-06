require("dotenv").config();
console.log("OPENAI_API_KEY:", process.env.GEMINI_API_KEY ? "Loaded" : "Missing");

const express = require("express");
const cors = require("cors");

const app = express();
const PORT = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());


const aiRoutes = require("./routes/aiRoutes");

app.use("/api/ai", aiRoutes);

app.get("/", (req, res) => {
    res.send("AI Website Builder Backend is Running!");
});


app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
