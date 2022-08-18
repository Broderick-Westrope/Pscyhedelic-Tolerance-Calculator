function calculate() {
    let lastDose = document.getElementById("last-dose").value;
    let desiredDose = document.getElementById("desired-dose").value;
    let daysSince = roundTo(document.getElementById("days-since").value, 0);

    if (daysSince > 12) {
        alert("LSD tolerance is fully reset after around 12 days. This calculator only allows you to visualize the tolerance if your last dose was within this period.")
        return false;
    } else if (daysSince < 0) {
        alert("The days since your last dose must be greater than 0.")
        return false;
    } else {
        let baseDose = ((280.059565 * (Math.pow(daysSince, -0.412565956))) * (lastDose / 100) - lastDose);
        // How much needs to be taken for the same effects
        let goalDose = (parseFloat(desiredDose) + parseFloat(baseDose));
        // How much the desired dose will effect you right now
        let effectDose = parseFloat(desiredDose) - parseFloat(baseDose);
        return displayResults(daysSince, roundTo(desiredDose, 2), roundTo(goalDose, 2), roundTo(effectDose, 2));
    }
}

/*
daysSince: Days since the last dose
desiredDose: The effects the user wants at 0 tolerance
goalsDose: The dose required for the same effects given the current tolerance
effectDose: The 0 tolerance equivalent of taking the desired dose (at the current tolerance).
*/
function displayResults(daysSince, desiredDose, goalDose, effectDose) {
    document.getElementById("result1").innerHTML = "In " + (12 - daysSince) + " days your tolerance will be reset.";

    if (effectDose < 0) {
        document.getElementById("result3").innerHTML = "If you take the desired dose of " + desiredDose + "&mu;g today you will feel little to no effects.";
    } else {
        document.getElementById("result3").innerHTML = "If you take the desired dose of " + desiredDose + "&mu;g today you will feel the same effects as taking " + effectDose + "&mu;g with no tolerance.";
    }

    document.getElementById("result2").innerHTML = "If you take " + goalDose + "&mu;g today you will feel the same effects as taking your desired dose of " + desiredDose + "&mu;g with no tolerance.";

    $(".results").show();
    return true;
}

function roundTo(n, digits) {
    var negative = false;
    if (digits === undefined) {
        digits = 0;
    }
    if (n < 0) {
        negative = true;
        n = n * -1;
    }
    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(digits);
    if (negative) {
        n = (n * -1).toFixed(digits);
    }
    return parseFloat(n);
}