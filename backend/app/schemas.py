from pydantic import BaseModel
from typing import List, Optional

class RowData(BaseModel): 
    name: Optional[str] = None
    phone_no: Optional[str] = None 
    email: Optional[str] = None

class SyncPayload(BaseModel): 
    token: str 
    rows: List[RowData]

class SyncResponse(BaseModel): 
    success: bool 
    upserted: int 
    message: str 
    