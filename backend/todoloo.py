from flask import Flask, request, jsonify
from flask_cors import CORS
import pickle

app = Flask(__name__)
CORS(app)

def save_datafile():
    datafile = open('mem.pkl', 'wb')
    pickle.dump(data, datafile)
    datafile.close()

datafile = open('mem.pkl', 'rb')
data = pickle.load(datafile)
datafile.close()


@app.route("/")
def hello_world():
    return "backend online!"

@app.route("/user/<uid>", methods=['GET', 'POST'])
def todos(uid):
    if request.method == 'POST':
        data[uid] = request.data
        response = jsonify("Looks good to me!")
        save_datafile()
        return (response, 200)
    else:
        if uid not in data.keys():
            # user not in system, create
            print("new user created:", uid)
            data[uid] = "[]"
        return (data[uid])