from pydantic import BaseModel, Field
from typing import List, Optional

class Note(BaseModel):
    """Single note with associated links and images."""
    text: str = Field(description="Content of the note in 20-25 words")
    links: List[str] = Field(default_factory=list, description="Related links")
    images: List[str] = Field(default_factory=list, description="Related image URLs")

class Notes(BaseModel):
    """Collection of notes."""
    notes: List[Note] = Field(description="List of notes with content and references")

class TextInput(BaseModel):
    """Input text for processing."""
    content: str = Field(description="Raw text content to be processed")

class SummaryResponse(BaseModel):
    """Complete summary response."""
    summary: str = Field(description="Overall summary of the content")
    notes: Notes = Field(description="Structured notes extracted from the content")
    extracted_links: List[str] = Field(description="Links found in the original content")
    extracted_images: List[str] = Field(description="Images found in the original content")