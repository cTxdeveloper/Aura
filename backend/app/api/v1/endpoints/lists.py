from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from beanie import PydanticObjectId

from app.models.connection_list import ConnectionList, ConnectionListOut, ConnectionListCreate, ConnectionListUpdate
from app.models.user import User
from app.api.deps import get_current_active_user

router = APIRouter()

@router.post("/", response_model=ConnectionListOut, status_code=status.HTTP_201_CREATED)
async def create_connection_list(
    list_in: ConnectionListCreate,
    current_user: User = Depends(get_current_active_user)
):
    list_doc = ConnectionList(
        **list_in.model_dump(),
        creator=current_user,
        contacts=[contact.model_dump() for contact in list_in.contacts]
    )
    await list_doc.create()
    
    created_list = await ConnectionList.get(list_doc.id, fetch_links=True)
    # Add contact_count to the output model
    output = ConnectionListOut(**created_list.model_dump(), contact_count=len(created_list.contacts))
    return output

@router.get("/", response_model=List[ConnectionListOut])
async def read_lists(category: str = None, search: str = None, skip: int = 0, limit: int = 50):
    query_list = []
    if category:
        query_list.append(ConnectionList.category == category)
    if search:
        query_list.append(ConnectionList.title.find(search, case_sensitive=False))

    query = {"$and": query_list} if query_list else {}
    
    lists = await ConnectionList.find(query, skip=skip, limit=limit, fetch_links=True).sort(-ConnectionList.created_at).to_list()
    
    # Add contact_count to each output item
    output_lists = [ConnectionListOut(**l.model_dump(), contact_count=len(l.contacts)) for l in lists]
    return output_lists