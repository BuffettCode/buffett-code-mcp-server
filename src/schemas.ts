import { z } from 'zod';

export const BaseRequestSchema = z.object({});

//
// JP Company Schemas
//

export const JPCompanyRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
});

export const JPCompanyDailyRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  date: z
    .string()
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .describe(
      'Date for the requested data in RFC3339 format (e.g., YYYY-MM-DD).'
    ),
});

export const JPCompanyQuarterlyRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  year_quarter: z
    .string()
    .regex(/^[0-9]{4}Q[0-9]$/)
    .describe(
      'Fiscal year and quarter for the requested data (e.g., YYYYQ[1-4]).'
    ),
});

// Placeholder schemas for additional JP tools
export const JPCompanyDailyMarketReactionRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  date: z
    .string()
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .describe(
      'Date for the requested data in RFC3339 format (e.g., YYYY-MM-DD).'
    ),
});

export const JPCompanyWeeklyStatsRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  year_week: z
    .string()
    .regex(/^[0-9]{4}W[0-9]{2}$/)
    .describe(
      'Year and week number for the requested data (e.g., YYYYWww, following ISO 8601 week date format).'
    ),
});

export const JPCompanyMonthlyStatsRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  year_month: z
    .string()
    .regex(/^[0-9]{4}-[0-9]{2}$/)
    .describe('Year and month for the requested data (e.g., YYYY-MM).'),
});

export const JPCompanyMonthlyKpisRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  year_month: z
    .string()
    .regex(/^[0-9]{4}-[0-9]{2}$/)
    .describe('Year and month for the requested data (e.g., YYYY-MM).'),
});

export const JPCompanyQuarterlyLongTextContentRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  year_quarter: z
    .string()
    .regex(/^[0-9]{4}Q[0-9]$/)
    .describe(
      'Fiscal year and quarter for the requested data (e.g., YYYYQ[1-4]).'
    ),
});

export const JPCompanyQuarterlyMajorShareholdersRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  year_quarter: z
    .string()
    .regex(/^[0-9]{4}Q[0-9]$/)
    .describe(
      'Fiscal year and quarter for the requested data (e.g., YYYYQ[1-4]).'
    ),
});

export const JPCompanyQuarterlySegmentsRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  year_quarter: z
    .string()
    .regex(/^[0-9]{4}Q[0-9]$/)
    .describe(
      'Fiscal year and quarter for the requested data (e.g., YYYYQ[1-4]).'
    ),
});

export const JPCompanyAnnuallyGuidanceRevisionsRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
  fiscal_year: z
    .string()
    .regex(/^[0-9]{4}$/)
    .describe('Fiscal year for the requested data (e.g., YYYY).'),
});

export const JPCompanySimilaritiesRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/(^[a-zA-Z0-9]{10}$)|(^[a-zA-Z0-9]{4}$)|(^[0-9]{13}$)/)
    .describe(
      'Company identifier. Accepts Buffett Code Company ID (10 alphanumeric chars), Ticker Symbol (4 alphanumeric chars), or Corporate Number (13 digits).'
    ),
});

//
// US Company Schemas
//

export const USCompanyRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/^[0-9]+$/)
    .describe('Company identifier (EDINET code, e.g., 0001652044).'),
});

export const USCompanyDailyRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/^[0-9]+$/)
    .describe('Company identifier (EDINET code, e.g., 0001652044).'),
  date: z
    .string()
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .describe(
      'Date for the requested data in RFC3339 format (e.g., YYYY-MM-DD).'
    ),
});

export const USCompanyQuarterlyRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/^[0-9]+$/)
    .describe('Company identifier (EDINET code, e.g., 0001652044).'),
  year_quarter: z
    .string()
    .regex(/^[0-9]{4}Q[0-9]$/)
    .describe(
      'Fiscal year and quarter for the requested data (e.g., YYYYQ[1-4]).'
    ),
});

export const USCompanyStocksRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/^[0-9]+$/)
    .describe('Company identifier (EDINET code, e.g., 0001652044).'),
  stock_id: z
    .string()
    .regex(/^[a-z]+$/)
    .describe('Stock identifier for the company (e.g., goog).'),
});

export const USCompanyStocksDailyRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/^[0-9]+$/)
    .describe('Company identifier (EDINET code, e.g., 0001652044).'),
  stock_id: z
    .string()
    .regex(/^[a-z]+$/)
    .describe('Stock identifier for the company (e.g., goog).'),
  date: z
    .string()
    .regex(/^[0-9]{4}-[0-9]{2}-[0-9]{2}$/)
    .describe(
      'Date for the requested data in RFC3339 format (e.g., YYYY-MM-DD).'
    ),
});

export const USCompanyStocksQuarterlyRequestSchema = z.object({
  companyId: z
    .string()
    .regex(/^[0-9]+$/)
    .describe('Company identifier (EDINET code, e.g., 0001652044).'),
  stock_id: z
    .string()
    .regex(/^[a-z]+$/)
    .describe('Stock identifier for the company (e.g., goog).'),
  year_quarter: z
    .string()
    .regex(/^[0-9]{4}Q[0-9]$/)
    .describe(
      'Fiscal year and quarter for the requested data (e.g., YYYYQ[1-4]).'
    ),
});
