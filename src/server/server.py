from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import httpx

app = FastAPI()
endpoint = "https://financialmodelingprep.com/api/v3/income-statement/" \
      "AAPL?period=annual&apikey=fTgVXQhJUpJsXRASah2oN04eSmjWeEth"

# Runs CORS middleware
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"])

@app.get("/statements")
async def get_statements():
    async with httpx.AsyncClient() as client:
        res = await client.get(endpoint)
        return res.json()
