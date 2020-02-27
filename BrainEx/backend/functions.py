import os

import genex.database.genexengine as gxdb
from genex.utils.gxe_utils import from_csv, from_db
from genex.classes.Sequence import Sequence

from flask import Flask, request, jsonify
from flask_cors import CORS

import pandas as pd
import numpy as np

import findspark
import shutil
import zipfile

UPLOAD_FOLDER_RAW = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads\\raw")
UPLOAD_FOLDER_PRO = os.path.join(os.path.dirname(os.path.abspath(__file__)), "uploads\\preprocessed")

application = Flask(__name__)
CORS(application)
application.config['UPLOAD_FOLDER_RAW'] = UPLOAD_FOLDER_RAW
application.config['UPLOAD_FOLDER_PRO'] = UPLOAD_FOLDER_PRO

uploadPath = None
brainexDB = None
querySeq = None
numFeatures = None

def is_csv(filename):
    if '.' in filename and filename.rsplit('.', 1)[1].lower() == 'csv':
        return True
    else:
        return False

@application.route('/rawNames', methods=['GET', 'POST'])
def getRawNames():
        if request.method == 'POST':
            files = os.listdir(application.config['UPLOAD_FOLDER_RAW'])
            json = {
                    "Message" : "Returning file names",
                    "raw_files": files
            }
            return jsonify(json)

@application.route('/proNames', methods=['GET', 'POST'])
def getProNames():
        if request.method == 'POST':
            files = os.listdir(application.config['UPLOAD_FOLDER_PRO'])
            json = {
                    "Message" : "Returning file names",
                    "pro_files": files
            }
            return jsonify(json)

@application.route('/getCSV', methods=['GET', 'POST'])
def getStoreCSV():
    global numFeatures

    if request.method == 'POST':
        for i in range(len(request.files)):
            if 'uploaded_data' + str(i) not in request.files:
                return ("File not found.", 400)
            csv = request.files['uploaded_data' + str(i)]
            if csv.filename == '':
                return("File not found", 400)
            if csv and is_csv(csv.filename):
                toSave = os.path.join(application.config['UPLOAD_FOLDER_RAW'], csv.filename)
                csv.save(toSave) # Secure filename?? See tutorial
            else:
                return("Invalid file.  Please upload a CSV", 400)
        return "Files uploaded."

@application.route('/getDB', methods=['GET', 'POST'])
def getStoreDB():
    if request.method == 'POST':
        for i in range(len(request.files)):
            if 'uploaded_data' + str(i) not in request.files:
                return ("File not found.", 400)
            db = request.files['uploaded_data' + str(i)]
            if db.filename == '':
                return("File not found", 400)
            if db:
                toSave = os.path.join(application.config['UPLOAD_FOLDER_PRO'], db.filename)
                db.save(toSave) # Secure filename?? See tutorial
            else:
                return("Invalid file.", 400)
        return "File has been uploaded."

@application.route('/setFileRaw', methods=['GET', 'POST'])
def setFileRaw():
    global uploadPath, numFeatures

    if request.method == 'POST':
        uploadPath = os.path.join(application.config['UPLOAD_FOLDER_RAW'], request.form['set_data'])
        dataframe = pd.read_csv(uploadPath, delimiter=',')
        dataframe.columns = map(str.lower, dataframe.columns)
        notFeature = 0
        for elem in dataframe.columns:
            if 'unnamed' in elem:
                notFeature = notFeature + 1;
        numFeatures = len(dataframe.columns) - notFeature
        json = dataframe.to_json()
        returnDict = {
            "message": "File has been set.",
            "maxLength": str(notFeature),
            "data": json
        }
        return jsonify(returnDict)

@application.route('/setFilePro', methods=['GET', 'POST'])
def setFilePro():
    global uploadPath, brainexDB, numFeatures

    if request.method == 'POST':
        uploadPath = os.path.join(application.config['UPLOAD_FOLDER_PRO'], request.form['set_data'])
        with zipfile.ZipFile(uploadPath, 'r') as zip_ref:
            zip_ref.extractall(uploadPath + "toDel")
        num_worker = request.form['num_workers']
        dataframe = pd.read_csv(uploadPath + "toDel\\most_recent_data\\data_raw.csv", delimiter=',')
        dataframe.columns = map(str.lower, dataframe.columns)
        notFeature = 0
        for elem in dataframe.columns:
            if 'unnamed' in elem:
                notFeature = notFeature + 1;
        numFeatures = len(dataframe.columns) - notFeature
        # use_spark_int = request.form['spark_val']
        # if use_spark_int == "1":
        #     use_spark = True
        # driver_mem = request.form['dm_val']
        # max_result_mem = request.form['mrm_val']
        # else:
        #     use_spark = False
        try:
            num_worker = int(num_worker)
            # if use_spark:
            # driver_mem = int(driver_mem)
            # max_result_mem = int(max_result_mem)
            brainexDB = from_db(uploadPath + "toDel\\most_recent_data", num_worker=num_worker) # driver_mem=driver_mem, max_result_mem=max_result_mem
            # else:
            #     brainexDB = from_db(uploadPath + "toDel\\most_recent_Data", num_worker=num_worker)
            shutil.rmtree(uploadPath + "toDel")
            return "File is set!"
        except Exception as e:
            return (str(e), 400)

@application.route('/saveFilePro', methods=['GET', 'POST'])
def saveFilePro():
     global brainexDB

     if request.method == 'POST':
        os.chdir(os.path.dirname(os.path.abspath(__file__)))
        savePath = "../../Saved_Preprocessed/most_recent_data"
        try:
            brainexDB.save(savePath)
            shutil.make_archive(savePath, "zip", "../../Saved_Preprocessed")
            shutil.rmtree(savePath)
            return "Saved to the Saved_Preprocessed folder."
        except Exception as e:
            return (str(e), 400)

@application.route('/checkSpark', methods=['GET', 'POST'])
def checkSpark():
    if request.method == 'POST':
        try:
            findspark.find()
            return "Spark is properly installed"
        except Exception as e:
            return (str(e), 400)

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
                    queryLine = queryLine.rstrip().split(',')
                    queryArr = queryLine[numFeatures:]
                    queryArr = [float(i) for i in queryArr]
                    queryArr = np.asarray(queryArr)
                    querySeq = Sequence(seq_id=queryLine[:numFeatures], start=1, end=24, data=queryArr)
                length = queryArr.size
                pandasQ = pd.DataFrame({"query_seq": queryArr})
                timeStamps = []
                x = range(length)
                for n in x:
                    timeStamps.append(n)
                pandasQ["sequence_length"] = timeStamps
                json = pandasQ.to_json(orient="index")
                returnDict = {
                    "message": "File has been uploaded.",
                    "sequenceJSON": json
                }
                return jsonify(returnDict)
            else:
                return("Please only submit one sequence at a time", 400)
        else:
            return("Invalid file.  Please upload a CSV", 400)

@application.route('/query', methods=['GET', 'POST'])
def complete_query():
    global querySeq, brainexDB

    if request.method == "POST":
        #TODO: Ask Leo where loi is
        # loi_temp = request.form['loi_temp']
        # loiA = loi_temp.split('')
        # loi = [float(loiA[0]), float(loiA[1])]
        best_matches = int(request.form['best_matches'])
        overlap = float(request.form['overlap'])
        excludeS = request.form['excludeS']
        if excludeS == "false":
            exclude = False
        else:
            exclude = True
        # try:
        query_result = brainexDB.query(query=querySeq, best_k=best_matches, exclude_same_id=exclude, overlap=overlap)
        query_result.reverse()
        sims = [i[0] for i in query_result]
        seqs = [i[1] for i in query_result]
        for i in seqs:
            i = i.fetch_data(brainexDB.data_original)
        ids = [i for i in range(1,best_matches+1)]
        start = [i.start for i in seqs]
        end = [i.end for i in seqs]
        data = [i.data.tolist() for i in seqs]
        pandasQ = pd.DataFrame({"similarity":sims, "ID":ids, "start":start, "end":end, "data":data})
        dataMax = -9999
        dataMin = 9999
        for elem in pandasQ['data']:
            if max(elem) > dataMax:
                dataMax = max(elem)
            if min(elem) < dataMin:
                dataMin = min(elem)
        json = pandasQ.to_json(orient="index")
        returnDict = {
            "message": "Query results.",
            "resultJSON": json,
            "dataMin": dataMin,
            "dataMax": dataMax
        }
        return jsonify(returnDict)
        # except Exception as e:
        #     return (str(e), 400)
