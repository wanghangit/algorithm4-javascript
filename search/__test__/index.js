const { BST } = require("../BST")
const { readFile } = require("../../util")

const data = readFile("/search/__test__/test.txt")

const arr = data.split("\n")
let words = []
arr.forEach(d => {
    words = words.concat(d.split(" "))
});

