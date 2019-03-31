// Declare pi value
var pi = Math.PI;

// Function for calculating prefix number (10^x)
function calpower(num) {
  return Math.pow(10, num);
}

// Function for calculating gain in dB (log)
function calGain(a0) {
  return (20 * Math.log10(a0)).toFixed(3);
}

// Function for calculating 3dB frequency
function KHNcornerHandleClick() {
  // Declare variable for calculating and checking null values
  var r_3db = document.getElementById("KHNr3db").value;
  var c_3db = document.getElementById("KHNc3db").value;
  var c_freq = document.getElementById("KHNcfreq").value;
  // convert unit to value (10^x)
  var unitr = calpower(Number(document.getElementById("KHNpickcOhm").value));
  var unitc = calpower(Number(document.getElementById("KHNpickcFarad").value));

  // Check null values
  if (
    (r_3db == "" && c_3db == "" && c_freq == "") ||
    (r_3db == "" && c_3db == "") ||
    (r_3db == "" && c_freq == "") ||
    (c_3db == "" && c_freq == "")
  ) {
    // alert
    alert("Plase insert at least 2 values");
  }

  // Doing calculation
  // find R 3dB
  else if (r_3db == "") {
    var r = (
      1 /
      (2 * pi * Number(c_freq) * Number(c_3db) * unitc) /
      unitr
    ).toFixed(3); // Answer of R 3dB
    document.getElementById("KHNr3db").value = r.toString(); // Show output
  }
  // find C 3dB
  else if (c_3db == "") {
    var c = (
      1 /
      (2 * pi * Number(c_freq) * Number(r_3db) * unitr) /
      unitc
    ).toFixed(3); // Answer of C 3dB
    document.getElementById("KHNc3db").value = c.toString(); // Show output
  }
  //find corner frequency
  else if (c_freq == "" || (r_3db !== "" && c_3db !== "" && c_freq !== "")) {
    var f = (
      1 /
      (2 * pi * Number(r_3db) * Number(c_3db) * unitr * unitc)
    ).toFixed(3); // Answer of corner frequency
    document.getElementById("KHNcfreq").value = f.toString(); // Show output
  }
}

// Function for calculating components
function KHNcompHandleClick() {
  // declare gain variable
  var dcg = 0; // DC Gain
  var cg = 0; // 3dB Gain
  // declare variable to check null value
  var qc = document.getElementById("KHNq").value;
  var r1c = document.getElementById("KHNr1").value;
  var r2c = document.getElementById("KHNr2").value;
  // convert unit to value (10^x)
  var unitr1 = calpower(Number(document.getElementById("KHNpickr1").value));
  var unitr2 = calpower(Number(document.getElementById("KHNpickr2").value));
  // declare variable for calculating
  var q = Number(qc);
  var r1 = Number(r1c) * unitr1;
  var r2 = Number(r2c) * unitr2;

  // check null values
  if (
    (r1c == "" && r2c == "" && qc == "") ||
    (r1c == "" && r2c == "") ||
    (r1c == "" && qc == "") ||
    (r2c == "" && qc == "")
  ) {
    // alert
    alert("Plase insert Q, R1, R2 at least 2 values for calculating");
  }

  // Doing calculation
  else {
    // find Q
    if (qc == "" || (r1c !== "" && r2c !== "" && qc !== "")) {
      var ansq = ((r1 + r2) / (2 * r1)).toFixed(3); // Answer of Q
      dcg = (2 * r2) / (r1 + r2); // Answer of DC Gain
      cg = (dcg * (r1 + r2)) / (2 * r1); // Answer of 3dB Gain
      document.getElementById("KHNq").value = ansq.toString(); // Show output
    }
    // find R1
    else if (r1c == "") {
      var ansr1 = (r2 / (2 * q - 1) / unitr1).toFixed(3); // Answer of R1
      dcg = (2 * r2) / (r2 / (2 * q - 1) + r2); // Answer of DC Gain
      cg = dcg * q; // Answer of 3dB Gain
      document.getElementById("KHNr1").value = ansr1.toString(); // Show output
    }
    // fing R2
    else if (r2c == "") {
      var ansr2 = (((2 * q - 1) * r1) / unitr2).toFixed(3); // Answer of R2
      dcg = (2 * ((2 * q - 1) * r1)) / (r1 + (2 * q - 1) * r1); // Answer of DC Gain
      cg = dcg * q; // Answer of 3dB Gain
      document.getElementById("KHNr2").value = ansr2.toString(); // Show output
    }

    document.getElementById("KHNdcGain").value = dcg.toFixed(3).toString(); // Show DC Gain
    document.getElementById("KHNdcGaindb").value = calGain(dcg).toString(); // Show DC Gain in dB
    document.getElementById("KHN3dbGain").value = cg.toFixed(3).toString(); // Show 3dB Gain
    document.getElementById("KHN3dbGaindb").value = calGain(cg).toString(); // Show 3dB Gain in dB
  }
}
