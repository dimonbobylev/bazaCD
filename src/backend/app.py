import datetime

from flask import Flask, jsonify, request
from flask_cors import CORS
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from database_setup import Base, Book
import sqlite3 as sq


app = Flask(__name__)
CORS(app)

# Подключаемся и создаем сессию базы данных
engine = create_engine('sqlite:///soft-collection.db?check_same_thread=False')
Base.metadata.bind = engine

DBSession = sessionmaker(bind=engine)
session = DBSession()


@app.route("/softCD/", methods=['GET'])
def SoftCD():
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            cur.execute("SELECT * FROM soft")
            result = cur.fetchall()
            listRang = []
            for res in result:
                row_data = {}
                row_data['id'] = res[0]
                row_data['inv'] = res[1]
                row_data['date'] = res[2]
                row_data['article'] = res[3]
                row_data['title'] = res[4]
                listRang.append(row_data)
    except:
        session.rollback()
        print("Ошибка открытия в БД")
    return jsonify(listRang)


@app.route("/onAddSoft", methods=['POST'])
def addSoft():
    f = request.json
    date = f['date']
    a = datetime.date(int(date[0:4]), int(date[5:7]), int(date[8:10]))
    newSoft = Book(inv=f['inv'], date=a, article=f['article'], title=f['title'])
    session.add(newSoft)
    session.commit()
    # print(newSoft)
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            cur.execute("SELECT id, inv, date, article, title FROM soft")
            result = cur.fetchall()
            listRang = []
            for res in result:
                row_data = {}
                row_data['id'] = res[0]
                row_data['inv'] = res[1]
                row_data['date'] = res[2]
                row_data['article'] = res[3]
                row_data['title'] = res[4]
                # print(row_data)
                listRang.append(row_data)
    except:
        session.rollback()
        print("Ошибка добавления в БД")
    return jsonify(listRang)


@app.route("/onDeleteSoft", methods=['POST'])
def onDeleteSoft():
    f = request.json
    # print(str(f['id']))
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            text_request = "DELETE FROM soft WHERE id = " + str(f['id']) + ""
            # print(text_request)
            cur.execute(text_request)
            session.commit()
            cur.execute("SELECT * FROM soft")
            result = cur.fetchall()
            listRang = []
            for res in result:
                row_data = {}
                row_data['id'] = res[0]
                row_data['inv'] = res[1]
                row_data['date'] = res[2]
                row_data['article'] = res[3]
                row_data['title'] = res[4]
                listRang.append(row_data)
    except:
        session.rollback()
        print("Ошибка удаления из БД")
    return jsonify(listRang)

@app.route("/onUpdateSoft", methods=['POST'])
def onUpdateSoft():
    f = request.json
    # print(f)
    try:
        with sq.connect("soft-collection.db") as con:
            cur = con.cursor()
            # cur.execute("SELECT * FROM soft")
            sql_update = "UPDATE soft SET inv = " + "'" + str(f['inv']) + "'," + \
                " date = " + "'" + str(f['date']) + "'," + " article = " + "'" + str(f['article']) + "'," + \
                " title = " + "'" + str(f['title']) + "'" + " where id = " + str(f['id'])
            # print(sql_update)
            cur.execute(sql_update)
            session.commit()
        # with sq.connect("soft-collection.db") as con:
        #     cur = con.cursor()
            cur.execute("SELECT * FROM soft")
            result = cur.fetchall()
            listRang = []
            for res in result:
                row_data = {}
                row_data['id'] = res[0]
                row_data['inv'] = res[1]
                row_data['date'] = res[2]
                row_data['article'] = res[3]
                row_data['title'] = res[4]
                listRang.append(row_data)
    except:
        session.rollback()
        print("Ошибка обновления БД")
    return jsonify(listRang)



if __name__ == '__main__':
    app.run(debug=True)

