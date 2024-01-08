module.exports = Array.prototype.arraySum = function() {
  return this.reduce((accumulator, currentValue) => accumulator + currentValue, 0)
}