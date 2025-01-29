from langchain_core.prompts import ChatPromptTemplate, PromptTemplate
from langchain_core.output_parsers import JsonOutputParser
from .llm import llm
from .models import Notes,Tags

class SummaryChain:
    """Handles the creation and execution of LangChain processing chains."""
    
    def __init__(self):
        self.map_prompt = ChatPromptTemplate.from_messages([
            ("human", "Write a concise summary of the following:\n\n{context}")
        ])
        
        self.notes_parser = JsonOutputParser(pydantic_object=Notes)
        self.tags_parser = JsonOutputParser(pydantic_object=Tags)
        
        self.notes_prompt = PromptTemplate(
            template=(
                "write 5-10 notes for the text given.\n{format_instructions}\n{context}\n"
                "and also use the links: {links}\n"
                "and also use the images: {images}\n"
                "ans also extract the code snippets if any\n"
            ),
            input_variables=["context", "links", "images"],
            partial_variables={"format_instructions": self.notes_parser.get_format_instructions()},
        )
        
        self.title_prompt = ChatPromptTemplate.from_messages([
    ("human", "Generate a single, concise title for the following content. "
              "Respond only with the title as a single string, without numbering or extra text.\n\nContent:\n{context}")
])
        
        self.tags_prompt = PromptTemplate(
            template=(
                "generate tags for the text given.\n{format_instructions}\n{context}\n"
            ),
            input_variables=["context"],
            partial_variables={"format_instructions": self.tags_parser.get_format_instructions()},
        )

        self.notes_chain = self.notes_prompt | llm | self.notes_parser
        self.tags_chain = self.tags_prompt | llm | self.tags_parser


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

    async def generate_title(self, text: str) -> str:
        """Generate a title from the input text."""
        prompt = self.title_prompt.format(context=text)
        response = await llm.ainvoke(prompt)
        return response.content

    async def generate_tags(self, text: str) -> list:
        """Generate tags from the input text."""
        return await self.tags_chain.ainvoke({"context": text})

# Create a singleton instance
summary_chain = SummaryChain()