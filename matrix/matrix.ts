// Copyright 2018-2019 the Deno authors. All rights reserved. MIT license.

export type IMatrix = number[][];
export type RowNumber = number;
export type ColNumber = number;

export type Shape = [RowNumber, ColNumber];

function ensureMatrixSize(a: Matrix, b: Matrix) {
  const [aRowSize, aColSize] = a.shape;
  const [bRowSize, bColSize] = b.shape;

  if (aRowSize !== bRowSize || aColSize !== bColSize) {
    throw new Error("Matrices must be the same size.");
  }
}

export class Matrix {
  constructor(public matrix: IMatrix) {
    const colLength = (matrix[0] || []).length;
    const isValidcolLength = matrix.every(row => row.length === colLength);
    if (!isValidcolLength) {
      throw new Error("Not available matrix.");
    }
  }
  /**
   * Get the size of Matrix
   */
  public get shape(): Shape {
    const elementSize = this.matrix[0].length;
    const rowSize = this.matrix.length;
    return [rowSize, elementSize];
  }
  /**
   * Multiply the matrix by a number or matrix. similar like `a * b`
   * @param n a number or matrix
   */
  public times(n: number | Matrix) {
    if (n instanceof Matrix) {
      const output = [];
      for (let i = 0; i < this.matrix.length; i++) {
        const row = this.matrix[i];
        const newRow = [];

        const [_, colSize] = n.shape;

        for (let i = 0; i < colSize; i++) {
          const row2 = n.matrix.map(v => v[i]);
          const c = row
            .map((v, index) => v * row2[index])
            .reduce((a, b) => a + b, 0);

          newRow.push(c);
        }

        output.push(newRow);
      }
      return new Matrix(output);
    } else {
      const output = [];
      for (const row of this.matrix) {
        output.push(row.map(v => v * n));
      }
      return new Matrix(output);
    }
  }
  /**
   * Divided the matrix by a number or matrix. similar like `a / b`
   * @param n a number or matrix
   */
  public div(n: number | Matrix) {
    if (n instanceof Matrix) {
      const output = [];
      for (let i = 0; i < this.matrix.length; i++) {
        const row = this.matrix[i];
        const newRow = [];

        const [_, colSize] = n.shape;

        for (let i = 0; i < colSize; i++) {
          const row2 = n.matrix.map(v => v[i]);
          const c = row
            .map((v, index) => v / row2[index])
            .reduce((a, b) => a + b, 0);

          newRow.push(c);
        }

        output.push(newRow);
      }
      return new Matrix(output);
    } else {
      const output = [];
      for (const row of this.matrix) {
        output.push(row.map(v => v / n));
      }
      return new Matrix(output);
    }
  }
  /**
   * Plus matrix. similar like `a + b`
   * @param n a number or matrix
   */
  public plus(n: Matrix) {
    ensureMatrixSize(this, n);
    const output = [];
    for (let i = 0; i < this.matrix.length; i++) {
      const row = this.matrix[i];
      output.push(row.map((v, m) => v + n.matrix[i][m]));
    }
    return new Matrix(output);
  }
  /**
   * Plus matrix. similar like `a - b`
   * @param n a number or matrix
   */
  public minus(n: Matrix) {
    ensureMatrixSize(this, n);
    const output = [];
    for (let i = 0; i < this.matrix.length; i++) {
      const row = this.matrix[i];
      output.push(row.map((v, m) => v - n.matrix[i][m]));
    }
    return new Matrix(output);
  }
  /**
   * get the row value
   * @param row
   * @param col
   */
  public row(row: number): number[] {
    return this.matrix[row];
  }
  /**
   * get the col value
   * @param row
   * @param col
   */
  public col(row: number, col: number) {
    return this.matrix[row][col];
  }
  /**
   * Print to human readable string
   */
  public toString() {
    const output = [];
    for (const row of this.matrix) {
      output.push(row.join(", "));
    }
    return output.join("\n");
  }
  public valueOf() {
    return this.matrix;
  }
}
