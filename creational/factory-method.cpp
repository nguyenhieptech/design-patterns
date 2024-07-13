#include <iostream>

// Abstract Product: Document
class MyDocument
{
public:
  virtual ~MyDocument() {}
  virtual void generate() = 0;
};

// Concrete Product: PDF Document
class PDFDocument : public MyDocument
{
public:
  void generate() override
  {
    std::cout << "Generating PDF document..." << std::endl;
    // PDF generation logic
  }
};

// Concrete Product: Word Document
class WordDocument : public MyDocument
{
public:
  void generate() override
  {
    std::cout << "Generating Word document..." << std::endl;
    // Word document generation logic
  }
};

// Abstract Creator: DocumentCreator
class DocumentCreator
{
public:
  virtual ~DocumentCreator() {}
  // Factory Method
  virtual MyDocument *create_document() = 0;

  // Some common document generation logic
  void generate_document()
  {
    MyDocument *document = create_document();
    std::cout << "Common document generation steps..." << std::endl;
    document->generate();
    delete document;
  }
};

// Concrete Creator: PDFDocumentCreator
class PDFDocumentCreator : public DocumentCreator
{
public:
  MyDocument *create_document() override
  {
    return new PDFDocument();
  }
};

// Concrete Creator: WordDocumentCreator
class WordDocumentCreator : public DocumentCreator
{
public:
  MyDocument *create_document() override
  {
    return new WordDocument();
  }
};

// Example Usage
int main()
{
  PDFDocumentCreator pdf_creator;
  pdf_creator.generate_document();

  WordDocumentCreator word_creator;
  word_creator.generate_document();

  return 0;
}
