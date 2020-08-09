exports.questionList = [{
    title: "Smaller Than Current Number",
    description: `Given the array (nums), 
    for each nums[i] find out how many numbers in the array are smaller than it. You have to count the number of valid j's such that j != i and nums[j] < nums[i].`,
    difficulty: "Easy",
    questionType: "Array",
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
    let count = [];
    
    for(var i = 0; i < nums.length; i++){
        const curr = nums[i];
        let counter = 0;
        for(var j = 0; j < nums.length; j++){
            if(i == j){
                continue
            }
            
            if(curr > nums[j]){
                counter++;
            }
        } 
        count.push(counter);
    }
    return count;
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
    description: `Given a string, determine if it is a palindrome. A palindrome is a word that is identical forward and backward.
    Note: A capitalized letter is not the same as non-capitalized letter. (i.e: N is NOT equal to n)
    `,
    difficulty: "Easy",
    questionType: "String",
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
    let left = 0;
    let right = str.length - 1;
    
    while(left < right){
        if(str[left] != str[right])
            return false;
        left++;
        right--;
    }
    
    return true;
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
    title: "Max Subarray Sum",
    description: `Given an integer array (nums), find a contiguous subarray (consecutive numbers) which contains at least one number that sums up to a largest sum and return it.`,
    difficulty: "Medium",
    questionType: "Divide and Conquer",
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
    var prev = 0;
    var max = -Number.MAX_VALUE;
  
    for (var i = 0; i < nums.length; i++) {
      prev = Math.max(prev + nums[i], nums[i]);
      max =  Math.max(max, prev);
    }
    
    return max;
}    
`,
    inputOne: [-2, 1, -3, 4, -1, 2, 1, -5, 4],
    inputTwo: [-3, 1, -8, 4, -1, 2, 1, -5, 5],
    outputOne: 6,
    outputTwo: 6,
    answers: {
        inputs: [[-2, 1, -3, 4, -1, 2, 1, -5, 4], [-3, 1, -8, 4, -1, 2, 1, -5, 5], [-2, -5, 6, -2, -3, 1, 5, -6], [2, 3, 4, 5, 7], [-2, 1, -3, 4, -1, 2, 1, -5, 4]],
        expectedOutputs: [6, 6, 7, 21, 6]
    }
}, {
    title: "Fibonacci Number",
    description: `The Fibonacci numbers, commonly denoted F(n), is a series of numbers that each number is the sum of the two preceding ones, starting from 0 and 1. F(N) = F(N-1)+F(N-2) for N >1. Given N, calculate F(N)`,
    difficulty: "Easy",
    questionType: "Recursion",
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
    if(N == 0){
        return 0;
    }
    
    if(N == 2 || N == 1){
        return 1;
    } else {
        return fib(N - 1) + fib(N-2);
    }
    
} 
`,
    inputOne: 2,
    inputTwo: 3,
    outputOne: 1,
    outputTwo: 2,
    answers: {
        inputs: [2, 3, 4, 6, 8],
        expectedOutputs: [1, 2, 3, 8, 21]
    }
}, {
    title: "Reverse a String Recursively",
    description: `Given a random string, write a program to reverse the string using Recursion`,
    difficulty: "Easy",
    questionType: "Recursion",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
function reverseStringRecursive(str) {

}

// Do not edit this line
module.exports = reverseStringRecursive;
`,
    solutionCode: `
function reverseStringRecursive(str) {
    let splittedStr = str.split("");
    console.log(splittedStr);
    
    let left = 0;
    let right = str.length - 1;
    
    while(left < right){
        const temp = splittedStr[left];
        splittedStr[left] = splittedStr[right];
        splittedStr[right] = temp;
        left++;
        right--;
    }
    
    return splittedStr.join("");
} 
`,
    inputOne: "Hello Earth",
    inputTwo: "I love coding",
    outputOne: "htraE olleH",
    outputTwo: "gnidoc evol I",
    answers: {
        inputs: ["Hello Earth", "I love coding", "Monday", "Chocolate", "cat"],
        expectedOutputs: ["htraE olleH", "gnidoc evol I", "yadnoM", "etalocohC", "tac"]
    }
}, {
    title: "Unique Occurences",
    description: `Given an array of integers (arr), write a program that returns true if and only if the number of occurrences of each value in the array is unique.`,
    difficulty: "Easy",
    questionType: "Hash Table",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
function uniqueOccurence(arr){

}

// Do not edit this line
module.exports = uniqueOccurence;
`,
    solutionCode: `
function uniqueOccurence(arr){
    const map = {};
    for(let i = 0; i < arr.length; i++){
        if(!map[arr[i]]){
            map[arr[i]] = 1;
        } else {
            const temp = map[arr[i]] + 1;
            map[arr[i]] = temp;
        }
    };
    
    const values = Object.values(map);
    
    const set = new Set();
    
    for(let j = 0; j < values.length; j++){
        set.add(values[j]);
    }   
    
    return values.length == set.size;
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
    title: "The Majority Number",
    description: `Given an array (nums), find the number that appears more than half the length. If the length is 6, find the number that appears 3 or more times.`,
    difficulty: "Medium",
    questionType: "Divide and Conquer",
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
    const half_length = nums.length / 2;
    const map = {};
    
    for(var i = 0; i < nums.length; i++){
        if(!map[nums[i]]){
            map[nums[i]] = 1;
        } else {
            const temp = map[nums[i]] + 1;
            map[nums[i]] = temp;
        }
    };
    
    for(var j = 0; j < nums.length; j++){
        if(map[nums[j]] >= half_length){
            return nums[j];
        }
    }
}    
`,
    inputOne: [3, 2, 3],
    inputTwo: [2, 2, 1, 1, 4, 2, 2],
    outputOne: 3,
    outputTwo: 2,
    answers: {
        inputs: [[3, 2, 3], [2, 2, 1, 1, 4, 2, 2], [3, 3, 4, 2, 3], [6, 5, 5, 7, 5, 1, 5], [8, 6, 8, 7, 4, 8, 3, 8, 8]],
        expectedOutputs: [3, 2, 3, 5, 8]
    }
}, {
    title: "All Repeated Numbers",
    description: `Given an array of integers (nums), write a function that returns all numbers that appeared twice in the array. If no pairs exist, return -1.`,
    difficulty: "Medium",
    questionType: "Array",
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
    const sortedNums = nums.sort();
    const result = [];
    let i = 0;
    
    while(i < sortedNums.length){
        if(sortedNums[i] == sortedNums[i+1]){
            result.push(sortedNums[i]);
            i += 2;
        } else {
            i++;
        }
    }
    
    if(result.length > 0){
        return result;
    } else {
        return -1;
    }
}       
`,
    inputOne: [4, 3, 2, 7, 8, 2, 3, 1],
    inputTwo: [4, 6, 4, 2, 3, 2],
    outputOne: [2, 3],
    outputTwo: [2, 4],
    answers: {
        inputs: [[4, 3, 2, 7, 8, 2, 3, 1], [4, 6, 4, 2, 3, 2], [1, 1, 3, 4, 6, 9, 5, 7, 9], [6, 1, 3, 4, 3, 2], [1, 3, 4, 9, 2, 5], [1, 1, 1, 1, 1]],
        expectedOutputs: [[2, 3], [2, 4], [1, 9], [3], -1, [1, 1]]
    }
}, {
    title: "Sum Pair",
    description: `Given an array of integers (arr) and a (sum), write a program that returns an array of those two numbers in increasing order whose sum matches the given (sum).`,
    difficulty: "Medium",
    questionType: "Array",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var findSumPair = function(arr, sum) {
    
}



// Do not edit this line
module.exports = findSumPair;
`,
    solutionCode: `
var findSumPair = function(arr, sum) {
    let map = {};
    for(var i = 0; i < arr.length;i++){
        if(!map[arr[i]]){
            map[arr[i]] = 1;
        } else {
            const newCount = map[arr[i]] + 1;
            map[arr[i]] = newCount;
        }
    }
    
    for(var j = 0; j < arr.length; j++){
        const current = arr[j];
        const compliment = sum - current;
        
        
        if(map[compliment] != null){
            // Check if it is NOT itself
            if(current == compliment){
                if(map[compliment] - 1 != 0){
                    return compliment < current ? [compliment, current] : [current, compliment]
                } else {
                    continue;
                }
            }    
            
            return compliment < current ? [compliment, current] : [current, compliment]
        }
    }
}

function helper(current,compliment){
    if(current == compliment){
        if(map[compliment] - 1 != 0){
            return compliment < current ? [compliment, current] : [current, compliment]
        } else {
            continue;
        }
    }    
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
        inputs: [{ arg1: [0, -1, 2, -3, 1], arg2: -2 }, { arg1: [0, -1, 2, 3, 5, 7], arg2: 4 }, { arg1: [1, -2, -1, 0, 5], arg2: 0 }, { arg1: [6, 1, 3, 4, 0, 2], arg2: 8 }, { arg1: [1, 3, 4, 9, 2, 5], arg2: 10 }],
        expectedOutputs: [[-3, 1], [-1, 5], [-1, 1], [2, 6], [1, 9]]
    }
}, {
    title: "Longest Consecutive Sequence",
    description: `Given an array of integers (nums), write a program to find the length of the longest consecutive sequence (i.e: [1,2,3] or [-2,-1,0] )`,
    difficulty: "Hard",
    questionType: "Array",
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
    const sortedArray = nums.sort((a,b) => {
        return a - b;
    });
    
    let longestSeq = 0; // 2
    let currentSeq = 1;
    
    for(let i = 0 ; i < nums.length;i++){
        if(sortedArray[i] + 1 == sortedArray[i+1]){
           currentSeq++;
           longestSeq = Math.max(longestSeq, currentSeq);
        } else {
            longestSeq = Math.max(longestSeq, currentSeq);
            currentSeq = 1;
        }
    };
    
    return longestSeq;
}    
`,
    inputOne: [-3, 6, 8, 1, -4, 2, 9, 3],
    inputTwo: [100, 44, 110, 41, 43, 42],
    outputOne: 3,
    outputTwo: 4,
    answers: {
        inputs: [[-3, 6, 8, 1, -4, 2, 9, 3], [100, 44, 110, 41, 43, 42], [-3, 15, -2, 4, -1, 20, 0, 1], [66, 4, 31, 5, 22, 6, 10], [0, 11, 1, 7, 2, 3, -1, 15, -2, 4]],
        expectedOutputs: [3, 4, 5, 3, 7]
    }
}, {
    title: "Pattern Searching",
    description: `Given a string (str) and a pattern (pat), find all occurrences of pattern in the string and return the indexes where they occur as an array.`,
    difficulty: "Hard",
    questionType: "String",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var findPattern = function(str, pat) {
    
}


// Do not edit this line
module.exports = findPattern;
`,
    solutionCode: `
var findPattern = function(str, pat) {
    let result = [];
    
    for(let i = 0; i <= str.length - pat.length; i++){
        
       if(str[i] == pat[0]){
            let counter = 1;
        
            for(let j = 1; j < pat.length; j++){
                if(str[i + j] == pat[j]){    
                  counter++;
                } else {
                  break;
                }
            }
            
            if(counter == pat.length){ 
              result.push(i);
            }
        }
      
    }
    
    return result;
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
        inputs: [{ arg1: "AABAACAADAABAABA", arg2: "AABA" }, { arg1: "THIS IS A PEN", arg2: "PEN" }, { arg1: "Hello World", arg2: "World" }, { arg1: "red hat, yellow hat, blue hat", arg2: "hat" }, { arg1: "Today is a sunny day", arg2: "day" }],
        expectedOutputs: [[0, 9, 12], [10], [6], [4, 16, 26], [2, 17]]
    }
}, {
    title: "Maximum Vowels",
    description: `Given a string (str) with only lowercase letters and an integer (k), return the maximum number of vowels in the substring with the length (k).`,
    difficulty: "Medium",
    questionType: "String",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
// Please write inside this function
var findMaxVowels = function(str, k) {
        
}


// Do not edit this line
module.exports = findMaxVowels;
`,
    solutionCode: `
var findMaxVowels = function(str, k) {
    const vowels = 'aeiou';
    let max = 0; 
    let count = 0; 
    
    for (let i = 0; i < str.length; i++) {
        if (i >= k) {
            if (vowels.indexOf(str[i - k]) > -1) {
                count--;
            }
        }

        if (vowels.indexOf(str[i]) > -1) {
            count++;
            max = Math.max(max, count);
            if (max === k) {
                return k;
            }
        }
    }
     
    return max;   
}
    `,
    inputOne: {
        arg1: "aabiiidefg",
        arg2: 3
    },
    inputTwo: {
        arg1: "aeiou",
        arg2: 2
    },
    outputOne: 3,
    outputTwo: 2,
    answers: {
        inputs: [{ arg1: "aabiiidefg", arg2: 3 }, { arg1: "aeiou", arg2: 2 }, { arg1: "rhythms", arg2: 4 }, { arg1: "tryhard", arg2: 4 }, { arg1: "today", arg2: 3 }],
        expectedOutputs: [3, 2, 0, 1, 2]
    }
}, {
    title: "Find Differences between arrays",
    description: `Write a function that compares two given arrays and return a new array with items only found in one of the two arrays (not found in both arrays). If two arrays contain the same items, return an empty array.`,
    difficulty: "Easy",
    questionType: "Array",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
    // Please write inside this function
function diffArray(arr1, arr2) {
    
}
    
    
// Do not edit this line
module.exports = diffArray;
`,
    solutionCode: `
function diffArray(arr1, arr2) {
    var newArr = [];

    function onlyInFirst(first, second) {
        for (var i = 0; i < first.length; i++) {
            if (second.indexOf(first[i]) === -1) {
                newArr.push(first[i]);
            }
        }
    }

    onlyInFirst(arr1, arr2);
    onlyInFirst(arr2, arr1);

    return newArr;
}`,
    inputOne: {
        arg1: [1, 2, 3, 5],
        arg2: [1, 2, 3, 4, 5]
    },
    inputTwo: {
        arg1: [1, 'red', 3, 'pink'],
        arg2: [1, 'red', 3, 4]
    },
    outputOne: [4],
    outputTwo: ['pink', 4],
    answers: {
        inputs: [{ arg1: [1, 2, 3, 5], arg2: [1, 2, 3, 4, 5] }, { arg1: ['pig', 'horse', 'lion', 'tiger'], arg2: ['pig', 'dog', 'cat', 'tiger'] }, { arg1: [], arg2: [33, 52, 40, 17] }, { arg1: [30, 28, 49, 61, 3, 58, 14, 75], arg2: [30, 28, 49, 61, 3, 58, 14, 75] }, { arg1: ['park', 'school', 'bread', 'bank', 'fruit'], arg2: ['park', 'hospital', 'school', 'supermarket', 'bank'] }],
        expectedOutputs: [[4], ['horse', 'lion', 'dog', 'cat'], [33, 52, 40, 17], [], ['bread', 'fruit', 'hospital', 'supermarket']]
    }
}, {
    title: "Convert to Spinal Tap Case",
    description: `Write a function to convert a given string to spinal case. Spinal case is all lowercase words joined by dashes, for example "happy-birthday".`,
    difficulty: "Medium",
    questionType: "String",
    cacheInput: "",
    isSolved: false,
    beginningCode: `
    // Please write inside this function
function spinalCaseConverter(str) {
    
}
    
    
// Do not edit this line
module.exports = spinalCaseConverter;
    `,
    solutionCode: `
function spinalCase(str) {
    str = str.replace(/([a-z])([A-Z])/g, "$1 $2");

    return str.toLowerCase().split(/(?:_| )+/).join("-");
}`,
    inputOne: 'Today Is Monday',
    inputTwo: "THIS IS A PEN",
    outputOne: 'today-is-monday',
    outputTwo: "this-is-a-pen",
    answers: {
        inputs: ['Today Is Monday', 'MaryPLays the-piano', 'HeLovesReadingBooks', 'Tom_hates_Chemistry_and_Math_classes'],
        expectedOutputs: ['today-is-monday', 'mary-plays-the-piano', 'he-loves-reading-books', 'tom-hates-chemistry-and-math-classes']
    }
}, {
    title: "Reversing a String",
    description: `Given a string, write a function that returns the reversed string without using the reverse() method.`,
    difficulty: "Easy",
    questionType: "String",
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
    let result = [];
    let array = str.split('');
    for (var i = array.length-1; i >= 0; i--){
        result.push(array[i]);
    }

    return result.join('');
}
        `,
    inputOne: 'Today Is Monday',
    inputTwo: "THIS IS A PEN",
    outputOne: 'yadnoM sI yadoT',
    outputTwo: "NEP A SI SIHT",
    answers: {
        inputs: ['Today Is Monday', 'hello world', 'coding is fun', 'GOOD JOB'],
        expectedOutputs: ['yadnoM sI yadoT', 'dlrow olleh', 'nuf si gnidoc', 'BOJ DOOG']
    }
}
]
