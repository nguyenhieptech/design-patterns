// Configuration class
class ConfigurationManager {
  private static instance: ConfigurationManager;
  private settings: { [key: string]: any };

  private constructor() {
    // Simulate loading settings from a file or remote server
    this.settings = {
      server_url: "https://example.com",
      timeout: 5000,
      max_retries: 3,
    };
  }

  public static getInstance(): ConfigurationManager {
    if (!ConfigurationManager.instance) {
      ConfigurationManager.instance = new ConfigurationManager();
    }
    return ConfigurationManager.instance;
  }

  public getSetting(key: string): any {
    return this.settings[key];
  }

  public setSetting(key: string, value: any): void {
    this.settings[key] = value;
  }
}

// Example usage
const configManager1 = ConfigurationManager.getInstance();
console.log(configManager1.getSetting("server_url")); // Output: https://example.com

const configManager2 = ConfigurationManager.getInstance();
console.log(configManager1 === configManager2); // Output: true

configManager2.setSetting("timeout", 10000);
console.log(configManager1.getSetting("timeout")); // Output: 10000

// Example 2
class Database {
  private static instance: Database;

  private constructor() {
    // Private constructor to prevent instantiation outside the class
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
      console.log("Database instance created");
    }
    return Database.instance;
  }

  public query(query: string): void {
    console.log(`Executing query: ${query}`);
    // Code to execute the query in the database
  }
}

// Example usage of the Singleton Database class
const db1 = Database.getInstance();
db1.query("SELECT * FROM users");

// Trying to create another instance will return the existing instance
const db2 = Database.getInstance();
db2.query("UPDATE products SET price = 100");

// Both instances point to the same object
console.log(db1 === db2); // Output: true
