// Note to self: add confirmation code so that you can edit your stay
function verifyName(name) {
  console.log(name);
  if (name.length < 1) {
    return false;
  }
  if (name != /^[A-Za-z]+/.exec(name)) {
    console.log("name has non-alpha character");
    return false;
  }
  return true;
}

function verifyEmail(email) {
  if (email.length < 1) {
    return false;
  }
  if (email.includes("@") == false || email.endsWith(".com") == false) {
    return false;
  }
  return true;
}

function verifyTelnum(telnum) {
  if (telnum.charAt(0) != "+") {
    console.log("+");
    return false;
  }

  if (telnum.charAt(1) != "1") {
    console.log("1");
    return false;
  }

  if (telnum.charAt(2) != "(") {
    console.log("(");
    return false;
  }

  for (i = 3; i <= 5; i++) {
    if (isNaN(telnum.charAt(i))) {
      console.log("area code");
      return false;
    }
  }

  if (telnum.charAt(6) != ")") {
    console.log(")");
    return false;
  }

  for (i = 8; i <= 10; i++) {
    if (isNaN(telnum.charAt(i))) {
      console.log("3 digits");
      return false;
    }
  }

  // if (telnum.charAt(10) != "-") {
  //   return false;
  // }

  for (i = 12; i <= 15; i++) {
    if (isNaN(telnum.charAt(i))) {
      console.log("4 digits");
      return false;
    }
  }

  return true;
}

function verifyDate(date, position) {
  if (position == "start") {
    if (date < Date.now()) {
      console.log("date is less than now");
      return false;
    }
  }
  else if (position == "end") {
    if (date < startDate.value) {
      console.log("end date is less than start");
      return false;
    }
  }
  return true;
}

function verifyTime(time, io) {
  if (io == "in") {
    if (time < "15:00" || time > "17:00") {
      console.log("check-in is out of window");
      return false;
    }
  }
  else if (io == "out") {
    if (time < "10:00" || time > "12:00") {
      console.log("checkout is out of window");
      return false;
    }
  }
  return true;
}

function generateConfCode() {
  confNum = ""
  for (i = 0; i < 3; i++) {
    confNum += Math.floor(Math.random() * 10);
  }
  confNum += "-"
  for (i = 0; i < 3; i++) {
    confNum += Math.floor(Math.random() * 10);
  }
  return confNum;
}

function verifyAllData() {
  fnameVerified = false;
  lnameVerified = false;
  emailVerified = true;
  telnumVerified = false;
  startDateVerified = false;
  endDateVerified = false;
  checkInTimeVerified = false;
  checkoutTimeVerified = false;

  var fnameVerified = verifyName(fname.value);
  var lnameVerified = verifyName(lname.value);
  var emailVerified = verifyEmail(email.value);
  var telnumVerified = verifyTelnum(telnum.value);
  var startDateVerified = verifyDate(startDate.value, "start");
  var endDateVerified = verifyDate(endDate.value, "end");
  var checkInTimeVerified = verifyTime(checkInTime.value, "in");
  var checkoutTimeVerified = verifyTime(checkoutTime.value, "out");

  var listToVerify = [fnameVerified, lnameVerified, emailVerified, telnumVerified, startDateVerified, endDateVerified, checkInTimeVerified, checkoutTimeVerified];

  console.log("fnameVerified = " + fnameVerified);
  console.log("lnameVerified = " + lnameVerified);
  console.log("emailVerified = " + emailVerified);
  console.log("telnumVerified = " + telnumVerified);
  console.log("startDateVerified = " + startDateVerified);
  console.log("endDateVerified = " + endDateVerified);
  console.log("checkInTimeVerified = " + checkInTimeVerified);
  console.log("checkoutTimeVerified = " + checkoutTimeVerified);

  dataVerified = true;
  for (i = 0; i <= listToVerify.length; i++) {
    if (listToVerify[i] == false) {
      dataVerified = false;
    }
  }

  if (Object.keys(inputtedConf).length == 0) {
    confNum = generateConfCode();
  }

  console.log(dataVerified);

  if (dataVerified == true) {saveData();}
}

function editData() {
  allData = chooseData(inputtedConf.value);
  fname.value = allData['fname'];
  lname.value = allData['lname'];
  email.value = allData['email'];
  telnum.value = allData['telnum'];
  startDate.value = allData['startDate'];
  endDate.value = allData['endDate'];
  checkInTime.value = allData['checkInTime'];
  checkoutTime.value = allData['checkoutTime'];
}

function chooseData(num) {
  data = readData();
  for (i = 0; i < data.length; i++) {
    console.log(num);
    console.log(data[i]);
    console.log(data[i]["confNum"] == num);
    if (data[i]["confNum"] == num) {
      return data[i]
    }
  }
}

function readData() {
  allStoredData = localStorage.getItem("allForms");
  console.log(allStoredData);
  storedData = JSON.parse(allStoredData);
  console.log(storedData);
  return storedData;
}

function saveData() {
  console.log("button clicked");
  form_data = {
    "fname":fname.value,
    "lname":lname.value,
    "email":email.value,
    "telnum":telnum.value,
    "startDate":startDate.value,
    "endDate":endDate.value,
    "checkInTime":checkInTime.value,
    "checkoutTime":checkoutTime.value,
    "confNum":confNum
  }

  if (inputtedConf.length != 0) {
    checkNum = confNum
    editIndex = null;
    for (i = 0; i < allForms.length; i++) {
      console.log(allForms[i]["confNum"]);
      console.log(checkNum);
      console.log(checkNum == allForms[i]["confNum"])
      if (confNum == allForms[i]["confNum"]) {
        console.log("here");
        editIndex = i;
      }
    }
    console.log(editIndex);
  }

  allForms.push(form_data);
  console.log(form_data);
  formJSON = JSON.stringify(allForms);
  localStorage.setItem("allForms", formJSON);
  console.log(localStorage.getItem("allForms"));
  // location.assign('./success.html'); //alternatively can use location.replace so they can't back out
}

function success() {
  allStoredData = readData()
  recentData = allStoredData[allStoredData.length - 1]
  console.log(recentData);
  mainDiv.innerHTML = "\n"; // just making sure it's cleared
  mainDiv.innerHTML += "<p>Name: " + recentData['fname'] + " " + recentData['lname'] + "</p>\n";
  mainDiv.innerHTML += "<p>Email: " + recentData['email'] + "</p>\n";
  mainDiv.innerHTML += "<p>Phone Number: " + recentData['telnum'] + "</p>\n";
  mainDiv.innerHTML += "<p>Booked Dates: " + recentData['startDate'] + "through" + recentData['endDate'] + "</p>\n";
  mainDiv.innerHTML += "<p>Check-In Time: " + recentData['checkInTime'] + "</p>\n";
  mainDiv.innerHTML += "<p>CheckoutTime: " + recentData['checkoutTime'] + "</p>\n";
  mainDiv.innerHTML += "<p>Confirmation Number: " + recentData['confNum'] + "</p>\n";
  mainDiv.innerHTML += "<h4> Keep your confirmation number! </h4>\n"
}

// localStorage.removeItem("allForms");

console.log(localStorage.getItem("allForms"));
if (localStorage.getItem("allForms") == null) {
  allForms = [];
}

else {
  allForms = JSON.parse(localStorage.getItem("allForms"));
}

console.log(allForms);

fname = document.getElementById("fname");
lname = document.getElementById("lname");
email = document.getElementById("email");
telnum = document.getElementById("telnum");
startDate = document.getElementById("startDate");
endDate = document.getElementById("endDate");
checkInTime = document.getElementById("checkInTime");
checkoutTime = document.getElementById("checkoutTime");
inputtedConf = document.getElementById("confNum");
