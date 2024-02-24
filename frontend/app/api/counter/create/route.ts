export async function POST(req: Request) {
    const body = await req.json();
    try {
        const res = await fetch('http://counting/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        return Response.json(await res.json(), {status: res.status});
    } catch (error) {
        return Response.json({message: 'Could not connect to Counting Service'}, {status: 500})
    }
}
