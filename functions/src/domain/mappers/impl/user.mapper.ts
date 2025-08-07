import { CreateUserParams } from "../../../repository";
import { User, UserEntity } from "../../entities/impl/user.entity";

const isUser = (user: unknown): user is User => {
  if (typeof user !== "object" || user === null) {
    return false;
  }

  const maybeUser = user as { [key: string]: unknown };

  const requiredFields = ["email", "username"];

  for (const field of requiredFields) {
    if (!(field in maybeUser)) {
      return false;
    }
  }

  if (
    typeof maybeUser.email !== "string" ||
    typeof maybeUser.username !== "string" ||
    !["user", "admin"].includes(maybeUser.role as string)
  ) {
    return false;
  }

  return true;
};

class UserMapper {
  static toEntity(userDto: unknown) {
    if (!isUser(userDto)) {
      throw new Error("Invalid user data");
    }
    return UserEntity.create(userDto);
  }

  static toCreateDto(user: unknown) {
    if (!isUser(user)) {
      console.error("Invalid user data for creation:", user);
      throw new Error("Invalid user data for creation");
    }

    const userParams: CreateUserParams = {
      email: user.email,
      username: user.username,
      createdAt: user.createdAt,
      lastLogin: user.lastLogin,
      role: user.role,
    };

    return userParams;
  }
}

export { UserMapper };
