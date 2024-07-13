# Product: SQL Query
class SQLQuery:
    def __init__(self):
        self.query = ""

    def add_select(self, fields: list[str]) -> None:
        self.query += f"SELECT {', '.join(fields)} "

    def add_from(self, table: str) -> None:
        self.query += f"FROM {table} "

    def add_where(self, condition: str) -> None:
        self.query += f"WHERE {condition} "

    def add_order_by(self, field: str, order: str) -> None:
        self.query += f"ORDER BY {field} {order} "

    def get_query(self) -> str:
        return self.query.strip() + ";"


# Builder Interface
from abc import ABC, abstractmethod


class SQLQueryBuilder(ABC):
    @abstractmethod
    def select(self, fields: list[str]) -> None:
        pass

    @abstractmethod
    def from_table(self, table: str) -> None:
        pass

    @abstractmethod
    def where(self, condition: str) -> None:
        pass

    @abstractmethod
    def order_by(self, field: str, order: str) -> None:
        pass

    @abstractmethod
    def get_query(self) -> str:
        pass


# Concrete Builder: SQLQueryBuilderImplementation
class SQLQueryBuilderImplementation(SQLQueryBuilder):
    def __init__(self):
        self.query = SQLQuery()

    def select(self, fields: list[str]) -> None:
        self.query.add_select(fields)

    def from_table(self, table: str) -> None:
        self.query.add_from(table)

    def where(self, condition: str) -> None:
        self.query.add_where(condition)

    def order_by(self, field: str, order: str) -> None:
        self.query.add_order_by(field, order)

    def get_query(self) -> str:
        return self.query.get_query()


# Director: QueryDirector
class QueryDirector:
    def __init__(self, builder: SQLQueryBuilder) -> None:
        self.builder = builder

    def build_complex_query(self) -> str:
        self.builder.select(["id", "name"])
        self.builder.from_table("users")
        self.builder.where("age > 18")
        self.builder.order_by("name", "ASC")
        return self.builder.get_query()


# Example usage
builder = SQLQueryBuilderImplementation()
director = QueryDirector(builder)

complex_query = director.build_complex_query()
print("Complex SQL Query:", complex_query)
