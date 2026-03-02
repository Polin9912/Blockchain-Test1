const { expect } = require("chai");
const { sortAddresses } = require("../../algorithms/task-04-sort-addresses");

describe("Algorithm Task 4: Sort addresses", function () {
  it("returns sorted array (ascending by hex value)", function () {
    const addrs = [
      "0x0000000000000000000000000000000000000003",
      "0x0000000000000000000000000000000000000001",
      "0x0000000000000000000000000000000000000002",
    ];
    const out = sortAddresses(addrs);
    expect(out[0]).to.equal("0x0000000000000000000000000000000000000001");
    expect(out[1]).to.equal("0x0000000000000000000000000000000000000002");
    expect(out[2]).to.equal("0x0000000000000000000000000000000000000003");
  });
  it("does not mutate original array", function () {
    const addrs = ["0xbb00000000000000000000000000000000000000", "0xaa00000000000000000000000000000000000000"];
    const copy = [...addrs];
    sortAddresses(addrs);
    expect(addrs).to.deep.equal(copy);
  });
});
