import psycopg2

# connection with postgres database 
conn = psycopg2.connect(
    host="localhost", 
    database="MeetingScheduler", 
    user="postgres", 
    password="shivachaudhary"
)
