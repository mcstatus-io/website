export const libraryList = [
    {
        official: true,
        language: 'javascript',
        name: 'node-mcstatus',
        url: 'https://www.npmjs.com/package/node-mcstatus'
    },
    {
        official: true,
        language: 'go',
        name: 'go-mcstatus',
        url: 'https://github.com/mcstatus-io/go-mcstatus'
    },
    {
        official: false,
        language: 'python',
        name: 'python-mcstatus',
        url: 'https://pypi.org/project/python-mcstatus/'
    }
];

// Mapping of language names to capitalized formats
export const languageNames = {
    javascript: 'JavaScript',
    python: 'Python',
    go: 'Go'
};

// Value format is [textColor, backgroundColor]
export const languageColors = {
    javascript: ['#000000', '#f7df1e'],
    python: ['#ffffff', '#306998'],
    go: ['#ffffff', '#00add8']
};