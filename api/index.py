from fastapi import FastAPI, UploadFile, HTTPException
import re
from datetime import datetime

BOOK_AUTHOR_PATTERN = re.compile(r"^(.*) \((.*)\)$")
DATE_PATTERN = re.compile(r"Added on (.+)$")
WHITESPACE_PATTERN = re.compile(r'\s+')

### Create FastAPI instance with custom docs and openapi url
app = FastAPI(docs_url="/api/py/docs", openapi_url="/api/py/openapi.json")

@app.get("/api/py/helloFastApi")
def hello_fast_api():
    return {"message": "Hello from FastAPI"}

@app.post("/api/py/upload")
async def upload_kindle_clippings(file: UploadFile | None = None):
    """Handles the upload and processing of Kindle clippings text file"""

    if not file:
        raise HTTPException(status_code=400, detail="No file uploaded")
    
    # Read and decode file contents
    contents = await file.read()
    text = contents.decode('utf-8-sig')

    # Split the contents into individual clippings
    separator = "==========\r\n"
    clippings = text.split(separator)
    processed_data = process_clippings(clippings)

    return {"clippings": processed_data}
 

def clean_book_title(title: str) -> str:
    """Converts underscores to spaces while preserving capitalisation."""
    return WHITESPACE_PATTERN.sub(' ', title.replace("_", " ")).strip()
    
def process_author_name(author: str) -> str: 
    """Processes the author's name to a standardised format"""
    parts = author.split(', ')
    
    # Return early if we already have the format we want
    if len(parts) == 2:
        # Return the author name as "firstname surname"
        return f"{parts[1]} {parts[0]}"
    
    # If name doesn't match the format, return it as is
    return author

def process_clippings(clippings: list) -> dict:
    """Processes a list of clippings and extracts quotes, authors, and books"""
    quotes = []
    authors_set = set()
    books_set = set()
    date_format = "%A, %d %B %Y %H:%M:%S"
    
    for clipping in clippings:
        # Skip empty clippings early
        if not clipping.strip():
            continue
        
        lines = clipping.strip().split('\n')
        
        # Skip incomplete clippings
        if len(lines) < 4:
            continue
        
        # Skip non-highlights early
        metadata_line = lines[1].strip()
        if "Your Highlight" not in metadata_line:
            continue
        
        # Extract book and author
        book_info = lines[0].strip()
        match = BOOK_AUTHOR_PATTERN.match(book_info)
        if not match:
            continue
        
        book, author_raw = match.groups()
        
        # Process book title and author
        book = clean_book_title(book)
        author = process_author_name(author_raw)
        
        # Extrat data - only extract what we need
        date_match = DATE_PATTERN.search(metadata_line)
        if not date_match:
            continue
        
        try:
            date_string = date_match.group(1)
            date = datetime.strptime(date_string, date_format)
            formatted_date = date.strftime("%d/%m/%Y")
        except ValueError:
            # Skip if date parsing fails
            continue
        
        # Extract quote
        quote = lines[3].strip()
        
        # Add to collections
        quote_info = {
            'book': book,
            'author': author,
            'quote': quote, 
            'date': formatted_date
        }
        
        quotes.append(quote_info)
        authors_set.add(author)
        books_set.add(book)
          
    return {
        "quotes": quotes, 
        "authors": sorted(authors_set), # Sorted alphabetically
        "books": sorted(books_set)      # Sorted alphabetically
    }