from flask import Flask, redirect, url_for, request
from gensim.models.doc2vec import Doc2Vec
from konlpy.tag import Mecab
import json
import sys

model = Doc2Vec.load("doc2vec.model")


app = Flask(__name__)


@app.route('/analyze', methods=['POST'])
def sendreq():
    try:
        data = request.data.decode('utf-8').replace("'", '"')
        datadic = json.loads(data)
        sentence1 = datadic["sentence1"]
        sentence2 = datadic["sentence2"]
        token1 = parsetoken(sentence1)
        token2 = parsetoken(sentence2)
        num_similar = model.n_similarity(token1, token2)
        return json.dumps({"result": str(num_similar)})
    except:
        return json.dumps({"result": -1})


def parsetoken(sentence):
    mecab = Mecab()
    lst = []
    tags = mecab.pos(sentence)
    for tag in tags:
        try:
            model["/".join(tag)]
            lst.append("/".join(tag))
        except:
            print("not", tag)
   # resdata = dict(zip(range(1, len(lst) + 1), lst))
    return lst


if __name__ == "__main__":
    app.run()
