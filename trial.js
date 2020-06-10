let a = [{ a: 3 }, { b: 4 }];
let b = a.map((obj) => ({ ...obj }));
b[0].a = 9;
console.log(a, b);
