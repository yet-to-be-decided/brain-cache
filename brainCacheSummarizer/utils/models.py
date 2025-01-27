from pydantic import BaseModel, Field
from typing import List, Optional

class Note(BaseModel):
    """Single note with associated links and images."""
    text: str = Field(description="Content of the note in 20-25 words")
    related_links: List[str] = Field(default_factory=list, description="Related links")
    related_images: List[str] = Field(default_factory=list, description="Related image URLs")
    related_codes: List[str] = Field(default_factory=list, description="Related code snippets")

class Notes(BaseModel):
    """Collection of notes."""
    notes: List[Note] = Field(description="List of notes with content and references")

class Tags(BaseModel):
    """Collection of tags."""
    tags: List[str] = Field(description="List of generated tags")

class TextInput(BaseModel):
    """Input text for processing."""
    content: str = Field(description="Raw text content to be processed")

class SummaryResponse(BaseModel):
    """Complete summary response."""
    summary: str = Field(description="Overall summary of the content")
    title: str = Field(description="Generated title for the content")
    notes: Notes = Field(description="Structured notes extracted from the content")
    tags: Tags = Field(description="Generated tags for the content")
