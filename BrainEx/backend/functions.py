import os

import genex.database.genexengine as gxdb
from genex.utils.gxe_utils import from_csv

from pyspark import SparkContext, SparkConf

from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd

UPLOAD_FOLDER = "./uploads"

application = Flask(__name__)
CORS(application)
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

uploadPath = None
brainexDB = None
querySeq = None
numFeatures = None

def is_csv(filename):
    if '.' in filename and filename.rsplit('.', 1)[1].lower() == 'csv':
        return True
    else:
        return False

@application.route('/getCSV', methods=['GET', 'POST'])
def getStoreCSV():
    global uploadPath, numFeatures

    if request.method == 'POST':
        if 'uploaded_data' not in request.files:
            return ("File not found.", 400)
        csv = request.files['uploaded_data']
        if csv.filename == '':
            return("File not found", 400)
        if csv and is_csv(csv.filename):
            toSave = os.path.join(application.config['UPLOAD_FOLDER'], csv.filename)
            csv.save(toSave) # Secure filename?? See tutorial
            uploadPath = toSave
            dataframe = pd.read_csv(uploadPath, delimiter=',')
            dataframe.columns = map(str.lower, dataframe.columns)
            if not 'start time' in dataframe.columns and not 'end time' in dataframe.columns:
                return("Please include a start and end column", 400)
            else:
                maxVal = (dataframe['end time'] - dataframe['start time']).max()
                notFeature = 0
                for elem in dataframe.columns:
                    if 'unnamed' in elem:
                        notFeature = notFeature + 1;
                numFeatures = len(dataframe.columns) - notFeature
                returnDict = {
                    "message": "File has been uploaded.",
                    "maxLength": str(maxVal)
                }
                return jsonify(returnDict)
        else:
            return("Invalid file.  Please upload a CSV", 400)

@application.route('/build', methods=['GET', 'POST'])
def build():
    global brainexDB, uploadPath, numFeatures

    if request.method == 'POST':
        num_worker = request.json['num_workers']
        use_spark_int = request.json['spark_val']
        if use_spark_int == "1":
            use_spark = True
            driver_mem = request.json['dm_val']
            max_result_mem = request.json['mrm_val']
        else:
            use_spark = False
        try:
            num_worker = int(num_worker)
            if use_spark:
                driver_mem = int(driver_mem)
                max_result_mem = int(max_result_mem)
                brainexDB = from_csv(uploadPath, feature_num=numFeatures, use_spark=use_spark, num_worker=num_worker, driver_mem=driver_mem, max_result_mem=max_result_mem)
            else:
                brainexDB = from_csv(uploadPath, feature_num=numFeatures, use_spark=use_spark, num_worker=num_worker)
        except FileNotFoundError:
            return ("File not found.", 400)
        try:
            similarity_threshold = request.json['sim_val']
            dist_type = request.json['distance_val']
            lois = request.json['loi_val']
            loiA = lois.split(',')
            loi = [float(loiA[0]), float(loiA[1])]
            similarity_threshold = float(similarity_threshold)
            brainexDB.build(st=similarity_threshold, dist_type=dist_type, loi=loi)
            return "Preprocessed!"
        except Exception as e:
            return (str(e), 400)

@application.route('/uploadSequence', methods=['GET', 'POST'])
def uploadSequence():
    global querySeq

    if request.method == "POST":
        # Assuming the file is just a series of points on one line (i.e. one row of a database
        # csv with feature_num=0)
        if 'sequence_file' not in request.files:
            return ("File not found.", 400)
        csv = request.files['sequence_file']
        if csv.filename == '':
            return("File not found", 400)
        if csv and is_csv(csv.filename):
            # Check to make sure there's only one line there
            with open(csv.filename) as f:
                numLines = sum(1 for line in f)
            if numLines == 1:
                with open(csv.filename) as f:
                    queryLine = f.readline()
                    querySeq = queryLine.split(',')
                return "File has been uploaded."
            else:
                return("Please only submit one sequence at a time", 400)
        else:
            return("Invalid file.  Please upload a CSV", 400)

@application.route('/query', methods=['GET', 'POST'])
def complete_query():
    if request.method == "POST":
        #TODO: Ask Leo where loi is
        # loi_temp = request.form['loi_temp']
        # loiA = loi_temp.split('')
        # loi = [float(loiA[0]), float(loiA[1])]
        best_matches = int(request.form['best_matches_temp'])
        overlap = float(request.form['overlap_temp'])
        excludeS = request.form['exclude_temp']
        if excludeS == "1":
            exclude = True
        else:
            exclude = False
        # try:
        query_result = brainexDB.query(query=querySeq, best_k=best_matches, exclude_same_id=exclude, overlap=overlap)
        return "Hey-o!"
        # except Exception as e:
        #     return (str(e), 400)
