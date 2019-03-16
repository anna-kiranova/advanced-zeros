// функция проверки на простое число
function isSimple(n) {
  for (let k = 2, sqrt = Math.sqrt(n); k <= sqrt; k++) {
    if (n % k === 0) {
      return false;
    }
  }
  return true;
}

// функция поиска простых множителей числа
function getSimpleMultipliers(base) {
  // массив для простых множителей
  let simpleMultipliers = [];
  // необходимо разложить базу на простые множители
  for (let i = 2; i <= base / 2; i++) {
    while (base % i === 0) {
      // множитель найден
      // проверим, что он простой
      if (isSimple(i)) {
        simpleMultipliers.push(i);
        base = base / i;
      }
    }
  }
  if (base > 1) {
    simpleMultipliers.push(base);
  }
  return simpleMultipliers;
}

module.exports = function getZerosCount(number, base) {
  // находим простые множители (с дубликатами)
  let mults = getSimpleMultipliers(base);
  let counts = {};
  for (let value of mults) {
    if (counts[value]) {
      // для этого множителя уже рассчитали количество вхождений
      continue;
    }
    // найдем количество вхождений всех степеней каждого множителя value в number
    let count = 0;
    let i = 1;
    let num;
    do {
      num = Math.floor(number / Math.pow(value, i));
      count += num;
      i++;
    }
    while (num > 1);
    counts[value] = count;
  }

  // количество вхождений каждого уникального множителя / на количество повторов этого множителя
  let results = [];
  for (let value in counts) {
    let countValue = mults.filter(i => i === +value).length;
    results.push(Math.floor(counts[value] / countValue));
  }
  
  // выбираем минимальный из рассчитанных
  return Math.min(...results);
}
