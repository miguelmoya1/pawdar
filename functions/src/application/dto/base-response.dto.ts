abstract class BaseResponse<T> {
  public readonly uid: string;
  public readonly data: T;

  protected constructor(uid: string, data: T) {
    this.uid = uid;
    this.data = data;
  }
}

export class BaseResponseDto<T> extends BaseResponse<T> {
  public static create<T>(baseResponse: BaseResponse<T>) {
    const { uid, data } = baseResponse;

    return new BaseResponseDto<T>(uid, data);
  }
}
