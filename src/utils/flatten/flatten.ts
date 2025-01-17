type NestedObject = Record<string, any>;

function flatten<T extends NestedObject>(
  obj: T,
  prefix = ""
): Record<string, any> {
  const result: Record<string, any> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      const value = obj[key];
      const newKey = prefix ? `${prefix}.${key}` : key;

      if (
        typeof value === "object" &&
        value !== null &&
        !Array.isArray(value)
      ) {
        Object.assign(result, flatten(value, newKey));
      } else {
        result[newKey] = value;
      }
    }
  }

  return result;
}

export default flatten;
