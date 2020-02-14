import os
import tempfile
import pytest
from io import BytesIO
import json

import functions

@pytest.fixture
def client():
    # Modified from Flask Testing Tutorial
    db_fd, functions.application.config['DATABASE'] = tempfile.mkstemp()
    functions.application.config['TESTING'] = True

    with functions.application.test_client() as client:
        yield client

    os.close(db_fd)
    os.unlink(functions.application.config['DATABASE'])

def test_getStoreCSV(client):
    with open("ItalyPower.csv", 'rb') as f:
        input = BytesIO(f.read())
    data = {"uploaded_data": (input, "ItalyPower.csv")}
    sendRequest = client.post("/getCSV", data=data, content_type="multipart/form-data")
    assert sendRequest.status_code == 200

# def test_getOptions(client):
#     data = {}
#     data['num_workers'] = 4
#     data['spark_val'] = 0
#     data['sim_val'] = 0.1
#     data['distance_val'] = 'eu'
#     data['loi'] = '[10000,10000]'
#     dataJ = json.loads(json.dumps(data))
#     sendRequest = client.post("/build", data=dataJ)
#     assert sendRequest.status_code == 200

def test_uploadSequence(client):
    with open("test_Seq.csv", 'rb') as f:
        input = BytesIO(f.read())
    data = {"sequence_file": (input, "test_Seq.csv")}
    sendRequest = client.post("/uploadSequence", data=data, content_type="multipart/form-data")
    assert sendRequest.status_code == 200
