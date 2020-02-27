call venv\scripts\activate
python -m pip install --user -r requirements.txt
cd BrainEx\backend
set FLASK_APP=functions.py
python -m flask run
