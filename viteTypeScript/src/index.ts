let age: number = 20;
let course: string = "TypeScript";
let isPublished: boolean = true;
let numbers: number[] = [1, 2, 3];
//Tuple
let user: [number, string] = [1, "Jean"];
//Enum
enum Size {
  Small = 1,
  Medium,
  Large,
}
let mySize: Size = Size.Large;

function render(document: any) {
  console.log(document);
}

function calcTax(income: number) {
  return 0;
}

//Object

type Employee = {
  readonly id: number;
  name: string;
  retire: (date: Date) => void;
};
let employee: Employee = {
  id: 1,
  name: "Kyle",
  retire: (date: Date) => {
    console.log(date);
  },
};
