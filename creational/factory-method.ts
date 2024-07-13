// Certainly! Let's consider a real-life example of a Factory Method pattern in the context of a document generation library.
// The library provides a way to generate different types of documents, such as PDFs and Word documents.
// The Factory Method pattern can be used to encapsulate the document creation process and allow clients
// to create documents without specifying their concrete classes.

// Abstract Product: Document
interface MyDocument {
  generate(): void;
}

// Concrete Product: PDF Document
class PDFDocument implements MyDocument {
  generate(): void {
    console.log("Generating PDF document...");
    // PDF generation logic
  }
}

// Concrete Product: Word Document
class WordDocument implements MyDocument {
  generate(): void {
    console.log("Generating Word document...");
    // Word document generation logic
  }
}

// Abstract Creator: DocumentCreator
abstract class DocumentCreator {
  // Factory Method
  abstract createDocument(): MyDocument;

  // Some common document generation logic
  public generateDocument(): void {
    const document = this.createDocument();
    console.log("Common document generation steps...");
    document.generate();
  }
}

// Concrete Creator: PDFDocumentCreator
class PDFDocumentCreator extends DocumentCreator {
  createDocument(): MyDocument {
    return new PDFDocument();
  }
}

// Concrete Creator: WordDocumentCreator
class WordDocumentCreator extends DocumentCreator {
  createDocument(): MyDocument {
    return new WordDocument();
  }
}

// Example Usage
const pdfCreator = new PDFDocumentCreator();
pdfCreator.generateDocument();

const wordCreator = new WordDocumentCreator();
wordCreator.generateDocument();
