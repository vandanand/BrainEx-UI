import genex.database.genex_database as gxdb
from pyspark import SparkContext, SparkConf
import flask

application = Flask(_name_)
brainexDB = None
# For development purposes only, currently.  TODO: Update to final server specs
num_cores = 4
conf = SparkConf(). \
    setMaster("local[" + str(num_cores) + "]"). \
    setAppName("BrainEx").set('spark.driver.memory', '8G'). \
    set('spark.driver.maxResultSize', '8G')
sc = SparkContext(conf=conf)


@application.route('/getCSV', methods=['GET', 'POST'])
def getStoreCSV():
    if request.method == 'POST':
        csv = request.files['uploaded_data']
        feature_num = int(request.args['feature_num'])
        ## TODO: Save CSV to path on server here, make the path the csvPath variable
        try:
            brainexDB = gxdb.from_csv(csvPath, feature_num=2, sc=sc)
            return "Correctly uploaded."
        except FileNotFoundError:
            return ("File not found.", 400)
        except TypeError:
            return ("Incorrect input.", 400)


@application.route('/cluster', methods=['GET', 'POST'])
def cluster()
    if request.method == "POST":
