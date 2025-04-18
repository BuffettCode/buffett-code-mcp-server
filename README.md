# buffette-code-mcp-server

A [MCP(Model Context Protocol)](https://www.anthropic.com/news/model-context-protocol) server that accesses to [buffet code API](https://docs.buffett-code.com/api/).

## Features

Available tools:

- `buffetcode_get_company` - Get company information from Buffett Code
- `buffetcode_get_company_daily` - Get daily company information from Buffett Code for a specific date
- `buffetcode_get_company_quarterly` - Get quarterly company information from Buffett Code for a specific year and quarter
- `buffetcode_get_company_stocks` - Get company stock information from Buffett Code for a specific stock
- `buffetcode_get_company_stocks_daily` Get daily company stock information from Buffett Code for a specific stock and date
- `buffetcode_get_company_stocks_quarterly` - Get quarterly company stock information from Buffett Code for a specific stock and year-quarter

## Quick Start

### Installation

TBD

### Usage

#### Start the MCP server

TBD

#### Edit MCP configuration json for your client:

```json
...
    "buffet-code": {
      "command": "node",
      "args": [
        "/path/to/buffet-code-mcp-server/dist/index.js"
      ],
      "env": {
      }
    },
...
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
