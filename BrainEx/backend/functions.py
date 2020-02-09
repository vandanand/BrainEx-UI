import os

import genex.database.genexengine as gxdb
from genex.utils.gxe_utils import from_csv

from pyspark import SparkContext, SparkConf

from flask import Flask, request
from flask_cors import CORS

UPLOAD_FOLDER = "./uploads"

application = Flask(__name__)
CORS(application)
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

uploadPath = None
brainexDB = None
querySeq = None


def is_csv(filename):
    if '.' in filename and filename.rsplit('.', 1)[1].lower() == 'csv':
        return True
    else:
        return False


@application.route('/getCSV', methods=['GET', 'POST'])
def getStoreCSV():
    global uploadPath

    if request.method == 'POST':
        if 'uploaded_data' not in request.files:
            return ("File not found.", 400)
        csv = request.files['uploaded_data']
        if csv.filename == '':
            return ("File not found", 400)
        if csv and is_csv(csv.filename):
            toSave = os.path.join(application.config['UPLOAD_FOLDER'], csv.filename)
            csv.save(toSave)  # Secure filename?? See tutorial
            uploadPath = toSave
            return "File has been uploaded."
        else:
            return ("Invalid file.  Please upload a CSV", 400)


@application.route('/getCSVOptions', methods=['GET', 'POST'])
def getOptions():
    global brainexDB, uploadPath

    if request.method == 'POST':
        feature_num = int(request.form['feature_num'])
        num_worker = int(request.form['num_worker'])
        use_spark_int = int(request.form['use_spark_int'])
        if use_spark_int == 1:
            use_spark = True
            driver_mem = int(request.form['driver_mem'])
            max_result_mem = int(request.form['max_result_mem'])
        else:
            use_spark = False
        try:
            if use_spark:
                brainexDB = from_csv(uploadPath, feature_num=feature_num, use_spark=use_spark, num_worker=num_worker,
                                     driver_mem=driver_mem, max_result_mem=max_result_mem)
            else:
                brainexDB = from_csv(uploadPath, feature_num=feature_num, use_spark=use_spark, num_worker=num_worker)
            return "Correctly input."
        except FileNotFoundError:
            return ("File not found.", 400)
        except TypeError:
            return ("Incorrect input.", 400)


@application.route('/cluster', methods=['GET', 'POST'])
def cluster():
    if request.method == "POST":
        similarity_threshold = int(request.form['similarity_threshold'])
        dist_type = request.form['dist_type']
        loii = int(request.form['loii'])
        loif = int(request.form['loif'])
        loi = slice(loii, loif)
        try:
            # Todo: get loading bar
            brainexDB.build(similarity_threshold=similarity_threshold, dist_type=dist_type, loi=loi)
            return "Preprocessing is complete"
        except Exception as e:
            return (e, 400)


@application.route('/uploadSequence', methods=['GET', 'POST'])
def uploadSequence():
    if request.method == "POST":
        # Assuming the file is just a series of points on one line (i.e. one row of a database
        # csv with feature_num=0)
        if 'sequence_file' not in request.files:
            return ("File not found.", 400)
        csv = request.files['sequence_file']
        if csv.filename == '':
            return ("File not found", 400)
        if csv and is_csv(csv.filename):
            csv.save(os.path.join(application.config['UPLOAD_FOLDER'], file.filename))  # Secure filename?? See tutorial
            # Check to make sure there's only one line there
            with open(file.filename) as f:
                numLines = sum(1 for line in f)
            if numLines == 1:
                with open(file.filename) as f:
                    queryLine = f.readline()
                    query = queryLine.rstrip.split(',')
                return "File has been uploaded."
            else:
                return ("Please only submit one sequence at a time", 400)
        else:
            return ("Invalid file.  Please upload a CSV", 400)


@application.route('/query', methods=['GET', 'POST'])
def complete_query():
    if request.method == "POST":
        quit()
