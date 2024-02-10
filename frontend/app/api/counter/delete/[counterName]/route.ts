export async function DELETE(req: Request, { params }: { params: { counterName: string } }) {
    try {
        const res = await fetch(`http://counting/delete/${params.counterName}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
        });
        return Response.json(await res.json(), {status: res.status});
    } catch (error) {
        return Response.json({message: 'Could not connect to Counting Service'}, {status: 500})
    }
}
