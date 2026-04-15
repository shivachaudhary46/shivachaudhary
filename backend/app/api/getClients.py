from fastapi import APIRouter, HTTPException, Request
from backend.app.database import conn

router = APIRouter(
    prefix="/get"
)

@router.get("/clients/")
async def get_client_details(): 
    try: 
        cursor = conn.cursor() 
        cursor.execute("SELECT * FROM bookings ORDER BY created_at DESC LIMIT 3")
        rows = cursor.fetchall()
        cursor.close() 

        # convert rows to list of dicts 
        bookings = []
        for row in rows: 
            bookings.append({
                "id":  row[0], 
                "name": row[1], 
                "email": row[2], 
                "phone": row[3], 
                "reason": row[4], 
                "meeting_time": row[5], 
                "meeting_link": row[6], 
                "timezone": row[7], 
                "created_at": str(row[8])
            })

        return {"status": "success", "data": bookings}
    except Exception as e: 
        conn.rollback() 
        raise HTTPException(status_code=500, detail=str(e))