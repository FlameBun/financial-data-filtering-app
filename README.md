# Financial Data Filtering App
My financial data filtering app fetches Apple's annual income statements from a single API endpoint and displays them in a tabular format. Users are allowed to filter and sort Apple's income statements by date, revenue, and net income.

## Local Setup Instructions
1. Install Python if not done already.
2. Access the base directory `financial-data-filtering-app`.
3. To install front-end dependencies, run `npm install`.
4. To install back-end dependencies, first run `python -m venv venv`. `venv` will be the virtual environment in which the back-end dependencies will be installed in. Afterward, run `venv/Scripts/activate` to activate the virtual environment. Run `pip install "fastapi[standard]"` to install the back-end dependencies. Lastly, run `deactivate` to deactivate the virtual environment.
5. Run `fastapi run src/server/server.py`. By default, this will start the web server at the address `http://localhost:8000`.
6. Run `npm run dev`. By default, this will deploy the frontend of the application at the address `http://localhost:5173`.

## Note
Make sure the frontend and web server are hosted at `http://localhost:5173` and `http://localhost:8000` respectively; if not, the frontend will not be able to correctly fetch data from the web server.
