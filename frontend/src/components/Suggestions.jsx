import "../styles/Suggestions.css";


const Suggestions = ({ suggestions = [] }) => {
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
        </div>
    );
};

export default Suggestions;


