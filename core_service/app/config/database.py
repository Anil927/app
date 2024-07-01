import motor.motor_asyncio

from app.config.settings import settings


mongo_client = motor.motor_asyncio.AsyncIOMotorClient(settings.MONGO_URI)