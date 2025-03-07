export const getLanguageNameFromId = (id: number): string => {
  const languageMap: { [key: number]: string } = {
    0: "Python",
    1: "JavaScript",
    2: "C++",
    3: "Kotlin",
    4: "C",
    5: "Java",
    6: "C#",
    7: "Ruby",
  };
  return languageMap[id] || "Unknown";
};
