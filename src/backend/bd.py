import sqlite3
import sqlite3 as sq

# with sq.connect("saper.db") as con:
#     cur = con.cursor()
#     cur.execute("""
#     """)
#
#     cur.execute("""CREATE TABLE IF NOT EXISTS users (
#         name TEXT NOT NULL,
#         sex INTEGER DEFAULT 1,
#         old INTEGER,
#         score INTEGER
#     )""")

with sq.connect("saper.db") as con:
    cur = con.cursor()

    cur.execute("SELECT * FROM users WHERE score > 100 ORDER BY score DESC LIMIT 1")
    result = cur.fetchall()
    for result in cur:
        print(result)


