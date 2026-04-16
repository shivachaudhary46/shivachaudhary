import psycopg2
import os

# Connection 
# conn = psycopg2.connect(
#     host=os.getenv("PGHOST"),
#     database=os.getenv("PGDATABASE"),
#     user=os.getenv("PGUSER"),
#     password=os.getenv("PGPASSWORD"),
#     port=os.getenv("PGPORT")
# )

conn = psycopg2.connect(
    host="localhost", 
    database="MeetingScheduler", 
    user="postgres", 
    password="shivachaudhary"
)