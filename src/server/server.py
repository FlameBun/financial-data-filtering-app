from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx
from datetime import datetime

app = FastAPI()
endpoint = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?" \
           "period=annual&apikey=TWFlofp1OpY7HbvxrR2L9CZNhDzHDY1i"

# Run CORS middleware
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"])

# Retrieve all AAPL income statements from API endpoint
@app.get("/statements")
async def get_statements(sort: str, order: str):
    async with httpx.AsyncClient() as client:
        res = await client.get(endpoint)
        statements = res.json()
    
    if sort == "date":
        if order == "descending":
            statements.sort(reverse=True, key=lambda statement:
                            datetime.strptime(statement["date"], "%Y-%m-%d"))
        else:
            statements.sort(key=lambda statement:
                            datetime.strptime(statement["date"], "%Y-%m-%d"))
    elif sort == "revenue":
        if order == "descending":
            statements.sort(reverse=True, key=lambda statement:
                            statement["revenue"])
        else:
            statements.sort(key=lambda statement: statement["revenue"])
    else: # Net Income
        if order == "descending":
            statements.sort(reverse=True, key=lambda statement:
                            statement["netIncome"])
        else:
            statements.sort(key=lambda statement: statement["netIncome"])
    
    return statements
