import os
import tempfile
import pytest

from functions import functions

@pytest.fixture
def client():
    # Modified from Flask Testing Tutorial
    db_fd, functions.app.config['DATABASE'] = tempfile.mkstemp()
    functions.app.config['TESTING'] = True

    with functions.app.test_client() as client:
        with functions.app.app_context():
            functions.init_db()
        yield client

    os.close(db_fd)
    os.unlink(functions.app.config['DATABASE'])
