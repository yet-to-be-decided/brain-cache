import os
from langchain_groq import ChatGroq
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

def get_llm():
    """Initialize and return the LLM client."""
    api_key = os.getenv("GROQ_API_KEY")
    if not api_key:
        raise ValueError("GROQ_API_KEY environment variable not set")
    
    return ChatGroq(
        api_key=api_key,
        model="llama3-8b-8192"
    )

# Create a singleton instance
llm = get_llm()