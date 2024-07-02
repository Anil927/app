import strawberry
from fastapi import Depends
from datetime import datetime

from app.resolvers import user_profile



@strawberry.type
class UserProfile:
    profile_pic: str
    bio: str
    following: int
    followers: int
    level: str 

@strawberry.type
class UserBio:
    _id: str
    bio: str


@strawberry.type
class User:
    username: str
    profile_pic: str
    level: str

@strawberry.type
class UserFollowerOrFollowing:
    created_at: datetime
    user: User

@strawberry.type
class UserFollowersOrFollowingsResponse:
    success: bool
    message: str
    followers_or_followings : list[UserFollowerOrFollowing] | None = None
    next_cursor:  str | None = None

@strawberry.type
class UserProfileResponse:
    success: bool
    message: str
    profile: UserProfile | None = None

@strawberry.type
class UserBioResponse:
    success: bool
    message: str
    bio: UserBio | None = None


@strawberry.type
class UserProfileQuery:
    @strawberry.field
    async def get_profile_info(self, info) -> UserProfileResponse:
        return await user_profile.get_profile_info(info)
        
    @strawberry.field
    async def get_followings(self, info, limit: int, next_cursor: str | None = None) -> UserFollowersOrFollowingsResponse:
        return await user_profile.get_followings(info, limit, next_cursor)

    @strawberry.field
    async def get_followers(self, info, limit: int, next_cursor: str | None = None) -> UserFollowersOrFollowingsResponse:
        return await user_profile.get_followers(info, limit, next_cursor)


@strawberry.type
class UserProfileMutation:
    @strawberry.mutation
    async def update_bio(self, info, new_bio: str) -> UserBioResponse:
        return await user_profile.update_bio(info, new_bio)