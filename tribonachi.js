const vowels = ["a", "e", "i", "o", "u" ]
const str ="dasdasfasda"
function vowelCOunt(str){
    const vowelsa = str.split("").filter((char)=>vowels.includes(char))
    return vowels.length
}
console.log(vowelCOunt(str))