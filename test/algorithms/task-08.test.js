const { expect } = require("chai");
const { minMax } = require("../../algorithms/task-08-min-max");

describe("Algorithm Task 8: Min and max", function () {
  it("returns same for equal values", function () {
    const r = minMax(10n, 10n);
    expect(r.min).to.equal(10n);
    expect(r.max).to.equal(10n);
  });
  it("returns min and max for a < b", function () {
    const r = minMax(5n, 10n);
    expect(r.min).to.equal(5n);
    expect(r.max).to.equal(10n);
  });
  it("returns min and max for a > b", function () {
    const r = minMax(10n, 5n);
    expect(r.min).to.equal(5n);
    expect(r.max).to.equal(10n);
  });
});
