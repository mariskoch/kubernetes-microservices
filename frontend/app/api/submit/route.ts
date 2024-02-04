export async function POST (req: Request) {
    const data = await req.json();
    // TODO: add body validation
    console.log(data);
    return Response.json({ message: 'Hello, World!' });
}
