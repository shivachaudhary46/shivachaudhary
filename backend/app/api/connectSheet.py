from fastapi import APIRouter, Depends, HTTPException
from ..schemas import SyncPayload, SyncResponse
from backend.app.database import conn

router = APIRouter(
    prefix="/sync", 
    tags=["Sync"]
)

SECRET_TOKEN = "HRQ7uyMJtfbSC4bRDAvqjYnIcb3ND0DqQM+Qn7H5HTA="

@router.post("/", response_model=SyncResponse)
async def sync_from_sheets(payload: SyncPayload):

    if payload.token != SECRET_TOKEN: 
        raise HTTPException(status_code=401, detail="invalid token")
    
    if not payload.rows: 
        return SyncResponse(success=True, upserted=0, message="No rows to sync")
    
    cursor = conn.cursor()
    try: 
        for row in payload.rows:                    
            cursor.execute("""
                INSERT INTO bookings (name, email, phone_no)
                VALUES (%s, %s, %s)
                ON CONFLICT (email) DO UPDATE        
                SET name     = EXCLUDED.name,
                    phone_no = EXCLUDED.phone_no
            """, (row.name, row.email, row.phone_no))

        conn.commit()                               
        cursor.close()

        return SyncResponse(
            success=True,
            upserted=len(payload.rows),
            message=f"Successfully synced {len(payload.rows)} rows"
        )

    except Exception as e: 
        conn.rollback() 
        cursor.close()
        raise HTTPException(status_code=500, detail=str(e))
    
@router.get("/status")
async def sync_status():
    """Check how many rows are in the DB"""
    cursor = conn.cursor()
    try:
        cursor.execute("SELECT COUNT(*) FROM bookings")
        count = cursor.fetchone()[0]
        cursor.close()
        return {"total_rows": count, "table": "bookings"}
    except Exception as e:
        cursor.close()
        raise HTTPException(status_code=500, detail=str(e))