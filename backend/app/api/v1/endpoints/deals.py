from fastapi import APIRouter, Depends, HTTPException, status
from typing import List
from beanie import PydanticObjectId
from datetime import datetime

from app.models.deal import Deal, DealOut, ChatMessage, ChatMessageIn, DealStatus
from app.models.bounty import Bounty
from app.models.user import User
from app.api.deps import get_current_active_user

router = APIRouter()

@router.post("/claim/{bounty_id}", response_model=DealOut, status_code=status.HTTP_201_CREATED)
async def claim_bounty_and_create_deal(
    bounty_id: PydanticObjectId,
    current_user: User = Depends(get_current_active_user)
):
    bounty = await Bounty.get(bounty_id)
    if not bounty:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Bounty not found")
    if bounty.creator.id == current_user.id:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Cannot claim your own bounty")

    deal = Deal(bounty=bounty, seeker=bounty.creator, connector=current_user)
    await deal.create()
    
    created_deal = await Deal.get(deal.id, fetch_links=True)
    return created_deal

@router.get("/{id}", response_model=DealOut)
async def get_deal(id: PydanticObjectId, current_user: User = Depends(get_current_active_user)):
    deal = await Deal.get(id, fetch_links=True)
    if not deal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deal not found")
    if current_user.id not in [deal.seeker.id, deal.connector.id]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to view this deal")
    return deal

@router.post("/{id}/messages", response_model=DealOut)
async def add_chat_message(
    id: PydanticObjectId,
    message_in: ChatMessageIn,
    current_user: User = Depends(get_current_active_user)
):
    deal = await Deal.get(id)
    if not deal:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Deal not found")
    if current_user.id not in [deal.seeker.id, deal.connector.id]:
        raise HTTPException(status_code=status.HTTP_403_FORBIDDEN, detail="Not authorized to post in this deal")

    message = ChatMessage(sender=current_user, content=message_in.content)
    deal.chat_history.append(message.model_dump())
    deal.updated_at = datetime.utcnow()
    await deal.save()
    
    updated_deal = await Deal.get(deal.id, fetch_links=True)
    return updated_deal