import { z } from 'zod';

export const BaseRequestSchema = z.object({});

export const USCompanyRequestSchema = z.object({
  companyId: z.string().regex(/^[0-9]+$/, 'EDINET code (e.g.: 0001652044)'),
});

export const USCompanyDailyRequestSchema = z.object({
  companyId: z.string().regex(/^[0-9]+$/, 'EDINET code (e.g.: 0001652044)'),
  date: z
    .string()
    .regex(
      /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
      'RFC3339 date string (e.g.: 2024-01-01)'
    ),
});

export const USCompanyQuarterlyRequestSchema = z.object({
  companyId: z.string().regex(/^[0-9]+$/, 'EDINET code (e.g.: 0001652044)'),
  year_quarter: z.string().regex(/^[0-9]{4}Q[0-9]$/, 'e.g.: 2020Q4'),
});

export const USCompanyStocksRequestSchema = z.object({
  companyId: z.string().regex(/^[0-9]+$/, 'EDINET code (e.g.: 0001652044)'),
  stock_id: z.string().regex(/^[a-z]+$/, 'stock ID (e.g.: goog)'),
});

export const USCompanyStocksDailyRequestSchema = z.object({
  companyId: z.string().regex(/^[0-9]+$/, 'EDINET code (e.g.: 0001652044)'),
  stock_id: z.string().regex(/^[a-z]+$/, 'stock ID (e.g.: goog)'),
  date: z
    .string()
    .regex(
      /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
      'RFC3339 date string (e.g.: 2024-01-01)'
    ),
});

export const USCompanyStocksQuarterlyRequestSchema = z.object({
  companyId: z.string().regex(/^[0-9]+$/, 'EDINET code (e.g.: 0001652044)'),
  stock_id: z.string().regex(/^[a-z]+$/, 'stock ID (e.g.: goog)'),
  year_quarter: z.string().regex(/^[0-9]{4}Q[0-9]$/, 'e.g.: 2020Q4'),
});
