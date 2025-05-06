#!/usr/bin/env node

import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
// import { z } from 'zod';
import dotenv from 'dotenv';
dotenv.config();

const BUFFETT_CODE_BASE_URL = 'https://api.buffett-code.com';

const BUFFETT_CODE_API_KEY = process.env.BUFFETT_CODE_API_KEY;
if (!BUFFETT_CODE_API_KEY) {
  throw new Error(
    'BUFFETT_CODE_API_KEY is required. Set it in your environment or .env file.'
  );
}

// Alphabet Inc.
const COMPANY_ID = '0001652044';

import {
  BaseRequestSchema,
  CompanyDailyRequestSchema,
  CompanyQuarterlyRequestSchema,
  CompanyStocksRequestSchema,
  CompanyStocksDailyRequestSchema,
  CompanyStocksQuarterlyRequestSchema,
} from './schemas.js';

const server = new Server(
  {
    name: 'buffetcode-mcp-server',
    version: '0.0.1',
  },
  {
    capabilities: {
      tools: {},
    },
  }
);

server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'buffetcode_get_company',
        description: 'Get company information from Buffett Code',
        inputSchema: zodToJsonSchema(BaseRequestSchema),
      },
      {
        name: 'buffetcode_get_company_daily',
        description:
          'Get daily company information from Buffett Code for a specific date',
        inputSchema: zodToJsonSchema(CompanyDailyRequestSchema),
      },
      {
        name: 'buffetcode_get_company_quarterly',
        description:
          'Get quarterly company information from Buffett Code for a specific year and quarter',
        inputSchema: zodToJsonSchema(CompanyQuarterlyRequestSchema),
      },
      {
        name: 'buffetcode_get_company_stocks',
        description:
          'Get company stock information from Buffett Code for a specific stock',
        inputSchema: zodToJsonSchema(CompanyStocksRequestSchema),
      },
      {
        name: 'buffetcode_get_company_stocks_daily',
        description:
          'Get daily company stock information from Buffett Code for a specific stock and date',
        inputSchema: zodToJsonSchema(CompanyStocksDailyRequestSchema),
      },
      {
        name: 'buffetcode_get_company_stocks_quarterly',
        description:
          'Get quarterly company stock information from Buffett Code for a specific stock and year-quarter',
        inputSchema: zodToJsonSchema(CompanyStocksQuarterlyRequestSchema),
      },
    ],
  };
});

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  try {
    if (!request.params) {
      throw new Error('Params are required');
    }

    switch (request.params.name) {
      case 'buffetcode_get_company': {
        const response = await fetch(
          `${BUFFETT_CODE_BASE_URL}/api/v4/us/companies/${COMPANY_ID}`,
          {
            headers: {
              'x-api-key': BUFFETT_CODE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error('Failed to get');
        }

        const result = await response.json();

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }
      case 'buffetcode_get_company_daily': {
        const args = CompanyDailyRequestSchema.parse(request.params.arguments);

        const response = await fetch(
          `${BUFFETT_CODE_BASE_URL}/api/v4/us/companies/${COMPANY_ID}/daily/${args.date}`,
          {
            headers: {
              'x-api-key': BUFFETT_CODE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to get daily data: ${response.statusText}`);
        }

        const result = await response.json();

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }
      case 'buffetcode_get_company_quarterly': {
        const args = CompanyQuarterlyRequestSchema.parse(
          request.params.arguments
        );

        const response = await fetch(
          `${BUFFETT_CODE_BASE_URL}/api/v4/us/companies/${COMPANY_ID}/quarterly/${args.year_quarter}`,
          {
            headers: {
              'x-api-key': BUFFETT_CODE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to get quarterly data: ${response.statusText}`
          );
        }

        const result = await response.json();

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }
      case 'buffetcode_get_company_stocks': {
        const args = CompanyStocksRequestSchema.parse(request.params.arguments);

        const response = await fetch(
          `${BUFFETT_CODE_BASE_URL}/api/v4/us/companies/${COMPANY_ID}/stocks/${args.stock_id}`,
          {
            headers: {
              'x-api-key': BUFFETT_CODE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Failed to get stock data: ${response.statusText}`);
        }

        const result = await response.json();

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }
      case 'buffetcode_get_company_stocks_daily': {
        const args = CompanyStocksDailyRequestSchema.parse(
          request.params.arguments
        );

        const response = await fetch(
          `${BUFFETT_CODE_BASE_URL}/api/v4/us/companies/${COMPANY_ID}/stocks/${args.stock_id}/daily/${args.date}`,
          {
            headers: {
              'x-api-key': BUFFETT_CODE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to get daily stock data: ${response.statusText}`
          );
        }

        const result = await response.json();

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }
      case 'buffetcode_get_company_stocks_quarterly': {
        const args = CompanyStocksQuarterlyRequestSchema.parse(
          request.params.arguments
        );

        const response = await fetch(
          `${BUFFETT_CODE_BASE_URL}/api/v4/us/companies/${COMPANY_ID}/stocks/${args.stock_id}/quarterly/${args.year_quarter}`,
          {
            headers: {
              'x-api-key': BUFFETT_CODE_API_KEY,
            },
          }
        );

        if (!response.ok) {
          throw new Error(
            `Failed to get quarterly stock data: ${response.statusText}`
          );
        }

        const result = await response.json();

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }
      default:
        throw new Error(`Unknown tool: ${request.params.name}`);
    }
  } catch (error) {
    console.error('Error handling request:', error);
    const errorMessage =
      error instanceof Error ? error.message : 'Unknown error occurred';
    throw new Error(errorMessage);
  }
});

async function runServer() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Buffette Code MCP Server running on stdio');
}

runServer().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
