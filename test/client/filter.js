const expect = require("expect");
const filter = require("../../src/client/filter");

describe("Filter", () => {
  describe("filterData", () => {
    it("should filter age below minimum", () => {
      data = [
        { _id: "1", eyeColor: "blue", age: 20 },
        { _id: "2", eyeColor: "blue", age: 19 },
      ];
      result = filter.filterData(data, { ageMin: 20 });
      expect(result.length).toEqual(1);
      expect(result[0]["_id"]).toEqual("1");
    });

    it("should filter age upper maximum", () => {
      data = [
        { _id: "1", eyeColor: "blue", age: 20 },
        { _id: "2", eyeColor: "blue", age: 19 },
      ];
      result = filter.filterData(data, { ageMax: 19 });
      expect(result.length).toEqual(1);
      expect(result[0]["_id"]).toEqual("2");
    });

    it("should filter data on age range", () => {
      data = [
        { _id: "1", eyeColor: "blue", age: 18 },
        { _id: "2", eyeColor: "blue", age: 20 },
        { _id: "3", eyeColor: "blue", age: 19 },
        { _id: "4", eyeColor: "blue", age: 21 },
      ];
      result = filter.filterData(data, { ageMin: 19, ageMax: 20 });
      expect(result.length).toEqual(2);
      expect(result[0]["_id"]).toEqual("2");
      expect(result[1]["_id"]).toEqual("3");
    });

    it("should filter age upper maximum", () => {
      data = [
        { _id: "1", eyeColor: "blue", age: 20 },
        { _id: "2", eyeColor: "blue", age: 19 },
      ];
      result = filter.filterData(data, { ageMax: 19 });
      expect(result.length).toEqual(1);
      expect(result[0]["_id"]).toEqual("2");
    });

    it("should filter data based on eye color", () => {
      data = [
        { _id: "1", eyeColor: "blue", age: 20 },
        { _id: "2", eyeColor: "brown", age: 19 },
      ];
      result = filter.filterData(data, { eyeColor: "brown" });
      expect(result.length).toEqual(1);
      expect(result[0]["_id"]).toEqual("2");
    });

    it("should filter data on age range and eye color", () => {
      data = [
        { _id: "1", eyeColor: "green", age: 18 },
        { _id: "2", eyeColor: "blue", age: 20 },
        { _id: "3", eyeColor: "green", age: 19 },
        { _id: "4", eyeColor: "blue", age: 21 },
      ];
      result = filter.filterData(data, {
        ageMin: 19,
        ageMax: 20,
        eyeColor: "green",
      });
      expect(result.length).toEqual(1);
      expect(result[0]["_id"]).toEqual("3");
    });
  });
});
