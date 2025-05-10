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
  JPCompanyRequestSchema,
  JPCompanyDailyRequestSchema,
  JPCompanyQuarterlyRequestSchema,
  JPCompanyDailyMarketReactionRequestSchema,
  JPCompanyWeeklyStatsRequestSchema,
  JPCompanyMonthlyStatsRequestSchema,
  JPCompanyMonthlyKpisRequestSchema,
  JPCompanyQuarterlyLongTextContentRequestSchema,
  JPCompanyQuarterlyMajorShareholdersRequestSchema,
  JPCompanyQuarterlySegmentsRequestSchema,
  JPCompanyAnnuallyGuidanceRevisionsRequestSchema,
  JPCompanySimilaritiesRequestSchema,
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
        name: 'buffett_code_get_jp_company',
        description: 'Get Japanese company information from Buffett Code',
        inputSchema: zodToJsonSchema(JPCompanyRequestSchema),
      },
      {
        name: 'buffett_code_get_jp_company_daily',
        description:
          'Get daily Japanese company information from Buffett Code for a specific date',
        inputSchema: zodToJsonSchema(JPCompanyDailyRequestSchema),
      },
      {
        name: 'buffett_code_get_jp_company_quarterly',
        description:
          'Get quarterly Japanese company information from Buffett Code for a specific year and quarter',
        inputSchema: zodToJsonSchema(JPCompanyQuarterlyRequestSchema),
      },
      {
        name: 'buffett_code_get_jp_company_daily_market_reaction',
        description:
          'Get the daily market reaction for a JP company as both text and stock price change rate. Currently available only for stocks with sufficient data, on or near quarterly or annual earnings announcement dates.',
        inputSchema: zodToJsonSchema(JPCompanyDailyMarketReactionRequestSchema),
      },
      {
        name: 'buffett_code_get_jp_company_weekly_stats',
        description:
          'Get weekly statistics calculated for the company or stock, mainly including stock price related statistics.',
        inputSchema: zodToJsonSchema(JPCompanyWeeklyStatsRequestSchema),
      },
      {
        name: 'buffett_code_get_jp_company_monthly_stats',
        description:
          'Get monthly statistics calculated for the company or stock, mainly including stock price related statistics.',
        inputSchema: zodToJsonSchema(JPCompanyMonthlyStatsRequestSchema),
      },
      {
        name: 'buffett_code_get_jp_company_monthly_kpis',
        description: 'Get monthly KPIs for a JP company.',
        inputSchema: zodToJsonSchema(JPCompanyMonthlyKpisRequestSchema),
      },
      {
        name: 'buffett_code_get_jp_company_quarterly_long_text_content',
        description:
          'Get processed long-form text content from Buffett Code, based on HTML text found in securities reports or quarterly reports.',
        inputSchema: zodToJsonSchema(
          JPCompanyQuarterlyLongTextContentRequestSchema
        ),
      },
      {
        name: 'buffett_code_get_jp_company_quarterly_major_shareholders',
        description:
          'Get major shareholders information for a company or stock as listed in its securities report or quarterly report.',
        inputSchema: zodToJsonSchema(
          JPCompanyQuarterlyMajorShareholdersRequestSchema
        ),
      },
      {
        name: 'buffett_code_get_jp_company_quarterly_segments',
        description:
          'Get segment information as disclosed in a company or stock’s securities report or quarterly report.',
        inputSchema: zodToJsonSchema(JPCompanyQuarterlySegmentsRequestSchema),
      },
      {
        name: 'buffett_code_get_jp_company_annually_guidance_revisions',
        description:
          'Get a list of earnings guidance revisions by fiscal year for the company or stock.',
        inputSchema: zodToJsonSchema(
          JPCompanyAnnuallyGuidanceRevisionsRequestSchema
        ),
      },
      {
        name: 'buffett_code_get_jp_company_similarities',
        description:
          'Get a list of companies similar to the specified company.',
        inputSchema: zodToJsonSchema(JPCompanySimilaritiesRequestSchema),
      },
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
      case 'buffett_code_get_jp_company': {
        const args = JPCompanyRequestSchema.parse(request.params.arguments);
        const company_id = args.companyId;
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}',
          { params: { path: { company_id } } }
        );

        if (response.error)
          throw new Error(`Failed to get company data: ${response.error}`);
        const result = response.data;

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }

      case 'buffett_code_get_jp_company_daily': {
        const args = JPCompanyDailyRequestSchema.parse(
          request.params.arguments
        );
        const company_id = args.companyId;
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/daily/{date}',
          { params: { path: { company_id, date: args.date } } }
        );

        if (response.error)
          throw new Error(`Failed to get daily data: ${response.error}`);
        const result = response.data;

        return {
          content: [{ type: 'text', text: JSON.stringify(result) }],
        };
      }

      case 'buffett_code_get_jp_company_quarterly': {
        const args = JPCompanyQuarterlyRequestSchema.parse(
          request.params.arguments
        );
        const company_id = args.companyId;
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/quarterly/{year_quarter}',
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

      case 'buffett_code_get_jp_company_daily_market_reaction': {
        const args = JPCompanyDailyMarketReactionRequestSchema.parse(
          request.params.arguments
        );
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/daily/{date}/market_reaction',
          {
            params: {
              path: { company_id: args.companyId, date: args.date },
            },
          }
        );
        if (response.error) throw new Error(`API Error: ${response.error}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data) }],
        };
      }

      case 'buffett_code_get_jp_company_weekly_stats': {
        const args = JPCompanyWeeklyStatsRequestSchema.parse(
          request.params.arguments
        );
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/weekly/{year_week}/stats',
          {
            params: {
              path: { company_id: args.companyId, year_week: args.year_week },
            },
          }
        );
        if (response.error) throw new Error(`API Error: ${response.error}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data) }],
        };
      }

      case 'buffett_code_get_jp_company_monthly_stats': {
        const args = JPCompanyMonthlyStatsRequestSchema.parse(
          request.params.arguments
        );
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/monthly/{year_month}/stats',
          {
            params: {
              path: { company_id: args.companyId, year_month: args.year_month },
            },
          }
        );
        if (response.error) throw new Error(`API Error: ${response.error}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data) }],
        };
      }

      case 'buffett_code_get_jp_company_monthly_kpis': {
        const args = JPCompanyMonthlyKpisRequestSchema.parse(
          request.params.arguments
        );
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/monthly/{year_month}/kpis',
          {
            params: {
              path: { company_id: args.companyId, year_month: args.year_month },
            },
          }
        );
        if (response.error) throw new Error(`API Error: ${response.error}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data) }],
        };
      }

      case 'buffett_code_get_jp_company_quarterly_long_text_content': {
        const args = JPCompanyQuarterlyLongTextContentRequestSchema.parse(
          request.params.arguments
        );
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/quarterly/{year_quarter}/long_text_content',
          {
            params: {
              path: {
                company_id: args.companyId,
                year_quarter: args.year_quarter,
              },
            },
          }
        );
        if (response.error) throw new Error(`API Error: ${response.error}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data) }],
        };
      }

      case 'buffett_code_get_jp_company_quarterly_major_shareholders': {
        const args = JPCompanyQuarterlyMajorShareholdersRequestSchema.parse(
          request.params.arguments
        );
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/quarterly/{year_quarter}/major_shareholders',
          {
            params: {
              path: {
                company_id: args.companyId,
                year_quarter: args.year_quarter,
              },
            },
          }
        );
        if (response.error) throw new Error(`API Error: ${response.error}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data) }],
        };
      }

      case 'buffett_code_get_jp_company_quarterly_segments': {
        const args = JPCompanyQuarterlySegmentsRequestSchema.parse(
          request.params.arguments
        );
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/quarterly/{year_quarter}/segments',
          {
            params: {
              path: {
                company_id: args.companyId,
                year_quarter: args.year_quarter,
              },
            },
          }
        );
        if (response.error) throw new Error(`API Error: ${response.error}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data) }],
        };
      }

      case 'buffett_code_get_jp_company_annually_guidance_revisions': {
        const args = JPCompanyAnnuallyGuidanceRevisionsRequestSchema.parse(
          request.params.arguments
        );
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/annually/{fiscal_year}/guidance_revisions',
          {
            params: {
              path: {
                company_id: args.companyId,
                fiscal_year: args.fiscal_year,
              },
            },
          }
        );
        if (response.error) throw new Error(`API Error: ${response.error}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data) }],
        };
      }

      case 'buffett_code_get_jp_company_similarities': {
        const args = JPCompanySimilaritiesRequestSchema.parse(
          request.params.arguments
        );
        const response = await buffetteCodeClient.GET(
          '/api/v4/jp/companies/{company_id}/similarities',
          {
            params: {
              path: {
                company_id: args.companyId,
              },
            },
          }
        );
        if (response.error) throw new Error(`API Error: ${response.error}`);
        return {
          content: [{ type: 'text', text: JSON.stringify(response.data) }],
        };
      }

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
          {
            params: {
              path: {
                company_id,
                date: args.date,
              },
            },
          }
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
