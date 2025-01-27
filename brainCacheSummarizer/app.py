from fastapi import FastAPI, HTTPException
from utils.models import TextInput, SummaryResponse
from utils.processor import TextProcessor
from utils.chains import summary_chain

app = FastAPI(
    title="Text Summarizer API",
    description="API for generating summaries and structured notes from text content",
    version="1.0.0"
)

@app.post("/summarize", response_model=SummaryResponse)
async def summarize_text(input_data: TextInput):
    """
    Generate a summary and structured notes from input text.
    
    Args:
        input_data: TextInput object containing the content to process
        
    Returns:
        SummaryResponse containing the summary, notes, and extracted elements
    """
    try:
        # Process the input text
        processor = TextProcessor(input_data.content)
        cleaned_text, links, images = processor.process_text()
        
        # Generate summary and notes
        summary = await summary_chain.generate_summary(cleaned_text)
        notes = await summary_chain.generate_notes(cleaned_text, links, images)
        title = await summary_chain.generate_title(cleaned_text)
        tags = await summary_chain.generate_tags(cleaned_text)
        
        # Return the complete response
        return SummaryResponse(
            summary=summary,
            notes=notes,
            title=title,
            tags=tags
        )
        
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    """Simple health check endpoint."""
    return {"status": "healthy"}