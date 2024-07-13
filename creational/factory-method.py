from abc import ABC, abstractmethod


# Abstract Product: Document
class MyDocument(ABC):
    @abstractmethod
    def generate(self) -> None:
        pass


# Concrete Product: PDF Document
class PDFDocument(MyDocument):
    def generate(self) -> None:
        print("Generating PDF document...")
        # PDF generation logic


# Concrete Product: Word Document
class WordDocument(MyDocument):
    def generate(self) -> None:
        print("Generating Word document...")
        # Word document generation logic


# Abstract Creator: DocumentCreator
class DocumentCreator(ABC):
    # Factory Method
    @abstractmethod
    def create_document(self) -> MyDocument:
        pass

    # Some common document generation logic
    def generate_document(self) -> None:
        document = self.create_document()
        print("Common document generation steps...")
        document.generate()


# Concrete Creator: PDFDocumentCreator
class PDFDocumentCreator(DocumentCreator):
    def create_document(self) -> MyDocument:
        return PDFDocument()


# Concrete Creator: WordDocumentCreator
class WordDocumentCreator(DocumentCreator):
    def create_document(self) -> MyDocument:
        return WordDocument()


# Example Usage
pdf_creator = PDFDocumentCreator()
pdf_creator.generate_document()

word_creator = WordDocumentCreator()
word_creator.generate_document()
