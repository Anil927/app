import confluent_kafka
from threading import Thread
import asyncio
import json

from app.logging.logger import logger


class AIOProducer:
    """ 
    An asyncio compatible Kafka producer.
    """
    def __init__(self, configs: dict, loop=None):
        self._loop = loop or asyncio.get_event_loop()
        self._producer = confluent_kafka.Producer(configs)
        self._cancelled = False
        self._poll_thread = Thread(target=self._poll_loop)
        self._poll_thread.start()

    def _poll_loop(self):
        while not self._cancelled:
            self._producer.poll(0.1)

    def close(self):
        self._cancelled = True
        self._poll_thread.join()

    def produce(self, topic, key, value):
        """
        An awaitable produce method.
        """
        result = self._loop.create_future()

        def ack(err, msg):
            if err:
                self._loop.call_soon_threadsafe(result.set_exception, confluent_kafka.KafkaException(err))
            else:
                self._loop.call_soon_threadsafe(result.set_result, msg)
        key_encoded = key.encode("utf-8")
        value_encoded = json.dumps(value).encode("utf-8")
        self._producer.produce(topic, key=key_encoded, value=value_encoded, on_delivery=ack)
        return result