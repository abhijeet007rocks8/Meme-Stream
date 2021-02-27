from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS, cross_origin


app = Flask(__name__)
CORS(app, support_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///filestorage.db'
db = SQLAlchemy(app)


class FileContents(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(200))
    caption = db.Column(db.String(200))
    url = db.Column(db.String(200))


db.create_all()
db.session.commit()


def get_all_data():
    allquery = FileContents.query.all()
    data = []
    for i in allquery:
        row = {'id': i.id, 'name': i.name, 'caption': i.caption, 'url': i.url}
        data.append(row)
    return data


@app.route('/memes', methods=['GET', 'POST'])
@cross_origin(supports_credentials=True)
def base():
    if request.method == 'GET':
        data = get_all_data()
        return jsonify(data)

    if request.method == 'POST':
        data = request.get_json()
        newData = FileContents(name=data['name'], caption=data['caption'], url=data['url'])
        db.session.add(newData)
        db.session.commit()
        data = get_all_data()
        return ADDED;


@app.route('/memes/<int:num>', methods=['GET'])
@cross_origin(supports_credentials=True)
def particular_meme(num):
    data = get_all_data()
    return jsonify(data[num])


@app.route('/memes/<int:num>', methods=['PATCH'])
@cross_origin(supports_credentials=True)
def update(num):
    data = request.get_json()
    update_this = FileContents.query.filter_by(id=num).first()
    update_this.name=update_this.name;
    update_this.caption = data['caption']
    update_this.url = data['url']
    db.session.commit()
    rdata = get_all_data()
    return "UPDATED"

@app.route('/memes/<int:num>', methods=['DELETE'])
@cross_origin(supports_credentials=True)
def delete(num):
    delete_this = FileContents.query.filter_by(id=num).first()
    db.session.delete(delete_this)
    db.session.commit()
    return "DELETED"



if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8081)
