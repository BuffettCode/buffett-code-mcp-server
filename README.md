# buffett-code-mcp-server

A [MCP(Model Context Protocol)](https://www.anthropic.com/news/model-context-protocol) server that accesses to [buffett-code API](https://docs.buffett-code.com/api/).

## Features

Available tools:

### Japan Market

- `buffett_code_get_jp_company` - Get Japanese company information from Buffett Code
- `buffett_code_get_jp_company_daily` - Get daily Japanese company information from Buffett Code for a specific date
- `buffett_code_get_jp_company_quarterly` - Get quarterly Japanese company information from Buffett Code for a specific year and quarter
- `buffett_code_get_jp_company_daily_market_reaction` - Get the daily market reaction for a JP company as both text and stock price change rate. Currently available only for stocks with sufficient data, on or near quarterly or annual earnings announcement dates.
- `buffett_code_get_jp_company_weekly_stats` - Get weekly statistics calculated for the company or stock, mainly including stock price related statistics.
- `buffett_code_get_jp_company_monthly_stats` - Get monthly statistics calculated for the company or stock, mainly including stock price related statistics.
- `buffett_code_get_jp_company_monthly_kpis` - Get monthly KPIs for a JP company.
- `buffett_code_get_jp_company_quarterly_long_text_content` - Get processed long-form text content from Buffett Code, based on HTML text found in securities reports or quarterly reports.
- `buffett_code_get_jp_company_quarterly_major_shareholders` - Get major shareholders information for a company or stock as listed in its securities report or quarterly report.
- `buffett_code_get_jp_company_quarterly_segments` - Get segment information as disclosed in a company or stock’s securities report or quarterly report.
- `buffett_code_get_jp_company_annually_guidance_revisions` - Get a list of earnings guidance revisions by fiscal year for the company or stock.
- `buffett_code_get_jp_company_similarities` - Get a list of companies similar to the specified company.

### US Market

- `buffett_code_get_us_company` - Get company information from Buffett Code
- `buffett_code_get_us_company_daily` - Get daily company information from Buffett Code for a specific date
- `buffett_code_get_us_company_quarterly` - Get quarterly company information from Buffett Code for a specific year and quarter
- `buffett_code_get_us_company_stocks` - Get company stock information from Buffett Code for a specific stock
- `buffett_code_get_us_company_stocks_daily` - Get daily company stock information from Buffett Code for a specific stock and date
- `buffett_code_get_us_company_stocks_quarterly` - Get quarterly company stock information from Buffett Code for a specific stock and year-quarter

## Quick Start

### Installation

TBD

### Usage

#### Start the MCP server

TBD

#### Edit MCP configuration json for your client:

```json
...
    "buffett-code": {
      "command": "node",
      "args": [
        "/path/to/buffett-code-mcp-server/dist/index.js"
      ],
      "env": {
      }
    },
...
```


#### Claude Desktopで動かすとき

tsxが必要でしたので、インストールしました。
```
npm install -D tsx
```

`claude_desktop_config.json`を書き換えます。
```json
{
  "mcpServers": {
      "buffett-code": {
        "command": "npx",
        "args": [
          "tsx",
          "/Users/shogoakiyama/Desktop/buffett-code-mcp-server/src/index.ts"
        ],
        "env": {
        }
      }
  }
}
```

## Development

### Available Scripts

- `npm run dev` - Start the server in development mode with hot reloading
- `npm run build` - Build the project for production
- `npm run start` - Start the production server
- `npm run lint` - Run linting checks (ESLint and Prettier)
- `npm run fix` - Automatically fix linting issues
- `npm run examples` - Run the example scripts

### Contributing

1. Fork the repository
2. Create your feature branch
3. Run tests and linting: `npm run lint`
4. Commit your changes
5. Push to the branch
6. Create a Pull Request
