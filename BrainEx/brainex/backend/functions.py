import genex.database.genex_database as gxdb
from pyspark import SparkContext, SparkConf
import flask

UPLOAD_FOLDER = /uploads # Note: to fix

application = Flask(_name_)
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

brainexDB = None

@application.route('/getCSV', methods=['GET', 'POST'])
def getStoreCSV():
    if request.method == 'POST':
        if 'uploaded_data' not in request.files:
            return ("File not found.", 400)
        csv = request.files['uploaded_data']
        if csv.filename == '':
            return("File not found", 400)
        if csv and is_csv(csv.filename):
            csv.save(os.path.join(app.config['UPLOAD_FOLDER'], file.filename)) # Secure filename?? See tutorial
            return "File has been uploaded."
        else:
            return("Invalid file.  Please upload a CSV", 400)

def is_csv(filename):
    if '.' in filename and filename.rsplit('.', 1)[1].lower() == 'csv':
        return True
    else:
        return False

@application.route('/getCSVOptions')
def getOptions():
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
        # TODO: Need to update to add more args, make sure path to file is correct
        try:
            if use_spark:
                brainexDB = gxdb.from_csv(UPLOAD_FOLDER/<filename>, feature_num=feature_num, use_spark=use_spark, num_worker=num_worker, driver_mem=driver_mem, max_result_mem=max_result_mem)
            else:
                brainexDB = gxdb.from_csv(UPLOAD_FOLDER/<filename>, feature_num=feature_num, use_spark=use_spark, num_worker=num_worker)
            return "Correctly input."
        except FileNotFoundError:
            return ("File not found.", 400)
        except TypeError:
            return ("Incorrect input.", 400)

@application.route('/cluster', methods=['GET', 'POST'])
def cluster()
    if request.method == "POST":
