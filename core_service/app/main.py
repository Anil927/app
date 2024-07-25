from contextlib import asynccontextmanager
from fastapi import FastAPI, Depends, HTTPException
import asyncio
import time
from confluent_kafka import KafkaException

from app.kafka.config import create_topics
from app.kafka.producers import AIOProducer



producer_config = {
    "bootstrap.servers": "localhost:9092",
    "message.send.max.retries": 3,
    "retry.backoff.ms": 100,
}

@asynccontextmanager
async def lifespan(app: FastAPI):
    create_topics()
    app.state.producer = AIOProducer(producer_config)
    yield
    app.state.producer.close()
    

app = FastAPI(lifespan=lifespan)


