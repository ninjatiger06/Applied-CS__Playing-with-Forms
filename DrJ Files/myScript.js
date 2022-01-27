// Just check to see that we found the div element we are looking for
myDiv = document.getElementById("myDiv");
console.log(myDiv);

work = document.getElementById("work");
console.log(work);

spiritYes = document.getElementById("spiritYes");
console.log(spiritYes);

console.log(document.getElementById("spiritNo"));



// Click event to attach to button
function myClick () {
  // Quick check to verify that the function executes.
  // Get the values that were input into the two text boxes.
  var fname = document.getElementById('fname').value;
  var lname = document.getElementById('lname').value;

  myJSON = {
    "fname": fname,
    "lname": lname,
    "work": work.checked,
    "spirit": spiritYes.checked,
  }

  // By using = we *replace* the entire contents of the div tag.
  myDiv.innerHTML = "\n";
  // Now, using += we are *appending* to the new contents of the div tag.
  myDiv.innerHTML += "\t\t<h1>Whoa.</h1>\n"
  // Notice mixing of quotation marks, just like in Python.
  myDiv.innerHTML += "\t\t<img src='default.png' height=300/>\n";
  if (myJSON['work']) {
    // Notice here that we are appending the values of the variables.
    myDiv.innerHTML += "\t\t<p>" + myJSON['fname'] + " " + myJSON['lname'] + "</p>\n";
    myDiv.innerHTML += "<p>Box was checked.</p>\n";
  } else {
    myDiv.innerHTML += "\t\t<p>Box not checked.</p>\n";
  }
  if (myJSON['spirit']) {
    myDiv.innerHTML += "\t\t<p>Feeling the Spirit of Radio.</p>\n";
  } else {
    myDiv.innerHTML += "\t\t<p>Not Feeling the Spirit of Radio.</p>\n";
  }
}

function boxClick() {
  console.log(work.checked);
}

function myMouseOver() {
  document.getElementById('fname').style.backgroundColor = "blue"
}

function myMouseOut() {
  document.getElementById('fname').style.backgroundColor = ""
}
