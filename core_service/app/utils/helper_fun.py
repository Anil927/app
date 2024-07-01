from bson import ObjectId

# Helper functions
def get_context_info(info):
    user_id = info.context.user_id
    db = info.context.db
    return user_id, db

# async def find_document_by_id(db, collection_name, document_id):
#     return await db[collection_name].find_one({"_id": ObjectId(document_id)})

# async def update_document_field_by_id(db, collection_name, document_id, field_name, field_value):
#     return await db[collection_name].update_one(
#         {"_id": ObjectId(document_id)},
#         {"$set": {field_name: field_value}},
#         upsert=True
#     )