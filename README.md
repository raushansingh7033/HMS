# 📘 TypeScript Notes for Interview Preparation

## 📌 What is TypeScript?

TypeScript is a superset of JavaScript that adds:

* Static Typing
* Interfaces
* Classes
* Compile-time Error Checking
* Modern ES Features

TypeScript code is compiled into JavaScript using:

```bash
tsc filename.ts
```

---

## 🚀 Why Use TypeScript?

| JavaScript        | TypeScript          |
| ----------------- | ------------------- |
| Dynamically Typed | Statically Typed    |
| Runtime Errors    | Compile-time Errors |
| Hard to Debug     | Easy to Debug       |
| No Interfaces     | Supports Interfaces |

✔ Large Scale Applications
✔ Code Maintainability
✔ Better IntelliSense
✔ Refactoring

---

## 🔹 Basic Types

```ts
let id: number = 101;
let name: string = "Raushan";
let isActive: boolean = true;
let data: any = 10;
let list: number[] = [1,2,3];
let tuple: [number, string] = [1,"Hello"];
```

---

## 🔹 Special Types

### Any

```ts
let value: any = 10;
value = "Hello";
```

### Unknown

```ts
let userInput: unknown;
```

### Void

```ts
function greet(): void {
   console.log("Hello");
}
```

### Never

```ts
function error(): never {
   throw new Error("Error");
}
```

---

## 🔹 Type Inference

```ts
let num = 100; // inferred as number
```

---

## 🔹 Functions

```ts
function add(a:number, b:number): number {
   return a+b;
}
```

### Optional Parameter

```ts
function show(name:string, age?:number){}
```

### Default Parameter

```ts
function greet(name:string="Guest"){}
```

---

## 🔹 Interfaces

```ts
interface Employee {
   id:number;
   name:string;
}

let emp:Employee = {
   id:1,
   name:"John"
}
```

---

## 🔹 Type Alias

```ts
type User = {
   id:number;
   name:string;
}
```

---

## 🔹 Union & Intersection Types

### Union (|)

```ts
let id: number | string;
```

### Intersection (&)

```ts
type Admin = User & {
   role:string;
}
```

---

## 🔹 Enums

```ts
enum Role {
   Admin,
   User,
   Guest
}
```

---

## 🔹 Classes

```ts
class Person {
   name:string;

   constructor(name:string){
      this.name=name;
   }
}
```

### Access Modifiers

* public
* private
* protected
* readonly

---

## ⭐ Generics (Very Important)

```ts
function getData<T>(value:T):T {
   return value;
}
```

---

## 🔹 Modules

### Export

```ts
export class Test{}
```

### Import

```ts
import {Test} from './test';
```

---

## 🔹 Type Assertions

```ts
let value:any="Hello";
let length:number=(value as string).length;
```

---

## 🔹 Decorators

```ts
function Log(target:any){}
```

---

## 🔹 Interface vs Type

| Interface                 | Type              |
| ------------------------- | ----------------- |
| Used for Object Structure | Used for anything |
| Extendable                | Flexible          |
| Less Complex              | More Powerful     |

---

## 🔹 tsconfig.json

```json
{
 "target": "ES6",
 "module": "commonjs",
 "strict": true,
 "outDir": "./dist"
}
```

---

## 📌 Most Asked Interview Topics

✔ Interfaces
✔ Generics
✔ Union Types
✔ Enums
✔ Type vs Interface
✔ Any vs Unknown
✔ Access Modifiers
✔ Type Inference
✔ Modules
✔ Decorators
✔ tsconfig.json

---
