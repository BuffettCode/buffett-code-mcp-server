#!/usr/bin/env node

import {
  ListToolsRequestSchema,
  CallToolRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import { zodToJsonSchema } from 'zod-to-json-schema';
import {
  USCompanyRequestSchema,
  USCompanyDailyRequestSchema,
  USCompanyQuarterlyRequestSchema,
  USCompanyStocksRequestSchema,
  USCompanyStocksDailyRequestSchema,
  USCompanyStocksQuarterlyRequestSchema,
} from './schemas.js';
import dotenv from 'dotenv';
import { createBuffetteCodeClient } from './client/index.js';

dotenv.config();

const BUFFETT_CODE_BASE_URL =
  process.env.BUFFETT_CODE_BASE_URL || 'https://api.buffett-code.com';
const BUFFETT_CODE_API_KEY = process.env.BUFFETT_CODE_API_KEY;
if (!BUFFETT_CODE_API_KEY) {
  throw new Error(
    'BUFFETT_CODE_API_KEY is required. Set it in your environment or .env file.'
  );
}

const buffetteCodeClient = createBuffetteCodeClient(
  BUFFETT_CODE_BASE_URL,
  BUFFETT_CODE_API_KEY
);

const server = new Server(
  {
    name: 'buffett-code-mcp-server',
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
        name: 'buffett_code_get_us_company',
        description: 'Get company information from Buffett Code',
        inputSchema: zodToJsonSchema(USCompanyRequestSchema),
      },
      {
        name: 'buffett_code_get_us_company_daily',
        description:
          'Get daily company information from Buffett Code for a specific date',
        inputSchema: zodToJsonSchema(USCompanyDailyRequestSchema),
      },
      {
        name: 'buffett_code_get_us_company_quarterly',
        description:
          'Get quarterly company information from Buffett Code for a specific year and quarter',
        inputSchema: zodToJsonSchema(USCompanyQuarterlyRequestSchema),
      },
      {
        name: 'buffett_code_get_us_company_stocks',
        description:
          'Get company stock information from Buffett Code for a specific stock',
        inputSchema: zodToJsonSchema(USCompanyStocksRequestSchema),
      },
      {
        name: 'buffett_code_get_us_company_stocks_daily',
        description:
          'Get daily company stock information from Buffett Code for a specific stock and date',
        inputSchema: zodToJsonSchema(USCompanyStocksDailyRequestSchema),
      },
      {
        name: 'buffett_code_get_us_company_stocks_quarterly',
        description:
          'Get quarterly company stock information from Buffett Code for a specific stock and year-quarter',
        inputSchema: zodToJsonSchema(USCompanyStocksQuarterlyRequestSchema),
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
      case 'buffett_code_get_us_company': {
        const args = USCompanyRequestSchema.parse(request.params.arguments);
        const company_id = args.companyId;
        const response = await buffetteCodeClient.GET(
          '/api/v4/us/companies/{company_id}',
          {
            params: {
              path: {
                company_id,
              },
            },
          }
        );

        if (response.error) {
          throw new Error('Failed to get');
        }

        const result = response.data;

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }

      case 'buffett_code_get_us_company_daily': {
        const args = USCompanyDailyRequestSchema.parse(
          request.params.arguments
        );
        const company_id = args.companyId;
        const response = await buffetteCodeClient.GET(
          '/api/v4/us/companies/{company_id}/daily/{date}',
          { params: { path: { company_id, date: args.date } } }
        );

        if (response.error)
          throw new Error(`Failed to get daily data: ${response.error}`);
        const result = response.data;

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }

      case 'buffett_code_get_us_company_quarterly': {
        const args = USCompanyQuarterlyRequestSchema.parse(
          request.params.arguments
        );
        const company_id = args.companyId;
        const response = await buffetteCodeClient.GET(
          '/api/v4/us/companies/{company_id}/quarterly/{year_quarter}',
          {
            params: {
              path: { company_id, year_quarter: args.year_quarter },
            },
          }
        );

        if (response.error)
          throw new Error(`Failed to get quarterly data: ${response.error}`);
        const result = response.data;

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }

      case 'buffett_code_get_us_company_stocks': {
        const args = USCompanyStocksRequestSchema.parse(
          request.params.arguments
        );
        const company_id = args.companyId;
        const response = await buffetteCodeClient.GET(
          '/api/v4/us/companies/{company_id}/stocks/{stock_id}',
          {
            params: {
              path: { company_id, stock_id: args.stock_id },
            },
          }
        );

        if (response.error)
          throw new Error(`Failed to get stock data: ${response.error}`);
        const result = response.data;

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }

      case 'buffett_code_get_us_company_stocks_daily': {
        const args = USCompanyStocksDailyRequestSchema.parse(
          request.params.arguments
        );
        const company_id = args.companyId;
        const response = await buffetteCodeClient.GET(
          '/api/v4/us/companies/{company_id}/stocks/{stock_id}/daily/{date}',
          {
            params: {
              path: {
                company_id,
                stock_id: args.stock_id,
                date: args.date,
              },
            },
          }
        );

        if (response.error)
          throw new Error(`Failed to get daily stock data: ${response.error}`);
        const result = response.data;

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }

      case 'buffett_code_get_us_company_stocks_quarterly': {
        const args = USCompanyStocksQuarterlyRequestSchema.parse(
          request.params.arguments
        );
        const company_id = args.companyId;
        const response = await buffetteCodeClient.GET(
          '/api/v4/us/companies/{company_id}/stocks/{stock_id}/quarterly/{year_quarter}',
          {
            params: {
              path: {
                company_id,
                stock_id: args.stock_id,
                year_quarter: args.year_quarter,
              },
            },
          }
        );

        if (response.error)
          throw new Error(
            `Failed to get quarterly stock data: ${response.error}`
          );
        const result = response.data;

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
  console.error('Buffett Code MCP Server running on stdio');
}

runServer().catch((error) => {
  console.error('Fatal error in main():', error);
  process.exit(1);
});
