/*
Scope is, in short, the concept of where something is available. In the case of JavaScript, it has to do with where declared variables and methods are available within our code.

Scope is a ubiquitous concept in programming and one of the most misunderstood principles in JavaScript, frustrating even seasoned engineers. Not understanding how scope works will lead to pain.
 */

// *****************************Global execution context *****************************

// 'myFunc' is declared in the global scope and available everywhere in your code:
function myFunc() {
  return 42;
}
// => undefined

// 'myVar' is able to reference and invoke 'myFunc' because both are declared in the same scope (the global execution context):
const myVar = myFunc() * 2;
// => undefined

myVar;
// => 84
console.log(myVar);

/**
 Top Tip: If a variable or function is not declared inside a function or block, it's in the global execution context.
 */

// *****************************Function scope*****************************
function myFunc() {
  const myVar = 42;

  return myVar * 2;
}
//=> undefined

console.log(myFunc()); //=> 84

// from outside the function, we can't reference anything declared inside of it:

function myFunc() {
  const myVar = 42;
}
// => undefined

myVar * 2;
// Uncaught ReferenceError: myVar is not defined

// *****************************Block scope*****************************
// A block statement also creates its own scope... kind of.Variables declared with var are not block-scoped:
if (true) {
  var myVar2 = 42;
}

// myVar;
console.log(myVar2);

// However, variables declared with const and let are block-scoped
if (true) {
  const myVar = 42;

  let myOtherVar = 9001;
}

myVar;
console.log(myVar);
// Uncaught ReferenceError: myVar is not defined

myOtherVar;
console.log(myOtherVar);
// Uncaught ReferenceError: myOtherVar is not defined

/*
This is yet another reason to never use var. As long as you stick to declaring variables with const and let, what happens in block stays in block.

 */

// ***************************** The global gotcha *****************************

/**
 In a perfect world, you'd always remember to declare new variables with const and let, and you'd never run into any weird scoping issues. However, it's inevitable that at some point you're going to forget the const or let and accidentally do something like:

firstName = "Ada";

Variables created without a const, let, or var keyword are always globally-scoped, regardless of where they sit in your code. If you create one inside of a block, it's still available globally:
 */
if (true) {
  lastName = "Lovelace";
}

lastName;
console.log(lastName);
// => "Lovelace"

// If you create one inside of a function — wait for it — it's still available globally:

function bankAccount() {
  secretPassword = "il0v3pupp135";

  return "bankAccount() function invoked!";
}

bankAccount();
// => "bankAccount() function invoked!"

secretPassword;
// => "il0v3pupp135"

/**
 Oh no; our super secret password has leaked into the global scope and is available everywhere! Declaring global variables and functions should only be used as a last resort if you absolutely need access to something everywhere in your program. In general, it's best practice to make variables and functions available only where they're needed — and nowhere else.
 ***Top Tips***
1) Always use const and let to declare variables.
2) Keep in mind that every function creates its own scope, and any variables or functions you declare inside of the function will not be available outside of it.
3) For Dijkstra's sake, always use const and let to declare variables.

 */

// ******************************Scope Chain******************************************
// Nested scopes and the scope chain
const globalVar = 1;

function firstFunc() {
  const firstVar = 2;

  return firstVar + globalVar;
}

firstFunc();
console.log(firstFunc());
// => 3

// All variables and functions declared in outer scopes are available in inner scopes via the scope chain
const globalVar2 = 1;

function firstFunc() {
  const firstVar = 2;

  function secondFunc() {
    const secondVar = 3;

    return secondVar + firstVar + globalVar2;
  }

  const resultFromSecondFunc = secondFunc();

  return resultFromSecondFunc;
}

firstFunc();
// => 6

/*
NOTE: The scope chain only goes in one direction. An outer scope does not have access to things declared in an inner scope. In the previous code snippet, firstFunc() cannot access secondVar. In addition, two functions declared in the same scope do not have access to anything declared in the other's scope:
*/
const fruit = "Apple";

function first() {
  const vegetable = "Broccoli";

  console.log("fruit:", fruit);
  console.log("vegetable:", vegetable);
  console.log("legume:", legume);
}

function second() {
  const legume = "Peanut";

  console.log("fruit:", fruit);
  console.log("legume:", legume);
  console.log("vegetable:", vegetable);
}

// Both first() and second() have access to fruit, but first() cannot access legume and second() cannot access vegetable

first();
// LOG: fruit: Apple
// LOG: vegetable: Broccoli
// ERROR: Uncaught ReferenceError: legume is not defined

second();
// LOG: fruit: Apple
// LOG: legume: Peanut
// ERROR: Uncaught ReferenceError: vegetable is not defined
