const end = document.getElementsByClassName('end')[0],
      container = document.getElementsByClassName('container')[0],
      numericInput = [...document.getElementsByClassName('numericInput')],
      span = [...document.getElementsByTagName("span")],
      containerLabel = document.getElementsByClassName('containerLabel')[0],
      radio = [...document.getElementsByClassName('radio')],
      label = [...document.getElementsByTagName("label")],
      jobTitle = ["Сл.", "Св.", "Эл.", "М."],
      rate = [107, 1000, 117, 206],
      containerInputHospital = document.getElementById('containerInputHospital'),
      containerInputDowntime = document.getElementById('containerInputDowntime'),
      td = document.getElementsByTagName('td'),
      containerTable = document.getElementsByClassName('containerTable')[0];

let hours,
    salary,
    overtime,
    holidays,
    laborSickLeave,
    minimumSickLeave,
    experience,
    night,
    result,
    harmful,
    ratio,
    beforeTax,
    tax,
    prize,
    annualAverage,
    nightSalary,
    downtimeResult,
    medical = "",
    button = [...document.getElementsByTagName("button")];

button[0].addEventListener("click", function() {
  span[0].classList.toggle("marginTopSpan");
  numericInput[0].classList.toggle("marginBottomInput");
  for (let i = 0; i < radio.length; i++) {
    radio[i].classList.toggle("opaque");
    label[i].classList.toggle("opaque");
  }
});

button[1].addEventListener("click", function() {
  containerInputHospital.classList.toggle("containerHospital");
  for (let i = 7; i < 10; i++) {
    span[i].classList.toggle("spanTransparent");
    numericInput[i+2].classList.toggle("numericInputTransparent");
  }
});

container.addEventListener("click", function(elem) {
  if (radio.indexOf(elem.target) >= 0) {
    numericInput[0].placeholder = jobTitle[radio.indexOf(elem.target)];
    numericInput[0].classList.add("placeholderBlack");
    numericInput[1].value = rate[radio.indexOf(elem.target)];
  }
});

button[2].addEventListener("click", function() {
  containerInputDowntime.classList.toggle("containerDowntime");
  for (let i = 10; i < span.length; i++) {
    span[i].classList.toggle("spanTransparent");
    numericInput[i+3].classList.toggle("numericInputTransparent");
  }
});

button[3].addEventListener("click", function() {
  containerTable.classList.add("containerTableOpaque");

  hours = numericInput[2].value * 22;  // количество часов
  hours = Math.floor(hours*100) / 100;
  td[1].innerHTML = hours;

  salary = hours * numericInput[1].value;  // оклад
  salary = Math.floor(salary*100) / 100;
  td[3].innerHTML = salary;

  night = numericInput[2].value * 8 * numericInput[1].value / 5;
  night = Math.floor(night*100) / 100;  // ночные
  td[5].innerHTML = night;

  harmful = salary / 100 * 4;
  harmful = Math.floor(harmful*100) / 100;  // вредные
  td[7].innerHTML = harmful;

  overtime = numericInput[3].value * (numericInput[1].value / 2);  // переработка
  overtime = Math.floor(overtime*100) / 100;
  td[9].innerHTML = overtime;

  holidays = numericInput[4].value * numericInput[1].value;  // праздничны
  holidays = Math.floor(holidays*100) / 100;
  td[11].innerHTML = holidays;


  if(numericInput[10].value >= 8) {  // стаж
    experience = 1;
  }
  else if (numericInput[10].value >= 5) {
    experience = .8;
  }
  else {
    experience = .6;
  }

  averageEarnings = numericInput[9].value / 730;
  averageEarnings = Math.floor(averageEarnings*100) / 100;  // среднедневной доход

  laborSickLeave = averageEarnings * experience * numericInput[11].value
  laborSickLeave = Math.floor(laborSickLeave*100) / 100;  // больничный со стажем

  minimumSickLeave = 307008 / 730 * experience;
  minimumSickLeave = Math.floor(minimumSickLeave*100) / 100;  // минимальный больничный

  if (laborSickLeave > minimumSickLeave && numericInput[9].value != "" && numericInput[10].value != ""
    && numericInput[11].value != "") {
    medical = laborSickLeave;
    numericInput[8].value = medical;
  }
  else if (numericInput[9].value != "" && numericInput[10].value != "" && numericInput[11].value != "") {
    medical = minimumSickLeave;
    numericInput[8].value = medical;
  }

  nightSalary = +salary + +night;
  td[13].innerHTML = nightSalary;

  prize = nightSalary*(numericInput[5].value / 100);
  prize = Math.floor(prize*100) / 100;
  td[15].innerHTML = prize;

  ratio = (+prize + +nightSalary + +overtime + +harmful + +holidays) * 0.3;
  ratio = Math.round(ratio*100) / 100;  // районный коэффициент
  td[17].innerHTML = ratio;

  beforeTax = +prize + +nightSalary + +overtime + +harmful + +holidays + +ratio + +numericInput[8].value;
  beforeTax = Math.floor(beforeTax*100) / 100;  // до налого обложения по листу
  td[19].innerHTML = beforeTax;



  annualAverage = +numericInput[13].value / 240;  // средняя зарплата за год
  annualAverage = Math.floor(annualAverage*100) / 100;

  downtimeResult = annualAverage / 3 * 2 * +numericInput[14].value;
  downtimeResult = Math.ceil(downtimeResult*100) / 100;

  // downtimeResultTax = +downtimeResult / 100 * 13;
  // downtimeResultTax = Math.ceil(downtimeResultTax);

  if (+downtimeResult > 0) {
    numericInput[12].value = +downtimeResult;
    td[23].innerHTML = numericInput[12].value;
  }
  else if (+numericInput[12].value > 0) {
    downtimeResult = +numericInput[12].value;
    td[23].innerHTML = numericInput[12].value;
  }
  else {
    numericInput[12].value = "";
  }

  tax = (+beforeTax + +downtimeResult) / 100 * 13;
  tax = Math.ceil(tax);  // налог
  td[21].innerHTML = tax;

  beforeTax = +prize + +nightSalary + +overtime + +harmful + +holidays + +ratio;
  beforeTax = Math.floor(beforeTax*100) / 100;  // до налого обложения

  tax = (+beforeTax + +downtimeResult) / 100 * 13;
  tax = Math.round(tax);  // налог

  result = +beforeTax - +tax - +numericInput[6].value - +numericInput[7].value + +downtimeResult;
  result = Math.floor(result*100) / 100;

  if (numericInput[5].value === "" && numericInput[1].value != "" && numericInput[2].value != "") {
    end.innerHTML = `Укажите премию!`;
  }
  else if (numericInput[2].value != "" || numericInput[12].value != "") {
    end.innerHTML = `Долг предприятия на конец: ${result}`;
  }
  else if (numericInput[13].value != "" && numericInput[14].value != ""){
    end.innerHTML = `Долг предприятия на конец: ${downtimeResult}`;
  }
});
setTimeout(() => {
  numericInput.forEach(item => item.style.transitionDuration = ".5s");
  span.forEach(item => item.style.transitionDuration = ".5s");
  label.forEach(item => item.style.transitionDuration = ".5s");
  radio.forEach(item => item.style.transitionDuration = ".5s");
  containerInputHospital.style.transitionDuration = ".5s";
  containerInputDowntime.style.transitionDuration = ".5s";
  containerTable.style.transitionDuration = ".5s";
  container.style.transitionDuration = ".5s";
}, 1000);


window.addEventListener('load', async () => {
  if ('serviceWorker' in navigator) {
    try {
      const reg = await navigator.serviceWorker.register('sw.js')
      console.log('Service worker register success')
    } catch (e) {
      console.log('Service worker register fail')
    }
  }
})
