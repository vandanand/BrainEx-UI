import genex.database.genex_database as gxdb
from pyspark import SparkContext, SparkConf
import flask

UPLOAD_FOLDER = /uploads # Note: to fix
ALLOWED_EXTENSIONS = {'csv'}

application = Flask(_name_)
application.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

brainexDB = None
# For development purposes only, currently.  TODO: Update to final server specs
num_cores = 4


@application.route('/getCSV', methods=['GET', 'POST'])
def getStoreCSV():
    if request.method == 'POST':
        # TODO: Update to make more correct
        csv = request.files['uploaded_data']

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
