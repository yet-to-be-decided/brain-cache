from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from .llm import llm
from .models import Notes

class SummaryChain:
    """Handles the creation and execution of LangChain processing chains."""
    
    def __init__(self):
        self.map_prompt = ChatPromptTemplate.from_messages([
            ("human", "Write a concise summary of the following:\n\n{context}")
        ])
        
        self.parser = JsonOutputParser(pydantic_object=Notes)
        
        self.notes_prompt = PromptTemplate(
            template=(
                "write 5-10 notes for the text given.\n{format_instructions}\n{context}\n"
                "and also use the links: {links}\n"
                "and also use the images: {images}\n"
            ),
            input_variables=["context", "links", "images"],
            partial_variables={"format_instructions": self.parser.get_format_instructions()},
        )
        
        self.notes_chain = self.notes_prompt | llm | self.parser

    async def generate_summary(self, text: str) -> str:
        """Generate a summary from the input text."""
        prompt = self.map_prompt.format(context=text)
        response = await llm.ainvoke(prompt)
        return response.content

    async def generate_notes(self, summary: str, links: list, images: list) -> Notes:
        """Generate structured notes from the summary."""
        return await self.notes_chain.ainvoke({
            "context": summary,
            "links": links,
            "images": images
        })

# Create a singleton instance
summary_chain = SummaryChain()