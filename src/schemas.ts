import { z } from 'zod';

export const BaseRequestSchema = z.object({});

export const CompanyDailyRequestSchema = z.object({
  date: z
    .string()
    .regex(
      /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
      'RFC3339形式の日付 (例: 2024-01-01)'
    ),
});

export const CompanyQuarterlyRequestSchema = z.object({
  year_quarter: z
    .string()
    .regex(/^[0-9]{4}Q[0-9]$/, '決算期を示す決算年度年と四半期 (例: 2020Q4)'),
});

export const CompanyStocksRequestSchema = z.object({
  stock_id: z.string().regex(/^[a-z]+$/, '銘柄コード (例: goog)'),
});

export const CompanyStocksDailyRequestSchema = z.object({
  stock_id: z.string().regex(/^[a-z]+$/, '銘柄コード (例: goog)'),
  date: z
    .string()
    .regex(
      /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/,
      'RFC3339形式の日付 (例: 2024-01-01)'
    ),
});

export const CompanyStocksQuarterlyRequestSchema = z.object({
  stock_id: z.string().regex(/^[a-z]+$/, '銘柄コード (例: goog)'),
  year_quarter: z
    .string()
    .regex(/^[0-9]{4}Q[0-9]$/, '決算期を示す決算年度年と四半期 (例: 2020Q4)'),
});
