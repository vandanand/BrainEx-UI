### Prerequisites
Python 3.7:<br/>
https://www.python.org/downloads/release/python-370/
<br/>
Microsoft Visual C++ Build Tools:<br/>
https://go.microsoft.com/fwlink/?LinkId=691126
<br/>
The "release" branch of Genex:<br/>
`git clone https://github.com/ApocalyVec/Genex.git --branch release --single-branch`<br/>
Then, paste the `Genex/genex` folder into `BrainEx-UI` like so:
```
+---BrainEx
+---*genex*
+---venv
+---.gitignore
+---README.md
```
Now change directories to `/BrainEx/backend`<br/>
```
+---BrainEx
|   +---*backend*
|   |   +---tests
|   |   +---__init__.py
|   |   +---functions.py
|   |   +---ItalyPower.csv
|   |   +---README.md
|   |   +---requirements.txt
+---genex
+---venv
+---.gitignore
+---README.md
```

### to install requirements

copy and paste the "genex" folder of your Genex clone into the root directory of BrainEx-UI<br/>


`py -m pip install -r requirments`

### to run app

`set FLASK_APP=functions.py`
<br/>
`flask run`

### if any packages are missing

`pip install <package> && pip freeze > requirements.txt`
<br/>
then commit and push requirements.txt to master