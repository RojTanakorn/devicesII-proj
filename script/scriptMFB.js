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

function MFBHandleClick(a) {
  // Declare variable of checking null values
  var r1c = document.getElementById("MFBr1").value;
  var r2c = document.getElementById("MFBr2").value;
  var r3c = document.getElementById("MFBr3").value;
  var c1c = document.getElementById("MFBc1").value;
  var c2c = document.getElementById("MFBc2").value;
  var cfreqc = document.getElementById("MFBcfreq").value;
  var qc = document.getElementById("MFBq").value;
  // convert unit to value (10^x)
  var unitr1 = calpower(Number(document.getElementById("ur1").value));
  var unitr2 = calpower(Number(document.getElementById("ur2").value));
  var unitr3 = calpower(Number(document.getElementById("ur3").value));
  var unitc1 = calpower(Number(document.getElementById("uc1").value));
  var unitc2 = calpower(Number(document.getElementById("uc2").value));
  // variable for calculating
  var calr1 = 0;
  var calr2 = 0;
  var calr3 = 0;
  var calc1 = 0;
  var calc2 = 0;
  var calf = 0;
  var calq = 0;
  var calw0 = 2 * pi * Number(cfreqc);
  // declare gain variable
  var dcg = 0; // DC Gain
  var cg = 0; // 3dB Gain

  if (a == 1) {
    //find corner frequency
    if (
      cfreqc == "" ||
      (r2c !== "" && r3c !== "" && c1c !== "" && c2c !== "" && cfreqc !== "")
    ) {
      calf = (
        1 /
        (2 *
          pi *
          Math.sqrt(
            Number(r2c) *
              Number(r3c) *
              Number(c1c) *
              Number(c2c) *
              unitr2 *
              unitr3 *
              unitc1 *
              unitc2
          ))
      ).toFixed(3);
      document.getElementById("MFBcfreq").value = calf.toString(); // Show output
    }
    // find R2 R3
    else if (c1c != "" && c2c != "" && cfreqc != "") {
      if (r2c == "" && r3c == "") {
        calr2 =
          1 / (calw0 * Math.sqrt(Number(c1c) * Number(c2c) * unitc1 * unitc2));
        document.getElementById("MFBr2").value = (calr2 / unitr2)
          .toFixed(3)
          .toString(); // Show output
        document.getElementById("MFBr3").value = (calr2 / unitr3)
          .toFixed(3)
          .toString(); // Show output
      }
      // find R3
      else if (r2c != "") {
        calr3 =
          1 /
          (Number(r2c) *
            unitr2 *
            Number(c1c) *
            Number(c2c) *
            unitc1 *
            unitc2 *
            Math.pow(calw0, 2));
        document.getElementById("MFBr3").value = (calr3 / unitr3)
          .toFixed(3)
          .toString(); // Show output
      }
      // find R2
      else if (r3c != "") {
        calr2 =
          1 /
          (Number(r3c) *
            unitr3 *
            Number(c1c) *
            Number(c2c) *
            unitc1 *
            unitc2 *
            Math.pow(calw0, 2));
        document.getElementById("MFBr2").value = (calr2 / unitr2)
          .toFixed(3)
          .toString(); // Show output
      }
    }
    // find C1 C2
    else if (r2c != "" && r3c != "" && cfreqc != "") {
      if (c1c == "" && c2c == "") {
        calc1 =
          1 / (calw0 * Math.sqrt(Number(r2c) * Number(r3c) * unitr2 * unitr3));
        document.getElementById("MFBc1").value = (calc1 / unitc1)
          .toFixed(3)
          .toString(); // Show output
        document.getElementById("MFBc2").value = (calc1 / unitc2)
          .toFixed(3)
          .toString(); // Show output
      }
      // find c1
      else if (c2c != "") {
        calc1 =
          1 /
          (Number(r2c) *
            unitr2 *
            Number(r3c) *
            Number(c2c) *
            unitr3 *
            unitc2 *
            Math.pow(calw0, 2));
        document.getElementById("MFBc1").value = (calc1 / unitc1)
          .toFixed(3)
          .toString(); // Show output
      }
      //find c2
      else if (c1c != "") {
        calc2 =
          1 /
          (Number(r2c) *
            unitr2 *
            Number(r3c) *
            Number(c1c) *
            unitr3 *
            unitc1 *
            Math.pow(calw0, 2));
        document.getElementById("MFBc2").value = (calc2 / unitc2)
          .toFixed(3)
          .toString(); // Show output
      }
    } else {
      alert("Error! Please try again.");
    }
  } else if (a == 2) {
    //find Q
    if (
      (r1c != "" && r2c != "" && r3c != "" && c1c != "" && cfreqc != "") ||
      (r1c != "" &&
        r2c != "" &&
        r3c != "" &&
        c1c != "" &&
        qc != "" &&
        cfreqc != "")
    ) {
      calq =
        calw0 /
        ((1 / (Number(c1c) * unitc1)) *
          (1 / (Number(r1c) * unitr1) +
            1 / (Number(r2c) * unitr2) +
            1 / (Number(r3c) * unitr3)));
      document.getElementById("MFBq").value = calq.toFixed(5).toString();
    }
    // find R1
    else if (qc != "" && r2c != "" && r3c != "" && c1c != "" && cfreqc != "") {
      calr1 =
        1 /
        ((Number(c1c) * unitc1 * calw0) / Number(qc) -
          1 / (Number(r2c) * unitr2) -
          1 / (Number(r3c) * unitr3));
      document.getElementById("MFBr1").value = (calr1 / unitr1)
        .toFixed(3)
        .toString();
    } else {
      alert("Error! Please try again.");
    }
  } else {
    //find DC Gain
    if (r3c != "" && r1c != "") {
      dcg = -((Number(r3c) * unitr3) / (Number(r1c) * unitr1));
      document.getElementById("MFBdcGain").value = dcg.toFixed(3).toString(); // Show DC Gain
      document.getElementById("MFBdcGaindb").value = calGain(
        Math.abs(dcg)
      ).toString(); // Show DC Gain in dB

      if (qc != "") {
        cg = dcg * Number(qc);
        document.getElementById("MFB3dbGain").value = cg.toFixed(3).toString(); // Show DC Gain
        document.getElementById("MFB3dbGaindb").value = calGain(
          Math.abs(cg)
        ).toString(); // Show DC Gain in dB
      } else {
        document.getElementById("MFB3dbGain").value = " -"; // Show DC Gain
        document.getElementById("MFB3dbGaindb").value = " -"; // Show DC Gain in dB
      }
    } else {
      alert("Error! Please try again.");
    }
  }
}
