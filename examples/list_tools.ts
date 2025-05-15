import { Client } from '@modelcontextprotocol/sdk/client/index.js';
import { StdioClientTransport } from '@modelcontextprotocol/sdk/client/stdio.js';
import { config } from 'dotenv';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

// Get the current file's directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables from .env file
config();

// Get and validate required environment variables
const apiKey = process.env.BUFFETT_CODE_API_KEY;
if (!apiKey) {
  throw new Error(
    'BUFFETT_CODE_API_KEY environment variable is required. Set it in your .env file.'
  );
}

// Compose env for child process
const env = {
  BUFFETT_CODE_API_KEY: apiKey,
} as const satisfies Record<string, string>;

async function main() {
  // Initialize MCP client
  const client = new Client(
    {
      name: 'buffett-code-mcp-example-client',
      version: '1.0.0',
    },
    {
      capabilities: {},
    }
  );

  // Create transport to connect to the server
  const transport = new StdioClientTransport({
    command: process.execPath,
    args: [
      resolve(__dirname, '../dist/index.js'), // pre-build server
    ],
    env,
  });

  try {
    // Connect to the server
    await client.connect(transport);
    console.log('Connected to BuffetCode MCP server');

    // List available tools
    const toolsResponse = await client.listTools();
    
    console.log('Available tools:');
    toolsResponse.tools.forEach(tool => {
      console.log(`- ${tool.name}: ${tool.description}`);
    });
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await transport.close();
    console.log('Connection closed.');
  }
}

main().catch((error) => {
  console.error('Fatal error in main:', error);
  process.exit(1);
});