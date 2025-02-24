from fastapi import FastAPI, UploadFile, HTTPException
import re
from datetime import datetime

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
    processed_clippings = process_clippings(clippings)

    # Prepare output
    output = {
        "quotes": processed_clippings["quotes"],
        "authors": processed_clippings["authors"],
        "books": processed_clippings["books"]
    }

    return {"clippings": output}
    
def process_author_name(author: str) -> str: 
    """Processes the author's name to a standardised format"""
    parts = author.split(', ')
    
    if len(parts) == 2:
        surname, firstname = parts
        # Return the author name as "firstname surname"
        return f"{firstname} {surname}"
    
    # If name doesn't match the format, return it as is
    return author

def is_clipping_highlight(metadata):
    if "Your Highlight" in metadata:
        return True
    else:
        return False

def extract_quote_info(clipping):
    """Extracts quote information from a single clipping."""
    lines = clipping.strip().split('\n')

    if len(lines) < 4:
        #logging.warning(f"Not enough lines: {lines}")
        return None # skip if not a complete clipping
    
    # Determine whether it's a quote
    metadata_line = lines[1].strip()
    is_highlight = is_clipping_highlight(metadata_line)
    if not is_highlight:
        return None # skip if the quote is not a highlight
    
    # Extract book and author
    book_info = lines[0].strip()
    match = re.match(r"^(.*) \((.*)\)$", book_info)
    if not match: 
        #logging.warning(f"No book info matched: {book_info} {lines}")
        return None # skip if book title and author missing
    
    book, author_raw = match.groups()
    author = process_author_name(author_raw)
    
    # Extract date
    date_line = lines[1].strip()
    date_match = re.search(r"Added on (.+)$", date_line)
    if not date_match:
        #logging.warning(f"No date matched: {date_line} {lines}")
        return None  # skip if the date is not found

    date_string = date_match.group(1)
    date_format = "%A, %d %B %Y %H:%M:%S"
    date = datetime.strptime(date_string, date_format)
    formatted_date = date.strftime("%d/%m/%Y")

    # Extract quote
    quote = lines[3].strip()
    return { 
        'book': book,
        'author': author,
        'quote': quote,
        'date': formatted_date
    } 
    
def process_clippings(clippings: list) -> dict:
    """Processes a list of clippings and extracts quotes, authors, and books"""
    quotes = []
    authors_set = set()
    books_set = set()
    
    for clipping in clippings:
        quote_info = extract_quote_info(clipping)
        
        if (quote_info):
            quotes.append(quote_info)           
            authors_set.add(quote_info["author"])
            books_set.add(quote_info["book"])
          
    return {
        "quotes": quotes, 
        "authors": sorted(authors_set), # Sorted alphabetically
        "books": sorted(books_set)      # Sorted alphabetically
    }