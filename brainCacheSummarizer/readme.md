# Directory Structure
```
summarizer/
├── utils/
│   ├── __init__.py
│   ├── llm.py           # LLM configuration and setup
│   ├── models.py        # Pydantic models
│   ├── processor.py     # Text processing utilities
│   └── chains.py        # LangChain processing chains
├── app.py              # FastAPI application
└── requirements.txt    # Project dependencies
```
# API Endpoints

## 1. Generate Summary [POST /summarize]

Processes text content to generate a summary and structured notes.

### Request
```json
{
    "content": "Your text content here with optional links in format [Link: text: Example - src: https://example.com]"
}
```

### Response
```json
{
    "summary": "A comprehensive summary of the provided content",
    "notes": {
        "notes": [
            {
                "text": "Individual note content (20-25 words)",
                "links": ["https://example.com"],
                "images": []
            }
        ]
    },
    "extracted_links": [
        "https://example.com"
    ],
    "extracted_images": [
        "image content if any"
    ]
}
```

### Error Response
```json
{
    "detail": "Error message describing what went wrong"
}
```

## 2. Health Check [GET /health]

Simple endpoint to verify API is running.

### Response
```json
{
    "status": "healthy"
}
```

## Main Features:
1. /summarize
   - Extracts and processes links from text
   - Generates comprehensive summary
   - Creates structured notes with relevant links
   - Handles images if present in content
   - Returns both raw links and processed content

2. /health
   - Monitors API availability
   - Quick check for service status
   - Used for uptime monitoring

# SetUp

1. Change Directory
```bash
cd .\brain-cache\brainCacheSummarizer\
```
2. Create a virtual environment
```bash 
python3 -m venv venv
.\env\Scripts\Activate.ps1
```

3. Install dependencies
```bash
pip install -r requirements.txt
``` 

4. Run the application
```bash
uvicorn app:app --reload
```

**Note:** Set the `GROQ_API_KEY` environment variable. [get api key](https://console.groq.com/keys)