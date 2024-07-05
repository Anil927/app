from bson import ObjectId

# Helper functions
def get_context_info(info):
    user_id = info.context.user_id
    db = info.context.db
    return user_id, db
