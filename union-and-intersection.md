# TypeScript Union (`|`) and Intersection (`&`) Operators

There are two very important and helpful operators for assigning types.
They are `|` and `&`.

We can call `|` the **Union operator** and `&` the **Intersection
operator**.

## 1. Union Operator (`|`)

With a Union, we can assign a type from multiple specific values, but we
cannot assign a value outside those defined types.

For example:

```ts
type DogFood = "meat" | "chicken";

const food: DogFood = "meat"; // This is correct.

const food: DogFood = "fish"; // This is wrong because "fish" is not included in DogFood.
```

Here, the `DogFood` type only accepts `"meat"` or `"chicken"`. We cannot
assign any other value.

## 2. Intersection Operator (`&`)

With an Intersection, we can combine the types of other types easily.

For example:

```ts
type Animal = {
  name: string;
  species: string;
};

type Cat = Animal & {
  meow: () => void;
};

const cat: Cat = {
  name: "Leo",
  species: "Persian",
  meow() {
    console.log("The cat is talking");
  },
};
```

Here, the `Cat` type inherits the properties of the `Animal` type.
That's why all the required properties of `Animal` must be assigned,
except for any optional properties.

## 3. Combining Union and Intersection Operators

Now, let's combine these Intersection and Union operators.

```ts
type Animal = {
  name: string;
  species: string;
};

type DogFood = "meat" | "chicken";
type CatFood = "milk" | "fish";

type Cat = Animal & {
  meow: () => void;
  catFood: CatFood;
};

type Dog = Animal & {
  bark: () => void;
  dogFood: DogFood;
};

const cat: Cat = {
  name: "Leo",
  species: "Persian",
  meow() {
    console.log("The cat is talking");
  },
  catFood: "milk",
};

const dog: Dog = {
  name: "Tiger",
  species: "German Shepherd",
  bark() {
    console.log("The dog is talking");
  },
  dogFood: "chicken",
};
```

Here, we use `DogFood` and `CatFood` as Union types, and we use
Intersection to combine each type with `Animal`. This is because both
cats and dogs are animals, so they both have a `name` and a `species`.

That's how we can use real-life examples to understand Union and
Intersection operators in TypeScript.
