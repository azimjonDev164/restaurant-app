function a(num, depth = 0) {
  if (depth >= 5) return num; // stop after 5 cycles

  num = Math.pow(num, 2);
  let numst = num.toString();
  let arr = numst.split("");

  if (numst.length == 8) {
    arr.shift();
    arr.shift();
    arr.pop();
    arr.pop();
    num = Number(arr.join(""));
    console.log(num);
  } else if (numst.length < 8) {
    arr.reverse();
    let n = Math.abs(numst.length - 8);
    for (let i = 0; i < n; i++) {
      arr.push(0);
    }
    arr.reverse();
    arr.shift();
    arr.shift();
    arr.pop();
    arr.pop();
    num = Number(arr.join(""));
    console.log(num);
  }

  return a(num, depth + 1);
}

for (let i = 0; i < 4; i++) {
  console.log(a(1994));
}
