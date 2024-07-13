// Certainly! Let's consider a real-life example of an Adapter pattern in a library for file processing.
// Imagine you have a library that can read data from different types of files, such as CSV files and JSON files.
// However, each file type may have its own unique interface for reading data.
// You want to provide a unified interface to your library users, regardless of the file type.

// In this example:
// CSVReader and JSONReader are the existing classes representing different types of file readers with their specific interfaces.
// FileReader is the target interface that the client expects.
// CSVFileAdapter and JSONFileAdapter are adapters that implement the FileReader interface
// and internally use the respective concrete readers to fulfill the request.
// DataProcessor is the client class that accepts any object implementing the FileReader interface.
// The client doesn't need to know the specifics of each file reader;
// it interacts only with the FileReader interface, thanks to the Adapter pattern.
// This pattern allows the client code to be decoupled from the specifics of different file formats,
// promoting flexibility and easier maintenance.

// Adaptee: CSV Reader
class CSVReader {
  readCSVFile(fileName: string): string[] {
    // Simulated CSV reading logic
    console.log(`Reading data from CSV file: ${fileName}`);
    return ['data1', 'data2', 'data3'];
  }
}

// Adaptee: JSON Reader
class JSONReader {
  readJSONFile(fileName: string): string {
    // Simulated JSON reading logic
    console.log(`Reading data from JSON file: ${fileName}`);
    return '{"key1": "value1", "key2": "value2"}';
  }
}

// Target: File Reader Interface
interface DataReader {
  readFile(fileName: string): string | string[];
}

// Adapter for CSVReader
class CSVFileAdapter implements DataReader {
  private csvReader: CSVReader;

  constructor(csvReader: CSVReader) {
    this.csvReader = csvReader;
  }

  readFile(fileName: string): string[] {
    // Adapt CSVReader's interface to FileReader's interface
    return this.csvReader.readCSVFile(fileName);
  }
}

// Adapter for JSONReader
class JSONFileAdapter implements DataReader {
  private jsonReader: JSONReader;

  constructor(jsonReader: JSONReader) {
    this.jsonReader = jsonReader;
  }

  readFile(fileName: string): string {
    // Adapt JSONReader's interface to FileReader's interface
    return this.jsonReader.readJSONFile(fileName);
  }
}

// Client
class DataProcessor {
  constructor(private fileReader: DataReader) {}

  processFile(fileName: string): void {
    const data = this.fileReader.readFile(fileName);
    console.log('Processing data:', data);
  }
}

// Example Usage
const csvReader = new CSVReader();
const csvAdapter = new CSVFileAdapter(csvReader);

const jsonReader = new JSONReader();
const jsonAdapter = new JSONFileAdapter(jsonReader);

const processor1 = new DataProcessor(csvAdapter);
processor1.processFile('data.csv');

const processor2 = new DataProcessor(jsonAdapter);
processor2.processFile('data.json');
