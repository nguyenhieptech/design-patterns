from abc import ABC, abstractmethod


# Adaptee: CSV Reader
class CSVReader:
    def read_csv_file(self, file_name: str) -> list[str]:
        # Simulated CSV reading logic
        print(f"Reading data from CSV file: {file_name}")
        return ["data1", "data2", "data3"]


# Adaptee: JSON Reader
class JSONReader:
    def read_json_file(self, file_name: str) -> str:
        # Simulated JSON reading logic
        print(f"Reading data from JSON file: {file_name}")
        return '{"key1": "value1", "key2": "value2"}'


# Target: File Reader Interface
class DataReader(ABC):
    @abstractmethod
    def read_file(self, file_name: str) -> str | list[str]:
        pass


# Adapter for CSVReader
class CSVFileAdapter(DataReader):
    def __init__(self, csv_reader: CSVReader):
        self.csv_reader = csv_reader

    def read_file(self, file_name: str) -> list[str]:
        # Adapt CSVReader's interface to FileReader's interface
        return self.csv_reader.read_csv_file(file_name)


# Adapter for JSONReader
class JSONFileAdapter(DataReader):
    def __init__(self, json_reader: JSONReader):
        self.json_reader = json_reader

    def read_file(self, file_name: str) -> str:
        # Adapt JSONReader's interface to FileReader's interface
        return self.json_reader.read_json_file(file_name)


# Client
class DataProcessor:
    def __init__(self, file_reader: DataReader):
        self.file_reader = file_reader

    def process_file(self, file_name: str) -> None:
        data = self.file_reader.read_file(file_name)
        print("Processing data:", data)


# Example Usage
csv_reader = CSVReader()
csv_adapter = CSVFileAdapter(csv_reader)

json_reader = JSONReader()
json_adapter = JSONFileAdapter(json_reader)

processor1 = DataProcessor(csv_adapter)
processor1.process_file("data.csv")

processor2 = DataProcessor(json_adapter)
processor2.process_file("data.json")
