from fastapi import APIRouter, HTTPException, Request
from backend.app.database import conn
import hmac
import hashlib

router = APIRouter(
    prefix="/webhook"
)
CAL_SECRET="83271c1841085761faf53e8268ed0c402363b9fc26fac5d9ab5c496dc189f252"

'''
POST 
GET 
'''

@router.post("/booking/")
async def handle_booking(request: Request): 

    # Verifying the request from CAL.com 
    signature = request.headers.get("X-Cal-Signature-256")
    body = await request.body() 

    # Digest and encode the signature by hmac and hashlib.sha256 algorithm 
    expected = hmac.new(
        CAL_SECRET.encode(), 
        body, 
        hashlib.sha256
    ).hexdigest() 

    # If Signature does not matches then Signature is not valid 
    if signature != f"sha256={expected}":
        raise HTTPException(status_code=401, detail="Invalid Signature")

    data = await request.json()
    payload = data.get("payload", {})
    attendees = payload.get("attendees", [])
    customer = attendees[0] if attendees else {}
    responses = payload.get("metadata", {}).get("responses", {})

    name         = customer.get("name", "")
    email        = customer.get("email", "")
    phone        = responses.get("phone", {}).get("value", "")
    reason       = responses.get("reason", {}).get("value", "")
    meeting_time = payload.get("startTime", "")
    meeting_link = payload.get("videoCallData", {}).get("url", "")
    timezone     = customer.get("timeZone", "")

    cursor = conn.cursor()
    cursor.execute("""
        INSERT INTO bookings (name, email, phone, reason, meeting_time, meeting_link, timezone)
        VALUES (%s, %s, %s, %s, %s, %s, %s)
    """, (name, email, phone, reason, meeting_time, meeting_link, timezone))
    conn.commit()
    cursor.close()

    return {"status": "saved"}