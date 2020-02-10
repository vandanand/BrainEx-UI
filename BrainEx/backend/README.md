### Prerequisites
Python 3.7:<br/>
https://www.python.org/downloads/release/python-370/
<br/>
Microsoft Visual C++ Build Tools:<br/>
https://go.microsoft.com/fwlink/?LinkId=691126

### to install requirements

`pip install -r requirments`

### to run app

`set FLASK_APP=functions.py`
<br/>
`flask run`

### if any packages are missing

`pip install <package> && pip freeze > requirements.txt`
<br/>
then commit and push requirements.txt to master