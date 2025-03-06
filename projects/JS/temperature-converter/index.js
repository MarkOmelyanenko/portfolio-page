function convert() {
  if (document.getElementById("to-celcius").checked) {
    let inputTemperature = Number(
      document.getElementById("input-temperature").value
    );
    inputTemperature = ((inputTemperature - 32) * 5) / 9;
    inputTemperature = document.getElementById("result").textContent =
      inputTemperature.toFixed(1);
  } else if (document.getElementById("to-farenheit").checked) {
    let inputTemperature = Number(
      document.getElementById("input-temperature").value
    );
    inputTemperature = (inputTemperature * 9) / 5 + 32;
    inputTemperature = document.getElementById("result").textContent =
      inputTemperature.toFixed(1);
  } else {
    document.getElementById("result").textContent = `You entered wrong data!`;
  }
}
