#include <iostream>
#include <vector>
#include <string>

// Product: SQL Query
class SQLQuery
{
private:
  std::string query;

public:
  SQLQuery()
  {
    query = "";
  }

  void addSelect(const std::vector<std::string> &fields)
  {
    query += "SELECT ";
    for (size_t i = 0; i < fields.size(); ++i)
    {
      query += fields[i];
      if (i < fields.size() - 1)
      {
        query += ", ";
      }
    }
    query += " ";
  }

  void addFrom(const std::string &table)
  {
    query += "FROM " + table + " ";
  }

  void addWhere(const std::string &condition)
  {
    query += "WHERE " + condition + " ";
  }

  void addOrderBy(const std::string &field, const std::string &order)
  {
    query += "ORDER BY " + field + " " + order + " ";
  }

  std::string getQuery() const
  {
    return query + ";";
  }
};

// Builder Interface
class SQLQueryBuilder
{
public:
  virtual ~SQLQueryBuilder() {}
  virtual void select(const std::vector<std::string> &fields) = 0;
  virtual void from(const std::string &table) = 0;
  virtual void where(const std::string &condition) = 0;
  virtual void orderBy(const std::string &field, const std::string &order) = 0;
  virtual std::string getQuery() = 0;
};

// Concrete Builder: SQLQueryBuilderImplementation
class SQLQueryBuilderImplementation : public SQLQueryBuilder
{
private:
  SQLQuery query;

public:
  void select(const std::vector<std::string> &fields) override
  {
    query.addSelect(fields);
  }

  void from(const std::string &table) override
  {
    query.addFrom(table);
  }

  void where(const std::string &condition) override
  {
    query.addWhere(condition);
  }

  void orderBy(const std::string &field, const std::string &order) override
  {
    query.addOrderBy(field, order);
  }

  std::string getQuery() override
  {
    return query.getQuery();
  }
};

// Director: QueryDirector
class QueryDirector
{
private:
  SQLQueryBuilder *builder;

public:
  QueryDirector(SQLQueryBuilder *builder) : builder(builder) {}

  std::string buildComplexQuery()
  {
    builder->select({"id", "name"});
    builder->from("users");
    builder->where("age > 18");
    builder->orderBy("name", "ASC");
    return builder->getQuery();
  }
};

// Example usage
int main()
{
  SQLQueryBuilderImplementation builder;
  QueryDirector director(&builder);

  std::string complexQuery = director.buildComplexQuery();
  std::cout << "Complex SQL Query: " << complexQuery << std::endl;

  return 0;
}
