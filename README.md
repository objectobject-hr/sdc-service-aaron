# Home Away System Design

This project was my personal attempt at creating a more efficient back-end system. At the time of inheriting the legacy code base, base line traffic metrics were at roughly 500 requests per second. Through much testing, I have effectively scaled the back-end system to handle a 400% increase in traffic at roughly 100ms to a single endpoint, given restrictions and other various constraints.

## Table of Contents

1. [Usage](#Usage)
2. [Requirements](#requirements)
3. [Development](#development)

## Usage

This project aimed to improve an existing back-end architecture, in an attempt to increase the amount traffic it can handle. To run locally:
1. Install dependencies
2. Inside of ```dbhelpers/postgres/``` open index.js and change
- user to your postgres user/password settings
- password to your postgres user/password settings
- host to "localhost"
- database to "sdc_pg"
- port to "5432"
3. From within the root directory, run ```node pgListingsSeed```
4. From within the root directory, run ```npm run pgstart```
5. Test the local api with [artillery.io](https://artillery.io/)

## Requirements

- Node 6.13.0
- etc

## Development
To test locally, I've used [artillery.io](https://artillery.io/)

### Installing Dependencies

From within the root directory:

```sh
npm install -g webpack
npm install
```

# search-form-booking-tool
# search-bar-booking-tool
