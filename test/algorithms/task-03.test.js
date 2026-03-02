const { expect } = require("chai");
const { integerSqrt } = require("../../algorithms/task-03-integer-sqrt");

describe("Algorithm Task 3: Integer square root", function () {
  it("returns 0 for 0", function () {
    expect(integerSqrt(0n)).to.equal(0n);
  });
  it("returns floor(sqrt(n)) for perfect squares", function () {
    expect(integerSqrt(1n)).to.equal(1n);
    expect(integerSqrt(4n)).to.equal(2n);
    expect(integerSqrt(100n)).to.equal(10n);
  });
  it("returns floor(sqrt(n)) for non-squares", function () {
    expect(integerSqrt(2n)).to.equal(1n);
    expect(integerSqrt(3n)).to.equal(1n);
    expect(integerSqrt(10n)).to.equal(3n);
    expect(integerSqrt(99n)).to.equal(9n);
  });
});
