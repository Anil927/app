from confluent_kafka.admin import AdminClient, NewTopic

from app.logging.logger import logger


KAFKA_TOPICS = ['post', 'code', 'qna', 'connection', 'logs']
KAFKA_BOOTSTRAP_SERVERS = 'localhost:9092'

def create_topics() -> None:
    admin_client = AdminClient({'bootstrap.servers': KAFKA_BOOTSTRAP_SERVERS})
    new_topics = [NewTopic(topic, num_partitions=3, replication_factor=1) for topic in KAFKA_TOPICS]
    fs = admin_client.create_topics(new_topics)
    for topic, f in fs.items():
        try:
            f.result()
            logger.info(f"Topic {topic} created")
        except Exception as e:
            logger.error(f"Failed to create topic {topic}: {e}")


def delete_topics(topics: list[str]) -> None:
    admin_client = AdminClient({'bootstrap.servers': KAFKA_BOOTSTRAP_SERVERS})
    fs = admin_client.delete_topics(topics)
    for topic, f in fs.items():
        try:
            f.result()
            logger.info(f"Topic {topic} deleted")
        except Exception as e:
            logger.error(f"Failed to delete topic {topic}: {e}")
