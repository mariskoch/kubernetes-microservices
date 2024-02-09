export async function GET(req: Request) {
    try {
        const res = await fetch('http://counting/counters', { cache: 'no-store' });
        return Response.json(await res.json(), {status: res.status});
    } catch (error) {
        return Response.json({message: 'Could not connect to Counting Service'}, {status: 500})
    }
}