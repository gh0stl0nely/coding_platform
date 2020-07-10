exports.questionList = [{
    title: "Smaller Than Current Number",
    description: `Given the array nums, 
    for each nums[i] find out how many numbers in the array are smaller than it. 
    That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].`,
    difficulty: "Easy",
    type: "Array",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
function smallerThanCurrent(nums){
    
}
// Do not edit this line
module.exports = smallerThanCurrent;
`,
    solutionCode: `
function smallerThanCurrent(nums){
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: [1, 1, 1],
    inputTwo: [8, 1, 2, 2, 3],
    outputOne: [0, 0, 0],
    outputTwo: [4, 0, 1, 1, 3],
    answers: {
        inputs: [[1, 1, 1], [8, 1, 2, 2, 3]],
        expectedOutputs: [[0, 0, 0], [4, 0, 1, 1, 3]]
    }
}, {
    title: "Valid Palindrome Check",
    description: `Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
    Note: A capitalized letter is not the same as non-capitalized letter. (i.e: N is NOT equal to n)
    `,
    difficulty: "Easy",
    type: "String",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
function isValidPalindrome(str){

}
// Do not edit this line
module.exports = isValidPalindrome;
`,
    solutionCode: `
function isValidPalindrome(str){
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: "racecar",
    inputTwo: "hello",
    outputOne: true,
    outputTwo: false,
    answers: {
        inputs: ["racecar", "hello", "123321", "DoRld"],
        expectedOutputs: [true, false, true, false]
    }
}, {
    title: "Maximum Sum of Subarray",
    description: `Given an integer array (nums), find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.`,
    difficulty: "Easy",
    type: "Divide and Conquer",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var maxSubArray = function(nums) {
    
}
// Do not edit this line
module.exports = maxSubArray;
`,
    solutionCode: `
var maxSubArray = function(nums) {
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    inputTwo: [-3, 1, -8, 4, -1, 2, 1, -5, 5],
    outputOne: 6,
    outputTwo: -2,
    answers: {
        inputs: [[-2, -5, 6, -2, -3, 1, 5, -6], [2, 3, 4, 5, 7], [-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expectedOutputs: [7, 21, 6]
    }
}, {
    title: "Fibonacci Number",
    description: `The Fibonacci numbers, commonly denoted F(n), is a series of numbers that each number is the sum of the two preceding ones, starting from 0 and 1. F(N) = F(N-1)+F(N-2) for N >1. Given N, calculate F(N)`,
    difficulty: "Easy",
    type: "Recursion",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var fib = function(N) {
    
}
// Do not edit this line
module.exports = fib;
`,
    solutionCode: `
var fib = function(N) {
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: 2,
    inputTwo: 3,
    outputOne: 1,
    outputTwo: 2,
    answers: {
        inputs: [4, 6, 8],
        expectedOutputs: [3, 8, 21]
    }
}, {
    title: "Reverse a String Recursively",
    description: `Given a random string, write a function to reverse the string.`,
    difficulty: "Easy",
    type: "Recursion",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
function reverseString(str) {

}
// Do not edit this line
module.exports = reverseString;
`,
    solutionCode: `
function reverseString(str) {
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: "Hello Earth",
    inputTwo: "I love coding",
    outputOne: "htraE olleH",
    outputTwo: "gnidoc evol I",
    answers: {
        inputs: ["Monday", "Chocolate", "cat"],
        expectedOutputs: ["yadnoM", "etalocohC", "tac"]
    }
}, {
    title: "Unique Occurences",
    description: `Given an array of integers arr, write a function that returns true if and only if the number of occurrences of each value in the array is unique.`,
    difficulty: "Easy",
    type: "Hash Table",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
function uniqueOccurence(){

}
// Do not edit this line
module.exports = uniqueOccurence;
`,
    solutionCode: `
function isValidPalindrome(str){
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: [1, 1, 0, 0, 0, 9, 9, 9, 9],
    inputTwo: [1, 1, 3, 2, 3, 2],
    outputOne: true,
    outputTwo: false,
    answers: {
        inputs: [[1, 1, 0, 0, 0, 9, 9, 9, 9], [1, 1, 3, 2, 3, 2], [9, 0]],
        expectedOutputs: [true, false, false]
    }
}, {
    title: "Find the Majority Number",
    description: `Given an array of length n, find the number that appears more than half times of the length.`,
    difficulty: "Medium",
    type: "Divide and Conquer",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var findMajority = function(nums) {
    
}
// Do not edit this line
module.exports = findMajority;
`,
    solutionCode: `
var findMajority = function(nums) {
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: [3, 2, 3],
    inputTwo: [2, 2, 1, 1, 4, 2, 2],
    outputOne: 3,
    outputTwo: 2,
    answers: {
        inputs: [[3, 3, 4, 2, 3], [6, 5, 5, 7, 5, 1, 5], [8, 6, 8, 7, 4, 8, 3, 8, 8]],
        expectedOutputs: [3, 5, 8]
    }
}, {
    title: "Find All Repeated Numbers",
    description: `Given an array of integers, write a function that returns all numbers that appeared twice in the array. If no pairs exist, return -1.`,
    difficulty: "Medium",
    type: "Array",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var findNumbers = function(nums) {
    
}
// Do not edit this line
module.exports = findNumbers;
`,
    solutionCode: `
var findNumbers = function(nums) {
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: [4, 3, 2, 7, 8, 2, 3, 1],
    inputTwo: [4, 6, 4, 2, 3, 2],
    outputOne: [2, 3],
    outputTwo: [2, 4],
    answers: {
        inputs: [[1, 1, 3, 4, 6, 9, 5, 7, 9], [6, 1, 3, 4, 3, 2], [1, 3, 4, 5, 2, 5]],
        expectedOutputs: [[1, 9], [3], [5]]
    }
}, {
    title: "Find Sum Pair",
    description: `Given an array of integers and a number x, write a function that returns two numbers that has a sum of x.`,
    difficulty: "Medium",
    type: "Array",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var findSumPair = function(array, sum) {
    
}
// Do not edit this line
module.exports = findSumPair;
`,
    solutionCode: `
var findSumPair  = function(array, sum) {
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: {
        arg1: [0, -1, 2, -3, 1],
        arg2: -2
    },
    inputTwo: {
        arg1: [0, -1, 2, 3, 5, 7],
        arg2: 4
    },
    outputOne: [-3, 1],
    outputTwo: [-1, 5],
    answers: {
        inputs: [{ arg1: [1, -2, 1, 0, 5], arg2: 0 }, { arg1: [6, 1, 3, 4, 0, 2], arg2: 8 }, { arg1: [1, 3, 4, 9, 2, 5], arg2: 10 }],
        expectedOutputs: [[-1], [6, 2], [1, 9]]
    }
}, {
    title: "Find the Longest Consecutive Sequence",
    description: `Given an array of integers, write a function to find the length of the longest consecutive sequence.`,
    difficulty: "Hard",
    type: "Array",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var longestConsecutive = function(nums) {
    
}
// Do not edit this line
module.exports = longestConsecutive;
`,
    solutionCode: `
var longestConsecutive = function(nums) {
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: [-3, 6, 8, 1, -4, 2, 9, 3],
    inputTwo: [100, 44, 110, 41, 43, 42],
    outputOne: 3,
    outputTwo: 4,
    answers: {
        inputs: [[-3, 15, -2, 4, -1, 20, 0, 1], [66, 4, 31, 5, 22, 6, 10], [0, 11, 1, 7, 2, 3, -1, 15, -2, 4]],
        expectedOutputs: [5, 3, 6]
    }
}, {
    title: "Pattern Searching",
    description: `Given a string and a pattern, find all occurrences of pattern in the string and return the indexes where they occur.`,
    difficulty: "Hard",
    type: "String",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var findPattern = function(string, pattern) {
    
}
// Do not edit this line
module.exports = findPattern;
`,
    solutionCode: `
var findPattern = function(string, pattern) {
    [INSERT SOLUTION HERE]
}    
`,
    inputOne: {
        arg1: "AABAACAADAABAABA",
        arg2: "AABA"
    },
    inputTwo: {
        arg1: "THIS IS A PEN",
        arg2: "PEN"
    },
    outputOne: [0, 9, 12],
    outputTwo: [10],
    answers: {
        inputs: [{ arg1: "Hello World", arg2: "World" }, { arg1: "red hat, yellow hat, blue hat", arg2: "hat" }, { arg1: "Today is a sunny day", arg2: "day" }],
        expectedOutputs: [[8], [4, 16, 26], [2, 17]]
    }
}, {
    title: "Maximum Number of Vowels in the Substring of Given Length",
    description: `Given a string with only lowercase letters and an integer k, return the maximum number of vowels in the substring with the length k.`,
    difficulty: "Medium",
    type: "String",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
    // Please write inside this function
var findMaxVowels = function(string, k) {
        
}
// Do not edit this line
module.exports = findPattern;
`,
    solutionCode: `
var findMaxVowels = function(string, k) {
    [INSERT SOLUTION HERE]
}    
    `,
    inputOne: {
        arg1: "AABIIIDEFG",
        arg2: 3
    },
    inputTwo: {
        arg1: "aeiou",
        arg2: 2
    },
    outputOne: 3,
    outputTwo: 2,
    answers: {
        inputs: [{ arg1: "rhythms", arg2: 4 }, { arg1: "tryhard", arg2: 4 }, { arg1: "today", arg2: 3 }],
        expectedOutputs: [0, 1, 2]
    }
}]