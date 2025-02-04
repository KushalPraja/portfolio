declare namespace THREE {
  export interface Vector3 {
    x: number;
    y: number;
    z: number;
    set(x: number, y: number, z: number): this;
    clone(): Vector3;
  }

  export interface Euler {
    x: number;
    y: number;
    z: number;
    order: string;
    set(x: number, y: number, z: number, order?: string): this;
  }

  export interface Matrix4 {
    elements: number[];
    set(n11: number, n12: number, n13: number, n14: number,
      n21: number, n22: number, n23: number, n24: number,
      n31: number, n32: number, n33: number, n34: number,
      n41: number, n42: number, n43: number, n44: number): this;
  }

  export interface Object3D {
    position: Vector3;
    rotation: Euler;
    scale: Vector3;
    matrix: Matrix4;
    add(object: Object3D): this;
    remove(object: Object3D): this;
  }

  export interface Scene extends Object3D {
    background: Color | null;
  }

  export interface Color {
    r: number;
    g: number;
    b: number;
    set(color: number | string): this;
  }
}

export = THREE;
export as namespace THREE;