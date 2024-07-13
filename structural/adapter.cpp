#include <iostream>
#include <string>
#include <vector>
#include <variant>
#include <memory>

// Adaptee: CSV Reader
class CSVReader
{
public:
  std::vector<std::string> readCSVFile(const std::string &fileName)
  {
    // Simulated CSV reading logic
    std::cout << "Reading data from CSV file: " << fileName << std::endl;
    return {"data1", "data2", "data3"};
  }
};

// Adaptee: JSON Reader
class JSONReader
{
public:
  std::string readJSONFile(const std::string &fileName)
  {
    // Simulated JSON reading logic
    std::cout << "Reading data from JSON file: " << fileName << std::endl;
    return R"({"key1": "value1", "key2": "value2"})";
  }
};

// Target: File Reader Interface
class DataReader
{
public:
  virtual ~DataReader() {}
  virtual std::variant<std::string, std::vector<std::string>> readFile(const std::string &fileName) = 0;
};

// Adapter for CSVReader
class CSVFileAdapter : public DataReader
{
private:
  CSVReader csvReader;

public:
  std::variant<std::string, std::vector<std::string>> readFile(const std::string &fileName) override
  {
    // Adapt CSVReader's interface to FileReader's interface
    return csvReader.readCSVFile(fileName);
  }
};

// Adapter for JSONReader
class JSONFileAdapter : public DataReader
{
private:
  JSONReader jsonReader;

public:
  std::variant<std::string, std::vector<std::string>> readFile(const std::string &fileName) override
  {
    // Adapt JSONReader's interface to FileReader's interface
    return jsonReader.readJSONFile(fileName);
  }
};

// Client
class DataProcessor
{
private:
  std::unique_ptr<DataReader> fileReader;

public:
  DataProcessor(std::unique_ptr<DataReader> reader) : fileReader(std::move(reader)) {}

  void processFile(const std::string &fileName)
  {
    auto data = fileReader->readFile(fileName);
    std::cout << "Processing data: ";
    if (std::holds_alternative<std::vector<std::string>>(data))
    {
      auto vecData = std::get<std::vector<std::string>>(data);
      for (const auto &str : vecData)
      {
        std::cout << str << " ";
      }
    }
    else if (std::holds_alternative<std::string>(data))
    {
      std::cout << std::get<std::string>(data);
    }
    std::cout << std::endl;
  }
};

// Example Usage
int main()
{
  auto csvAdapter = std::make_unique<CSVFileAdapter>();
  auto jsonAdapter = std::make_unique<JSONFileAdapter>();

  DataProcessor processor1(std::move(csvAdapter));
  processor1.processFile("data.csv");

  DataProcessor processor2(std::move(jsonAdapter));
  processor2.processFile("data.json");

  return 0;
}
