from flask import Flask, request

app = Flask(__name__)

@app.route("/")
def hello_world():
    return "backend online!"

@app.route("/user/<uid>", methods=['GET', 'POST'])
def todos(uid):
    if request.json:
        return(request.json)
    else:
        return(uid)