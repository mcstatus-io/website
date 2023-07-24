export function GET() {
    return new Response('Pong!', {
        status: 200,
        headers: {
            'Content-Type': 'text/plain'
        }
    });
}