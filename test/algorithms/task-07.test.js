const { expect } = require("chai");
const { percentageOf } = require("../../algorithms/task-07-percentage-of");

describe("Algorithm Task 7: Percentage of", function () {
  it("returns 0 when numerator 0", function () {
    expect(percentageOf(100n, 0n, 100n)).to.equal(0n);
  });
  it("returns value when numerator equals denominator", function () {
    expect(percentageOf(50n, 100n, 100n)).to.equal(50n);
  });
  it("returns floor(value * num / denom)", function () {
    expect(percentageOf(100n, 5n, 100n)).to.equal(5n);
    expect(percentageOf(100n, 1n, 3n)).to.equal(33n);
  });
});
