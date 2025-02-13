import { useState } from "react";

export default function Home() {
    const [userInput, setUserInput] = useState("");
    const [response, setResponse] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!userInput.trim()) {
            alert("Please enter a query.");
            return;
        }
        setLoading(true);
        
        try {
            const res = await fetch("http://localhost:8000/chat/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ query: userInput }),
            });

            const data = await res.json();
            setResponse(data.response);
        } catch (error) {
            console.error("Error:", error);
            setResponse("Failed to get response.");
        }
        
        setLoading(false);
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="text-3xl font-bold mb-4">Healthcare Assistant Chatbot</h1>
            <input
                type="text"
                className="p-2 border rounded w-1/2"
                placeholder="How can I assist you today?"
                value={userInput}
                onChange={(e) => setUserInput(e.target.value)}
            />
            <button
                onClick={handleSubmit}
                className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                disabled={loading}
            >
                {loading ? "Processing..." : "Submit"}
            </button>
            {response && (
                <div className="mt-4 p-4 border bg-white rounded w-1/2">
                    <strong>Healthcare Assistant:</strong> {response}
                </div>
            )}
        </div>
    );
}
