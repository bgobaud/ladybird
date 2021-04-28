"use strict";

/**
 * @param {Object} data data to filter from
 * @param {Object} options filtering options
 * @param {String} options.eyeColor Color of the eye to filter from possible values `blue`, `brown`, `green`
 * @param {Number} options.ageMin minimum age
 * @param {Number} options.ageMax maximum age
 * @returns {Array} data filtered
 */
const filterData = (
  data,
  { eyeColor: eyeColorFilter, ageMin: ageMinFilter, ageMax: ageMaxFilter }
) => {
  return data.filter(({ eyeColor, age }) => {
    if (eyeColorFilter && eyeColorFilter !== eyeColor) {
      return false;
    }
    if (ageMinFilter && age < ageMinFilter) {
      return false;
    }
    if (ageMaxFilter && age > ageMaxFilter) {
      return false;
    }
    return true;
  });
};

// Ugly hack to be OK on nodeJS and Browser
if (typeof module !== "undefined") {
  module.exports = {
    filterData,
  };
}
