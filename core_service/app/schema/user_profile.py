import strawberry
from fastapi import Depends
from typing import List

from app.utils.scalars import ObjectIdStr
from app.services import user_profile


# User type
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
class UserFollower:
    username: str
    profile_pic: str
    level: str

@strawberry.type
class UserFollowersResponse:
    success: bool
    message: str
    followers: List[UserFollower] | None = None
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
    async def get_followers_info(self, info, pagination_input: str | None = None) -> UserFollowersResponse:
        return await user_profile.get_followers_info(info, pagination_input)
        
    @strawberry.field
    async def get_followers_info(self, info, pagination_input: str | None = None) -> UserFollowersResponse:
        return await user_profile.get_followers_info(info, pagination_input)


@strawberry.type
class UserProfileMutation:
    @strawberry.field
    async def update_bio(self, info, new_bio: str) -> UserBioResponse:
        return await user_profile.update_bio(info, new_bio)