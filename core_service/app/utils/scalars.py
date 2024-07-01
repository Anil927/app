# scalars.py
import strawberry
from bson import ObjectId

@strawberry.scalar(description="MongoDB ObjectId")
class ObjectIdStr:
    @staticmethod
    def serialize(id) -> str:
        """
        Convert the internal ObjectId representation to a string to send to the client.
        """
        return str(id)

    @staticmethod
    def parse_value(value: str):
        """
        Convert the string input from the client into an ObjectId instance.
        """
        return ObjectId(value)
