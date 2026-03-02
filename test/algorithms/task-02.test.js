const { expect } = require("chai");
const { ceilDivision } = require("../../algorithms/task-02-ceil-division");

describe("Algorithm Task 2: Ceiling division", function () {
  it("returns 1 when a <= b", function () {
    expect(ceilDivision(0n, 5n)).to.equal(0n);
    expect(ceilDivision(1n, 1n)).to.equal(1n);
    expect(ceilDivision(5n, 5n)).to.equal(1n);
  });
  it("returns ceil(a/b) for positive a, b", function () {
    expect(ceilDivision(7n, 3n)).to.equal(3n);
    expect(ceilDivision(10n, 3n)).to.equal(4n);
    expect(ceilDivision(100n, 10n)).to.equal(10n);
  });
});
