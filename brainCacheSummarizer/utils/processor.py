import re
from typing import Tuple, List

class TextProcessor:
    """Utility class for processing and extracting elements from text."""
    
    def __init__(self, content: str):
        self.content = content
        self.link_pattern = r"\[Link:\s*text:\s*(.+?)\s*-\s*src:\s*(.+?)\]"
        self.image_pattern = r"\[Image:\s*alt:\s*.+?\s*-\s*src:\s*(.+?)\]"
        self.code_pattern = r"```(?:[\w]+)?\s*\n(.+?)```"
        self.html_pattern = r"<(?:code|pre)[^>]*>(.*?)<\/(?:code|pre)>"

    def process_text(self) -> Tuple[str, List[str], List[str]]:
        """
        Process the text content and extract links and images.
        
        Returns:
            Tuple containing:
            - Cleaned text content
            - List of extracted links
            - List of extracted images
        """
        # Extract elements
        links = re.findall(self.link_pattern, self.content, re.DOTALL)
        extracted_links = [src for _, src in links]
        
        images = re.findall(self.image_pattern, self.content, re.DOTALL)
        extracted_images = [src for src in images] 
        
        # Clean the content
        cleaned_content = self.content
        cleaned_content = re.sub(self.link_pattern, '', cleaned_content)
        cleaned_content = re.sub(self.code_pattern, '', cleaned_content, flags=re.DOTALL)
        cleaned_content = re.sub(self.html_pattern, '', cleaned_content, flags=re.DOTALL)
        
        return cleaned_content.strip(), extracted_links, extracted_images