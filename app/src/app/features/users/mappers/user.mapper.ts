import { User, UserEntity } from '../entities/user.entity';

const isUser = (obj: unknown): obj is User => {
  if (typeof obj !== 'object' || obj === null) {
    return false;
  }

  const dto = obj as Record<string, unknown>;

  return typeof dto['username'] === 'string';
};

export const mapUserToEntity = (data: unknown, uid: string) => {
  if (!isUser(data)) {
    console.error('Invalid data structure for User:', data);
    throw new TypeError(
      'Invalid data structure received. Cannot map to User entity.',
    );
  }

  return UserEntity.from({
    uid: uid,
    email: data.email,
    username: data.username,
    photoURL: data.photoURL,
    role: data.role,
    createdAt: data.createdAt,
    lastLogin: data.lastLogin,
  });
};
