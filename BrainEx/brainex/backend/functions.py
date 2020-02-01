import genex.database.genex_database as gxdb
from pyspark import SparkContext, SparkConf
import flask

UPLOAD_FOLDER = /uploads # Note: to fix

application = Flask(_name_)
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

brainexDB = None
# For development purposes only, currently.  TODO: Update to final server specs
num_cores = 4


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

@application.route('/getCSVOptions', methods=['GET', 'POST'])
def getOptions():
    if request.method == 'POST':
        feature_num = int(request.args['feature_num'])
        # TODO: Need to update to add more args, make sure path to file is correct
        try:
            brainexDB = gxdb.from_csv(UPLOAD_FOLDER/<filename>, feature_num=feature_num)
            return "Correctly uploaded."
        except FileNotFoundError:
            return ("File not found.", 400)
        except TypeError:
            return ("Incorrect input.", 400)

@application.route('/cluster', methods=['GET', 'POST'])
def cluster()
    if request.method == "POST":
