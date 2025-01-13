from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
import httpx
from datetime import datetime

app = FastAPI()
endpoint = "https://financialmodelingprep.com/api/v3/income-statement/AAPL?" \
           "period=annual&apikey=TWFlofp1OpY7HbvxrR2L9CZNhDzHDY1i"

# Run CORS middleware
app.add_middleware(CORSMiddleware, allow_origins=["http://localhost:5173"])

# Retrieve the AAPL income statements from the API endpoint sorted and filtered
# according to the options specified in the query parameters
@app.get("/statements")
async def get_statements(
    sort: str,
    order: str,
    year: str | None = None,
    revenue: str | None = None,
    net_income: str = Query(None, alias="net-income")
):
    # Retrieve all AAPL income statements from API endpoint
    async with httpx.AsyncClient() as client:
        res = await client.get(endpoint)
        statements = res.json()

    # Filter by year if query parameter for it was specified
    if year != None:
        # Extract years from query parameter
        years = year.split(',')
        years[0] = int(years[0])
        years[1] = int(years[1])

        # Filter statements by year between years[0] and years[1]
        new_statements = []
        for statement in statements:
            statement_yr = datetime.strptime(statement["date"], "%Y-%m-%d").year
            if statement_yr >= years[0] and statement_yr <= years[1]:
                new_statements.append(statement)
        statements = new_statements

    # Filter by revenue if query parameter for it was specified
    if revenue != None:
        # Extract revenues from query parameter
        revenues = revenue.split(',')
        revenues[0] = int(revenues[0])
        revenues[1] = int(revenues[1])

        # Filter statements by revenue between revenues[0] and revenues[1]
        new_statements = []
        for statement in statements:
            statement_rev = statement["revenue"]
            if statement_rev >= revenues[0] and statement_rev <= revenues[1]:
                new_statements.append(statement)
        statements = new_statements

    # Filter by net income if query parameter for it was specified
    if net_income != None:
        # Extract net incomes from query parameter
        net_incomes = net_income.split(",")
        net_incomes[0] = int(net_incomes[0])
        net_incomes[1] = int(net_incomes[1])

        # Filter statements by net income between net_incomes[0] and
        # net_incomes[1]
        new_statements = []
        for statement in statements:
            statement_net_inc = statement["netIncome"]
            if statement_net_inc >= net_incomes[0] and statement_net_inc <= net_incomes[1]:
                new_statements.append(statement)
        statements = new_statements

    # Sort by specified column
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
