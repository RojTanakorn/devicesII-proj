// Declare pi value
var pi = Math.PI;

// Function for calculating prefix number (10^x)
function calpower(num) {
  return Math.pow(10, num);
}

// Function for calculating gain in dB (log)
function calGain(a0) {
  return 20 * Math.log10(a0);
}

function SKHandleClick(a) {
  // Declare variable for checking null values
  var r2c = document.getElementById("SKr2").value;
  var c2c = document.getElementById("SKc2").value;
  var cfreqc = document.getElementById("SKcfreq").value;
  var qc = document.getElementById("SKq").value;
  var mc = document.getElementById("SKm").value;
  var nc = document.getElementById("SKn").value;

  // convert unit to value (10^x)
  var unitr1 = calpower(Number(document.getElementById("ur1").value));
  var unitr2 = calpower(Number(document.getElementById("ur2").value));
  var unitc1 = calpower(Number(document.getElementById("uc1").value));
  var unitc2 = calpower(Number(document.getElementById("uc2").value));

  // variable for calculating
  var calr1 = 0;
  var calr2 = 0;
  var calc1 = 0;
  var calc2 = 0;
  var calq = 0;
  var calw0 = 2 * pi * Number(cfreqc);
  var caln = 0;

  // declare gain variable
  var cg = 0; // 3dB Gain

  // Q m n Calculation
  if (a == 0) {
    if (qc != "" && mc != "") {
      caln = Math.pow(Number(qc) * (Number(mc) + 1), 2) / Number(mc);
      document.getElementById("SKn").value = caln.toFixed(5).toString();
    } else if (mc != "" && nc != "") {
      calq = Math.sqrt(Number(mc) * Number(nc)) / (Number(mc) + 1);
      document.getElementById("SKq").value = calq.toFixed(5).toString();
    } else {
      alert("Please insert only 2 values except finding m.");
    }
  }

  // Corner frequency and components calculaion
  else if (a == 1) {
    // find R mR
    if (cfreqc != "" && mc != "" && nc != "" && c2c != "") {
      calr2 =
        1 / (calw0 * Number(c2c) * unitc2 * Math.sqrt(Number(mc) * Number(nc)));
      calr1 = Number(mc) * calr2;
      calc1 = Number(nc) * Number(c2c) * unitc2;
      document.getElementById("SKr1").value = (calr1 / unitr1)
        .toFixed(3)
        .toString();
      document.getElementById("SKr2").value = (calr2 / unitr2)
        .toFixed(3)
        .toString();
      document.getElementById("SKc1").value = (calc1 / unitc1)
        .toFixed(3)
        .toString();
    }

    // find C nC
    else if (cfreqc != "" && mc != "" && nc != "" && r2c != "") {
      calc2 =
        1 / (calw0 * Number(r2c) * unitr2 * Math.sqrt(Number(mc) * Number(nc)));
      calr1 = Number(mc) * Number(r2c) * unitr2;
      calc1 = Number(nc) * calc2;
      document.getElementById("SKr1").value = (calr1 / unitr1)
        .toFixed(3)
        .toString();
      document.getElementById("SKc2").value = (calc2 / unitc2)
        .toFixed(3)
        .toString();
      document.getElementById("SKc1").value = (calc1 / unitc1)
        .toFixed(3)
        .toString();
    } else {
      alert("Please insert only 2 values (freq&R2 or freq&C2)");
    }
  }
  // Gain calculation
  else {
    if (qc != "") {
      cg = Number(qc);
      document.getElementById("SK3dbGain").value = cg.toFixed(3).toString();
      document.getElementById("SK3dbGaindb").value = calGain(cg)
        .toFixed(3)
        .toString();
    } else if ((mc != "") & (nc != "")) {
      calq = Math.sqrt(Number(mc) * Number(nc)) / (Number(mc) + 1);
      cg = Number(calq);
      document.getElementById("SK3dbGain").value = cg.toFixed(3).toString();
      document.getElementById("SK3dbGaindb").value = calGain(cg);
    } else {
      alert("Using at least Q for calculating.");
    }
  }
}
