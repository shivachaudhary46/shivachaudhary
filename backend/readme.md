# The Table diagram for portfolio customer meeting scheduler was bookings
'''
    CREATE TABLE bookings (
        id SERIAL PRIMARY KEY, 
        name VARCHAR (100) NOT NULL, 
        email VARCHAR (100) UNIQUE NOT NULL,
        phone VARCHAR (20),
        reason VARCHAR (500), 
        meeting_time VARCHAR (50),
        meeting_link VARCHAR (500),
        timezone VARCHAR (100),
        created_at TIMESTAMP DEFAULT NOW() 
    );
'''