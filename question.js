exports.questionList = [{
    title: "Smaller Than Current Number",
    description: `Given the array nums, 
    for each nums[i] find out how many numbers in the array are smaller than it. 
    That is, for each nums[i] you have to count the number of valid j's such that j != i and nums[j] < nums[i].`,
    difficulty: "Easy",
    type: "Array",
    cacheInput: "",
    beginningCode: `
    // Please write inside this function
    function smallerThanCurrent(nums){

    }`,
    inputOne: [1,1,1],
    inputTwo: [8,1,2,2,3],
    outputOne: [0,0,0],
    outputTwo: [4,0,1,1,3],
    answers: {
        inputs: [[1,1,1],[8,1,2,2,3]],
        expectedOutputs: [[0,0,0],[4,0,1,1,3]]
    }
},{
    title: "Valid Palindrome Check",
    description: `Given a string, determine if it is a palindrome, considering only alphanumeric characters and ignoring cases.
    Note: A capitalized letter is not the same as non-capitalized letter. (i.e: N is NOT equal to n)
    `,
    difficulty: "Easy",
    type: "String",
    cacheInput: "",
    beginningCode: `
    // Please write inside this function
    function isValidPalindrome(str){

    }`,
    inputOne: "racecar",
    inputTwo: "hello",
    outputOne: true,
    outputTwo: false,
    answers: {
        inputs: ["racecar","hello","123321","DoRld"],
        expectedOutputs: [true,false,true,false]
    }
},{
    title: "Unique Occurences",
    description: `Given an array of integers arr, write a function that returns true if and only if the number of occurrences of each value in the array is unique.`,
    difficulty: "Easy",
    type: "Hash Table",
    cacheInput: "",
    beginningCode: `
    // Please write inside this function
    function uniqueOccurence(){
        
    }`,
    inputOne: [1,1,0,0,0,9,9,9,9],
    inputTwo: [1,1,3,2,3,2],
    outputOne: true,
    outputTwo: false,
    answers: {
        inputs: [[1,1,0,0,0,9,9,9,9],[1,1,3,2,3,2],[9,0]],
        expectedOutputs: [true,false,false]
    }
}]