from typing import Generator
from fastapi import Depends
from sqlalchemy.orm import Session

from texpilot.common.database import get_db
from texpilot.auth.repository import UserRepository

def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return UserRepository(db) 