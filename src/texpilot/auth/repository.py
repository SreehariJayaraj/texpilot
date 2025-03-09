from typing import Optional
from sqlalchemy.orm import Session
from .model import User, UserCreate
from texpilot.common.repository.base import BaseRepository

class UserRepository(BaseRepository[User, UserCreate, UserCreate]):
    def __init__(self, db: Session):
        super().__init__(User, db)

    def get_by_email(self, email: str) -> Optional[User]:
        return self.db.query(User).filter(User.email == email).first()

    def create_user(self, user_create: UserCreate, hashed_password: str) -> User:
        db_user = User(
            email=user_create.email,
            hashed_password=hashed_password
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user 