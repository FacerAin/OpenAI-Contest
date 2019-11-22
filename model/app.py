
from flask import Flask, redirect, url_for, request
from gensim.models.doc2vec import Doc2Vec
from konlpy.tag import Mecab
import sys
model = Doc2Vec.load("doc2vec.model")


app = Flask(__name__)


@app.route('/analyze', methods=['POST'])
def parsetoken():
    print("enter")
    sentence = request.form
    print(sentence)
    mecab = Mecab()
    lst = []
    tags = mecab.pos(sentence)
    for tag in tags:
        try:
            model[tag]
            lst.append("/".join(tag))
        except:
            print("not", tag)
    return lst


if __name__ == "__main__":
    app.run()
