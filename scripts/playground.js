const obj = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
  ten: 10
}

function allnumbers(obj) {
  console.log(obj)
}

function second({three, obj}) {
  console.log(three);
  allnumbers(rest)
}

function first({one, two}) {
  console.log(one, two)
  console.log(obj)
  second(obj)
}

first(obj);
