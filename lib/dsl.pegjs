start
  = "FUNC" _ name:[a-zA-Z_]+ _ "(" _ params:_paramList? _ ")" _ "->" _ returnType:type

_paramList
  = first:_param rest:("," _ _param)* { return [first].concat(rest.map(r => r[2])); }

_param
  = name:[a-zA-Z_]+ _ ":" _ type { return { name, type }; }

type
  = baseType / complexType

baseType
  = "int" / "string" / "bool" / "float" / "double" / "char"

complexType
  = identifier ("[" type ("," type)* "]")? { return text(); }

identifier
  = [a-zA-Z_]+
  
_ "whitespace"
  = [ \t\n\r]*
