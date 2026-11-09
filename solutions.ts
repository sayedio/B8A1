const multiplyValue = (value: number, multiplier?: number): number => {
  if (multiplier || multiplier === 0) {
    return value * multiplier;
  } else {
    return value * 2;
  }
};

const processInput = (value: string | number | boolean) => {
  if (typeof value === "string") {
    return value.trim();
  } else if (typeof value === "number") {
    return value * 10;
  } else {
    return value === true ? "Active" : "Inactive";
  }
};

const formatCoordinate = ([latitude, longitude, locationName]: readonly [
  number,
  number,
  string,
]) => {
  return `Location: ${locationName} (${latitude}, ${longitude})`;
};

const concatenateArrays = <T>(...arrays: T[][]): T[] => {
  const combinedArr: T[] = [];

  for (let array of arrays) {
    combinedArr.push(...array);
  }
  return combinedArr;
};

interface Course {
  title: string;
  students: number;
  isPublished: boolean;
}

const getPopularCourses = (
  courses: Course[],
  minStudents: number,
): Course[] => {
  const publishedCourses: Course[] = [];

  for (let course of courses) {
    if (course.isPublished && course.students >= minStudents) {
      publishedCourses.push(course);
    }
  }
  return publishedCourses;
};

const pluckValues = <T, K extends keyof T>(items: T[], key: K): T[K][] => {
  const pluckedValues: T[K][] = [];

  for (let item of items) {
    pluckedValues.push(item[key]);
  }

  return pluckedValues;
};

class Employee {
  protected name: string;
  private baseSalary: number;
  constructor(name: string, baseSalary: number) {
    this.name = name;
    this.baseSalary = baseSalary;
  }

  getDetails(): string {
    return `Employee: ${this.name}, Base Salary: ${this.baseSalary}`;
  }
}

class Manager extends Employee {
  private department: string;
  constructor(name: string, baseSalary: number, department: string) {
    super(name, baseSalary);
    this.department = department;
  }

  getRoleInfo(): string {
    return `Manager of ${this.department}: ${this.name}`;
  }
}

const validateAgeAsync = async (age: number): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    if (age >= 18) {
      setTimeout(() => {
        resolve("Access Granted");
      }, 1000);
    } else {
      reject(new Error("Access Denied: Must be 18 or older"));
    }
  });
};
