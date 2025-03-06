import React from "react";
import Suggestions from "../components/Suggestions";
import "../styles/Suggestions.css";
import { useLocation, useNavigate } from "react-router-dom";

const SuggestionsPage = () => {
    const location = useLocation();
    const navigate = useNavigate();


    const { suggestions } = location.state || { suggestions: [] };

    return (
        <div className="suggestions-container">

            <h2>AI-Powered Suggestions</h2>

            {suggestions.length > 0 ? (
                <ul>
                    {suggestions.map((section, index) => (
                        <li key={index}>
                            <strong>{section.heading}</strong>
                            <br />
                            <em>{section.subHeading}</em>
                            <p>{section.content}</p>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>No suggestions yet.</p>
            )}

            <button onClick={() => navigate("/")}>Back to Form</button>
        </div>


    );
};

export default SuggestionsPage;
