from fastapi import FastAPI, Depends, HTTPException
import strawberry
from strawberry.fastapi import GraphQLRouter
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.utils.security import get_context
from app.schema.schema import schema
from app.extra.services.services import STATIC_DIR
from app.extra.routes.routes import extra_router


app = FastAPI()

# add cors middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Mount the static directory
app.mount("/static", StaticFiles(directory=STATIC_DIR), name="static")

graphql_app = GraphQLRouter(
    schema,
    context_getter=get_context
)

app.include_router(graphql_app, prefix="/graphql")
app.include_router(extra_router)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)