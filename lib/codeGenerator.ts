const dynamicTypeMappings = {
  python: {
    int: "int",
    string: "str",
    bool: "bool",
    float: "float",
    double: "float",
    char: "str",
    Array: "List",
    HashMap: "dict",
    LinkedList: "LinkedList",
    Tuple: "Tuple",
  },
  javascript: {
    int: "number",
    string: "string",
    bool: "boolean",
    float: "number",
    double: "number",
    char: "string",
    Array: "Array",
    HashMap: "Record",
    LinkedList: "LinkedList",
    Tuple: "[ ]",
  },
  java: {
    int: "int",
    string: "String",
    bool: "boolean",
    float: "float",
    double: "double",
    char: "char",
    Array: "List",
    HashMap: "Map",
    LinkedList: "LinkedList",
    Tuple: "Tuple",
  },
} as const;

type Language = keyof typeof dynamicTypeMappings;

function convertType(type: string, lang: Language): string {
  if (!type) return "void";
  if (
    dynamicTypeMappings[lang]?.[
      type as keyof (typeof dynamicTypeMappings)[typeof lang]
    ]
  ) {
    return dynamicTypeMappings[lang][
      type as keyof (typeof dynamicTypeMappings)[typeof lang]
    ];
  }

  const genericMatch = type.match(/(\w+)\[(.*)\]/);
  if (genericMatch) {
    const genericType = genericMatch[1];
    const innerTypes = genericMatch[2]
      .split(",")
      .map((t) => convertType(t.trim(), lang))
      .join(", ");

    if (
      dynamicTypeMappings[lang]?.[
        genericType as keyof (typeof dynamicTypeMappings)[typeof lang]
      ]
    ) {
      return `${dynamicTypeMappings[lang][genericType as keyof (typeof dynamicTypeMappings)[typeof lang]]}<${innerTypes}>`;
    }
  }
  return type;
}

export function generateCode(parsedDSL: any) {
  if (!parsedDSL) return {};

  const { name, params, returnType } = parsedDSL;
  const paramStr = params
    .map((p: any) => `${p.name}: ${convertType(p.type, "python")}`)
    .join(", ");

  return {
    python: `def ${name}(${paramStr}) -> ${convertType(returnType, "python")}:\n    # TODO: Implement function\n    pass`,
    javascript: `function ${name}(${paramStr}) {\n    // TODO: Implement function\n}`,
    java: `public static ${convertType(returnType, "java")} ${name}(${paramStr}) {\n    // TODO: Implement function\n}`,
  };
}
