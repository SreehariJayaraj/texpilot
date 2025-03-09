from fastapi import FastAPI
from texpilot.auth.router import router as auth_router
from texpilot.common.database import Base, engine

# Create database tables
Base.metadata.create_all(bind=engine)

app = FastAPI(title="TeXPilot API")


app.include_router(auth_router) 