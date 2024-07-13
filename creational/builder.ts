// Sure! Let's consider a real-life example of a Builder pattern in the context of a library for constructing complex SQL queries.
// The Builder pattern can be useful here to create SQL queries with varying conditions and clauses in a fluent and expressive way.

// In this example:
// The SQLQuery class represents the product being built, which is the SQL query itself.
// It has methods to add different clauses like SELECT, FROM, WHERE, and ORDER BY.
// The SQLQueryBuilder interface declares methods to build different parts of the SQL query.
// The SQLQueryBuilderImplementation class is a concrete builder that implements the SQLQueryBuilder interface.
// It constructs the SQL query using the methods provided by the interface.
// The QueryDirector class constructs the complex SQL query using the builder.
// It specifies the steps to build the query in a particular sequence.
// Finally, in the example usage, we create an instance of the builder, pass it to the director,
// and then build a complex SQL query using the director.
// This way, the Builder pattern allows us to construct complex objects step by step,
// hiding the implementation details of the construction process from the client.
// It also enables the creation of different variations of objects using the same building process.

// Product: SQL Query
class SQLQuery {
  private query: string;

  constructor() {
    this.query = "";
  }

  addSelect(fields: string[]): void {
    this.query += `SELECT ${fields.join(", ")} `;
  }

  addFrom(table: string): void {
    this.query += `FROM ${table} `;
  }

  addWhere(condition: string): void {
    this.query += `WHERE ${condition} `;
  }

  addOrderBy(field: string, order: string): void {
    this.query += `ORDER BY ${field} ${order} `;
  }

  getQuery(): string {
    return this.query.trim() + ";";
  }
}

// Builder Interface
interface SQLQueryBuilder {
  select(fields: string[]): void;
  from(table: string): void;
  where(condition: string): void;
  orderBy(field: string, order: string): void;
  getQuery(): string;
}

// Concrete Builder: SQLQueryBuilderImplementation
class SQLQueryBuilderImplementation implements SQLQueryBuilder {
  private query: SQLQuery;

  constructor() {
    this.query = new SQLQuery();
  }

  select(fields: string[]): void {
    this.query.addSelect(fields);
  }

  from(table: string): void {
    this.query.addFrom(table);
  }

  where(condition: string): void {
    this.query.addWhere(condition);
  }

  orderBy(field: string, order: string): void {
    this.query.addOrderBy(field, order);
  }

  getQuery(): string {
    return this.query.getQuery();
  }
}

// Director: QueryDirector
class QueryDirector {
  constructor(private readonly builder: SQLQueryBuilder) {}

  buildComplexQuery(): string {
    this.builder.select(["id", "name"]);
    this.builder.from("users");
    this.builder.where("age > 18");
    this.builder.orderBy("name", "ASC");
    return this.builder.getQuery();
  }
}

// Example usage
const builder = new SQLQueryBuilderImplementation();
const director = new QueryDirector(builder);

const complexQuery = director.buildComplexQuery();
console.log("Complex SQL Query:", complexQuery);
