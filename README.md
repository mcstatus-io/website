# mcstatus.io
![](https://img.shields.io/github/languages/code-size/mcstatus-io/website)
[![](https://img.shields.io/github/issues/mcstatus-io/website)](https://github.com/mcstatus-io/website/issues)
[![](https://img.shields.io/github/actions/workflow/status/mcstatus-io/website/node.js.yml)](https://github.com/mcstatus-io/website/actions)
[![](https://img.shields.io/uptimerobot/ratio/m790234582-15fa01814434ec8c2dc75568)](https://status.mcstatus.io/)

This is the source code for the [mcstatus.io](https://mcstatus.io) website. It is built using [NextJS](https://nextjs.org/) and [TailwindCSS](https://tailwindcss.com/). This code is currently under copyright, and is not licensed for distribution. If you are looking for the source code of the API, you are in the wrong place. Please visit the [mcstatus-io/ping-server](https://github.com/mcstatus-io/ping-server) repository instead.

## Requirements

- [Node.js](https://nodejs.org/en/)

## Getting Started

```bash
# 1. Clone the repository (or download from this page)
$ git clone https://github.com/mcstatus-io/website.git

# 2. Move the working directory into the cloned repository
$ cd website

# 3. Install all required dependencies
$ npm install

# 4. Copy the `.env` file in the `src` folder to `.env.local` and modify details as needed
$ cp src/.env src/.env.local

# 5. Start the development server
$ npm run dev

# 6. Navigate to http://localhost:3000
```

## Copyright
&copy; 2022 Jacob Gunther