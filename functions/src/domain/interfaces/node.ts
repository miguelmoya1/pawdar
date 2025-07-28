export type StructureType =
  | "house"
  | "farm"
  | "factory"
  | "barracks"
  | "castle";

export interface Node {
  readonly ownerId: string;
  readonly name: string;
  readonly isCapital: boolean;
  readonly coordinates: {
    readonly x: number;
    readonly y: number;
  };

  readonly structures: {
    readonly [key in StructureType]: number;
  };
}
