from fastapi import APIRouter
from .endpoints import auth, bounties, deals, lists

api_router = APIRouter()
api_router.include_router(auth.router, prefix="/auth", tags=["Authentication & Users"])
api_router.include_router(bounties.router, prefix="/bounties", tags=["Bounties (The Foundry)"])
api_router.include_router(deals.router, prefix="/deals", tags=["Deals & Escrow"])
api_router.include_router(lists.router, prefix="/lists", tags=["Connection Lists (The Index)"])