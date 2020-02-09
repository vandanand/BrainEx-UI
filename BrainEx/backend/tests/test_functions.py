import os
import tempfile
import pytest
from io import BytesIO

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

def test_getOptions(client):
    data = {}
    data['feature_num'] = 2
    data['num_worker'] = 4
    data['use_spark_int'] = 0
    sendRequest = client.post("/getCSVOptions", data=data)
    assert sendRequest.status_code == 200
