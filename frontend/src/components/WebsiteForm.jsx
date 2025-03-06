import { useState } from "react";
import axios from "../api/aiService";
import { useNavigate } from "react-router-dom";
import "../styles/WebsiteForm.css";


const WebsiteForm = ({ setSuggestions }) => {
    const [formData, setFormData] = useState({
        websiteType: "",
        industry: "",
        features: [],
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const websiteTypes = ["Business", "Portfolio", "Blog", "E-commerce"];
    const industries = ["Tech", "Fashion", "Education", "Health"];
    const featureOptions = ["Contact Form", "Blog Section", "Testimonials", "Gallery"];

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            setFormData((prev) => ({
                ...prev,
                features: checked
                    ? [...prev.features, value]
                    : prev.features.filter((f) => f !== value),
            }));
        } else {
            setFormData((prev) => ({ ...prev, [name]: value }));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        console.log("hi from handler");
        console.log(formData);

        try {
            const response = await axios.post("ai/suggestions", {
                userInput: formData,
            });
            console.log("response", response);
            console.log("suggestions", response.data.suggestions)
            console.log("TYPE OF", typeof response.data.suggestions);
            let parsedSuggestions;
            if (typeof response.data.suggestions === "string") {
                const cleanJson = response.data.suggestions.replace(/```json|```/g, "").trim();

                try {
                    parsedSuggestions = JSON.parse(cleanJson);
                } catch (jsonError) {
                    console.error("Error parsing JSON:", jsonError);
                    parsedSuggestions = { sections: [] };
                }
            } else {
                parsedSuggestions = response.data.suggestions;
            }
            navigate("/aiSuggestions", { state: { suggestions: (parsedSuggestions.sections || []) } });

        } catch (error) {
            console.error("Error fetching AI suggestions:", error);
        }
        setLoading(false);
    };


    return (
        <form onSubmit={handleSubmit} className="form-container">
            <label>Website Type:</label>
            <select name="websiteType" onChange={handleChange} required>
                <option value="">Select Type</option>
                {websiteTypes.map((type) => (
                    <option key={type} value={type}>{type}</option>
                ))}
            </select>

            <label>Industry:</label>
            <select name="industry" onChange={handleChange} required>
                <option value="">Select Industry</option>
                {industries.map((industry) => (
                    <option key={industry} value={industry}>{industry}</option>
                ))}
            </select>

            <label>Features:</label>
            {featureOptions.map((feature) => (
                <div key={feature}>
                    <input
                        type="checkbox"
                        name="features"
                        value={feature}
                        onChange={handleChange}
                    />
                    {feature}
                </div>
            ))}

            <button type="submit" disabled={loading}>
                {loading ? <span className="loader"></span> : "Get Suggestions"}
            </button>
        </form>
    );
};

export default WebsiteForm;
