export const createQueryString = (name: string, value: string) => {
  const params = new URLSearchParams(window?.location?.search);
  value ? params.set(name, value) : params.delete(name);
  return "?" + params.toString();
};

export const generateQueryString = (
  paramsObject: Record<string, string | null>,
) => {
  const params = new URLSearchParams(window?.location?.search);
  Object.keys(paramsObject).forEach((key) => {
    const value = paramsObject[key];
    value ? params.set(key, value) : params.delete(key);
  });
  return "?" + params.toString();
};
