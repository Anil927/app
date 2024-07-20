from app.main import app
from app.logging.logger import logger


async def send_message(topic: str, key: str, value: dict):
    try:
        result = await app.state.producer.produce(topic, key, value)
    
        # Check if result contains an error
        if result.error():
            logger.error({"status": "failure", "message": f"Failed to send message to topic {topic}: {result.error()}"})
        else:
            logger.success({
                "partition": result.partition(),
                "offset": result.offset(),
                "timestamp": result.timestamp()
            })
    except Exception as e:
        logger.error(f"Exception occurred while sending message to topic {topic}: {str(e)}")
