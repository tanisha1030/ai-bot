from fastapi import FastAPI
from pydantic import BaseModel
from transformers import pipeline
import nltk

# Initialize FastAPI app
app = FastAPI()

# Download necessary NLTK data
nltk.download("punkt")
nltk.download("stopwords")

# Load the Hugging Face model
chatbot = pipeline("text-generation", model="distilgpt2")

class UserQuery(BaseModel):
    query: str

# Healthcare chatbot logic
def healthcare_chatbot(user_input):
    user_input = user_input.lower()
    
    if "symptom" in user_input:
        return "It seems like you're experiencing symptoms. Please consult a doctor for accurate advice."
    elif "appointment" in user_input:
        return "Would you like me to schedule an appointment with a doctor?"
    elif "medication" in user_input:
        return "It's important to take your prescribed medications regularly. If you have concerns, consult your doctor."
    else:
        response = chatbot(user_input, max_length=100, num_return_sequences=1)
        return response[0]["generated_text"]

@app.post("/chat/")
def chat(query: UserQuery):
    response = healthcare_chatbot(query.query)
    return {"response": response}
