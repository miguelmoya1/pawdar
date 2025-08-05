import { CreateUserParams } from "../../../repository";
import { User, UserEntity } from "../../entities/impl/user.entity";

const isUser = (user: unknown): user is User => {
  if (typeof user !== "object" || user === null) {
    return false;
  }

  const maybeUser = user as { [key: string]: unknown };

  const requiredFields = ["uid", "email", "username", "role", "createdAt"];

  for (const field of requiredFields) {
    if (!(field in maybeUser)) {
      return false;
    }
  }

  if (
    typeof maybeUser.uid !== "string" ||
    typeof maybeUser.email !== "string" ||
    typeof maybeUser.username !== "string" ||
    !["user", "admin"].includes(maybeUser.role as string) ||
    !(maybeUser.createdAt instanceof Date)
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
      throw new Error("Invalid user data for creation");
    }

    const userParams: CreateUserParams = {
      uid: user.uid,
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
