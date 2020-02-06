import os
import tempfile
import pytest

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
    data = {}
    data['file'] = open("ItalyPower.csv")
    return client.post("/getCSV", data=data, content_type="multipart/form-data")
