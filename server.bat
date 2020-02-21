call venv\scripts\activate
python -m pip install -r requirements.txt
cd BrainEx\backend
set FLASK_APP=functions.py
flask run