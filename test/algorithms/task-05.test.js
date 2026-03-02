const { expect } = require("chai");
const { hasDuplicate } = require("../../algorithms/task-05-has-duplicate");

describe("Algorithm Task 5: Has duplicate", function () {
  it("returns false for empty or single element", function () {
    expect(hasDuplicate([])).to.equal(false);
    expect(hasDuplicate([1])).to.equal(false);
  });
  it("returns true when duplicate exists", function () {
    expect(hasDuplicate([1, 2, 1])).to.equal(true);
    expect(hasDuplicate(["a", "b", "a"])).to.equal(true);
  });
  it("returns false when no duplicate", function () {
    expect(hasDuplicate([1, 2, 3])).to.equal(false);
    expect(hasDuplicate(["a", "b", "c"])).to.equal(false);
  });
});
