export type BaseResponseDto<T> = {
  readonly uid: string;
  readonly data: T;
};
