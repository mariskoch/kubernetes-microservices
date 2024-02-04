import validateAndParseBody from "@/utils/ValidateAndPassBody";
import CreateCounterDto from "@/app/api/counter/create/create-counter.dto";

export async function POST(req: Request) {
    const {valid, body, errors} = await validateAndParseBody(req, CreateCounterDto);
    if (!valid) {
        return Response.json(errors, {status: 400});
    }
    try {
        const res = await fetch('http://counting/create', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        if (res.ok) {
            return Response.json({message: 'Created Counter successfully'}, {status: 201});
        } else {
            return Response.json(await res.json(), {status: res.status})
        }
    } catch (error) {
        console.log(error);
        return Response.json({error: 'Could not connect to Counting Service'})
    }
}
