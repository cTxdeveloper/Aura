from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from beanie import PydanticObjectId

from app.models.bounty import Bounty, BountyOut, BountyCreate, BountyUpdate
from app.models.user import User
from app.api.deps import get_current_active_user

router = APIRouter()

@router.post("/", response_model=BountyOut, status_code=status.HTTP_201_CREATED)
async def create_bounty(
    bounty_in: BountyCreate,
    current_user: User = Depends(get_current_active_user)
):
    bounty = Bounty(**bounty_in.model_dump(), creator=current_user)
    await bounty.create()
    new_bounty = await Bounty.get(bounty.id, fetch_links=True)
    return new_bounty

@router.get("/", response_model=List[BountyOut])
async def read_bounties(skip: int = 0, limit: int = 100):
    bounties = await Bounty.find(
        Bounty.is_active == True,
        skip=skip,
        limit=limit,
        fetch_links=True
    ).sort(-Bounty.created_at).to_list()
    return bounties

@router.get("/{id}", response_model=BountyOut)
async def read_bounty_by_id(id: PydanticObjectId):
    bounty = await Bounty.get(id, fetch_links=True)
    if not bounty:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bounty not found")
    return bounty

@router.put("/{id}", response_model=BountyOut)
async def update_bounty(
    id: PydanticObjectId,
    bounty_in: BountyUpdate,
    current_user: User = Depends(get_current_active_user)
):
    bounty = await Bounty.get(id)
    if not bounty:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bounty not found")
    if bounty.creator.id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    
    update_data = bounty_in.model_dump(exclude_unset=True)
    for field, value in update_data.items():
        setattr(bounty, field, value)
    await bounty.save()
    updated_bounty = await Bounty.get(bounty.id, fetch_links=True)
    return updated_bounty

@router.delete("/{id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_bounty(
    id: PydanticObjectId,
    current_user: User = Depends(get_current_active_user)
):
    bounty = await Bounty.get(id)
    if not bounty:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bounty not found")
    if bounty.creator.id != current_user.id:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not enough permissions")
    await bounty.delete()
    return