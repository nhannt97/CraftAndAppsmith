// Import DropkiqUI
import { DropkiqUI } from "dropkiq-ui";
//import { DropkiqEngine } from "dropkiq";

// Store a reference to the current DropkiqUI instance
let currentInstance = null;
//let currentSchema = {}; // Store the current schema
/*
// Function to convert craft.js serialized structure to DropkiqUI schema
const craftJsToDropkiqSchema = (craftJsData: any) => {
  const schema: any = {};

  const processNode = (node: any) => {
    const tableName = node.type ? node.type.resolvedName : undefined;
    if (!tableName) {
      console.warn("Node type or resolvedName is missing:", node);
      return; // Skip processing this node if required information is missing
    }
    

    if (!schema[tableName]) {
      schema[tableName] = { methods: {} };
    }

    Object.keys(node.props).forEach((propName) => {
      const propValue = node.props[propName];
      const methodType =
        typeof propValue === "object"
          ? "ColumnTypes::Object"
          : `ColumnTypes::${typeof propValue}`;

      schema[tableName].methods[propName] = {
        type: methodType,
        foreign_table_name: null
      };
    });

    if (node.nodes) {
      node.nodes.forEach((childNodeId: string) => {
        processNode(craftJsData[childNodeId]);
      });
    }
  };

  processNode(craftJsData["ROOT"]);
  return schema;
};
*/
export const initializeDropkiqUI = (
  element: HTMLElement,
  craftJsStructure: any,
  context: object,
  scope: object,
  licenseKey: string
) => {
  // Convert craftJsStructure to DropkiqUI schema
  //const schema = craftJsToDropkiqSchema(craftJsStructure);

  // Store the current schema
  var schema = {
    contacts: {
      methods: {
        name: {
          type: "ColumnTypes::String",
          foreign_table_name: null,
          hint: "The full name of the contact person"
        },
        email: {
          type: "ColumnTypes::String",
          foreign_table_name: null,
          hint: "The email address of the contact person"
        },
        age: {
          type: "ColumnTypes::Numeric",
          foreign_table_name: null,
          hint: "The computed age of the contact person"
        },
        is_minor: {
          type: "ColumnTypes::Boolean",
          foreign_table_name: null,
          hint: "Is true if the person is less than 18 years old"
        },
        birthdate: {
          type: "ColumnTypes::DateTime",
          foreign_table_name: null,
          hint: "The birthdate of the contact person"
        },
        notes: {
          type: "ColumnTypes::Text",
          foreign_table_name: null,
          hint: "Any notes that are saved in the database"
        },
        favorite_website: {
          type: "ColumnTypes::HasOne",
          foreign_table_name: "websites",
          hint: "The website the person visits most often"
        },
        visited_websites: {
          type: "ColumnTypes::HasMany",
          foreign_table_name: "websites",
          hint: "A list of websites the person has visited"
        }
      }
    },
    websites: {
      methods: {
        nickname: {
          type: "ColumnTypes::String",
          foreign_table_name: null,
          hint: "The nickname of the website"
        },
        url: {
          type: "ColumnTypes::String",
          foreign_table_name: null,
          hint: "The website HTTP URL address"
        }
      }
    }
  };

  // Create a new DropkiqUI instance
  currentInstance = new DropkiqUI(element, schema, context, scope, licenseKey);
  return currentInstance;
};
/*
// Get the current schema
export const getSchema = () => currentSchema;

// Set the entire schema
export const setSchema = (newSchema: object) => {
  currentSchema = newSchema;
  if (currentInstance) {
    currentInstance.updateSchema(newSchema);
  }
};

// Add a new entry to the schema
export const addSchemaEntry = (key: string, value: object) => {
  currentSchema[key] = value;
  if (currentInstance) {
    currentInstance.updateSchemaFromCraftJs(currentSchema);
  }
};

// Remove an entry from the schema
export const removeSchemaEntry = (key: string) => {
  delete currentSchema[key];
  if (currentInstance) {
    currentInstance.updateSchemaFromCraftJs(currentSchema);
  }
};

export const updateSchemaFromCraftJs = (craftJsStructure: any) => {
  // Convert craftJsStructure to DropkiqUI schema
  const newSchema = craftJsToDropkiqSchema(craftJsStructure);

  // Update the schema
  setSchema(newSchema);
};
*/
