// In macOS:
// ⌘ means Command.
// ⌥ means Option (also called “Alt”)
// ⌃ means Control.
// ⇧ means Shift.

// In order to open snippets in chrome:
// cmd[ctrl]+alt+J -> ">>" -> sources -> ">>" to the right of "Pages" -> snippets -> New snippet

// this script in currently used in bootstrap/TinDog_exer/index.html

function input_name() {
  var test_prompt = prompt("Please type your name");
  var len_test_prompt = test_prompt.length;
  var len_remaining = 140 - len_test_prompt;
  // capitalize the first letter and decapitalize all other letters
  var first_letter_upper = test_prompt.slice(0, 1).toUpperCase();
  test_prompt = first_letter_upper + test_prompt.slice(1, len_test_prompt).toLowerCase();

  if (len_remaining < 0) {
    test_prompt = test_prompt.slice(0, 140);
    alert("You have typed in more than 140 characters, you have 0 characters left.");
  } else {
    alert("You have typed in " + len_test_prompt + " characters, you have " + len_remaining + " characters left.");
    //sample: You have typed in 5 characters, you have 135 characters left.
  }
  alert("Your name is: " + test_prompt);
}

function isLeap(year) {
  var remainder_4 = year % 4;
  var remainder_100 = year % 100;
  var remainder_400 = year % 400;
  if (remainder_4 == 0) {
    if (remainder_100 == 0) {
      if (remainder_400 == 0) {
        return "Leap year."
      } else {
        return "Not leap year.";
      }
    } else {
      return "Leap year.";
    }
  } else {
    return "Not leap year.";
  }
}

function whosPaying(names) {
  var len_person = names.length;
  // Math.random() only renders to a float number within (0,1)
  var picked_index = Math.random() * len_person;
  picked_index = Math.round(picked_index) - 1;
  var picked_person = names[picked_index];
  var who_pays = picked_person + ' is going to buy lunch today!'
  return who_pays;
}

function fibonacciGenerator(n) {
  var check_int = Number.isInteger(n);
  if (check_int === false) {
    return "Please input a positive integer!"
  }

  if (n == 1) {
    return [0];
  } else if (n == 2) {
    return [0, 1];
  } else if (n >= 3) {
    var fibo = [0, 1];
    for (var i = 2; i < n; i++) {
      fibo.push(fibo[i - 1] + fibo[i - 2]);
    }
    return fibo;
  }
  return "Please input a positive integer!"
}

function main() {
  // input_name();
}

main();
