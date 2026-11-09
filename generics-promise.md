# TypeScript Generics

## 1. The Problem: Union Types with Multiple Arguments

There are two very important and helpful operators for assigning types. They are `|` and `&`.

We can call `|` the **Union operator** and `&` the **Intersection operator**.

For example, we can use Union types to accept multiple types in a function.

```ts
const wrapArr = (...value: (string | number)[]): (string | number)[] => {
  return [...value];
};

const numArr = wrapArr(1, 2, 3, 4);
const stringArr = wrapArr("a", "b", "c");
```

But what if we want an array of booleans?

Okay, we can simply add an array of booleans to the parameter type of the `wrapArr` function.

But what if, in the future, we need an array of objects?

There are thousands of possible combinations, so we need a better solution.

To solve this problem, we use **Generics**.

## 2. Generics in Functions

We can use generics to make a function reusable with different types of data.

```ts
const wrapArrNew = <T>(...value: T[]): T[] => {
  return [...value];
};

const numArr2 = wrapArrNew(1, 2, 3, 4);
const stringArr2 = wrapArrNew("a", "b", "c");
const booleanArr2 = wrapArrNew(true, false, true);

const objectArr2 = wrapArrNew(
  { name: "sayed", age: 18 },
  { name: "sami", age: 20 },
  { name: "nusrat", age: 22 },
);
```

So here, it actually automatically identifies the types of the arguments.

For example:

```ts
const numArr2 = wrapArrNew<number>(1, 2, 3, 4);
```

Like this, but we don't have to write `<number>` after `wrapArrNew`. TypeScript automatically identifies the argument types.

This process is called **Type Inference**.

## 3. Generics in Interfaces

Generics also work in interfaces.

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}
```

Here, for `data`, we can define any type of data. It can be an object, an array of objects, or even a Promise.

We can use `Promise` as a type for data fetching as well.

As we know, the type of data we receive is not fixed because the data can vary. So, generics help developers define types according to the requirements.

## 4. A Real-World Example of Generics

A real-world example is given below.

First, we have to define the types of data that we get from the fetch request.

The `fetch()` function always returns a Promise of Response.

```ts
interface BlogData {
  id: string;
  blogs: string[];
}

interface UserData {
  id: string;
  users: string[];
}
```

Now, let's create a reusable function using generics.

```ts
interface ApiResponse<T> {
  data: T;
  success: boolean;
  message: string;
}

const getData = async <T>(url: string): Promise<T | undefined> => {
  try {
    const res = await fetch(url);
    // If we use await, it will return a Response.
    // This is the default behavior of the fetch() function.

    const data = (await res.json()) as ApiResponse<T>;

    if (!res.ok || !data.success) {
      throw new Error("There is a problem while fetching");
    }

    return data.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      console.error(error.message);
    } else {
      console.error("There is a problem while fetching");
    }

    return undefined;
  }
};
```

Now, let's call the function.

```ts
(async function () {
  const blogData = await getData<BlogData>(`/api/v1/blogs`);
  console.log(blogData?.blogs);

  const userData = await getData<UserData>(`/api/v1/users`);
  console.log(userData?.users);
})();
```

## 5. How Does It Work?

So that's how we can get the proper data we expect from a `Promise<Response>`.

This is how generics solve developers' problems. We can easily define and validate types and get our expected data according to our needs.

Also, with generics (`T`), we can use a single function to get data of different types.

Whichever datatype we provide as `T` when calling the function, it returns data typed according to that type. We can also get proper suggestions from TypeScript through IntelliSense.

That's how generics help developers catch type-related errors during development.

Also, `as ApiResponse<T>` is a type assertion, not runtime validation.
