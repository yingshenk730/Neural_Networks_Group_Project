from flask import Flask,  request, jsonify
from flask_cors import CORS
from predict import predict
import traceback

app = Flask(__name__)
CORS(app)


@app.route('/predict', methods=['GET', 'POST'])
def home():
  try:
    payload = request.json
  
    print("Payload:", payload, flush=True)

    result = predict(payload).tolist()

    res = jsonify({"prediction": result})
    res.headers.add('Access-Control-Allow-Origin', '*')
    return res
  except:
   return jsonify({'trace': traceback.format_exc()}) 

if __name__ == '__main__':
    app.run(debug=True, port = 5001)