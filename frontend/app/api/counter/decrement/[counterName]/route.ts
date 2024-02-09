export async function POST(req: Request, { params }: { params: { counterName: string } }) {
    const body = await req.json();
    try {
        const res = await fetch(`http://counting/decrement/${params.counterName}`, {
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
