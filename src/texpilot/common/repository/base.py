from typing import Generic, TypeVar, Type, Optional, List
from sqlalchemy.orm import Session
from pydantic import BaseModel

ModelType = TypeVar("ModelType")
CreateSchemaType = TypeVar("CreateSchemaType", bound=BaseModel)
UpdateSchemaType = TypeVar("UpdateSchemaType", bound=BaseModel)

class BaseRepository(Generic[ModelType, CreateSchemaType, UpdateSchemaType]):
    def __init__(self, model: Type[ModelType], db: Session):
        self.model = model
        self.db = db

    def get(self, id: int) -> Optional[ModelType]:
        return self.db.query(self.model).filter(self.model.id == id).first()

    def get_all(self) -> List[ModelType]:
        return self.db.query(self.model).all()

    def create(self, schema: CreateSchemaType) -> ModelType:
        db_item = self.model(**schema.dict())
        self.db.add(db_item)
        self.db.commit()
        db_item.refresh(db_item)
        return db_item

    def delete(self, id: int) -> bool:
        item = self.db.query(self.model).filter(self.model.id == id).first()
        if item:
            self.db.delete(item)
            self.db.commit()
            return True
        return False 