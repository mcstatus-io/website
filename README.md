# mcstatus.io
The NextJS server that powers the mcstatus.io website. This project is open source for contribution purposes only.

## Requirements

- [Node.js](https://nodejs.org/en/)

## Installation

1. Clone the repository
    - `git clone https://github.com/mcstatus-io/website.git`
2. Move the working directory into the cloned repository
    - `cd website`
3. Install all required dependencies
    - `npm install`
4. Create a `.env.local` file in the `src` folder
    - The file will have the following contents, you can adjust as needed:
```
NEXT_PUBLIC_API_HOST=http://localhost:3001
NEXT_PUBLIC_CARBON_CODE=abc123
```
5. Start the development server
    - `npm run dev`
6. Open your browser to http://localhost:3000

## Copyright
&copy; 2022 Jacob Gunther