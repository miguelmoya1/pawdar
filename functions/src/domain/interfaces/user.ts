import { firestore } from "firebase-admin";

export interface User {
  readonly uid: string;
  readonly email: string;
  readonly username: string;
  readonly createdAt: firestore.Timestamp;
  readonly lastResourceUpdate: firestore.Timestamp;

  readonly resources: {
    readonly cpuCycles: number;
    readonly memory: number;
    readonly bandwidth: {
      readonly current: number;
      readonly max: number;
    };
  };

  readonly structures: {
    // Using a string index signature to allow for any building type
    readonly [key: string]: number;
  };
}
