export async function GET(req: Request) {
    let res: { average: number, sum: number, min: number | undefined, max: number | undefined } = {
        average: 0,
        sum: 0,
        min: undefined,
        max: undefined
    }

    try {
        const res1 = await fetch('http://statistics/average', {cache: 'no-store'});
        res.average = (await res1.json())['average'];
    } catch (_error) {}

    try {
        const res2 = await fetch('http://statistics/sum', {cache: 'no-store'});
        res.sum = (await res2.json())['sum'];
    } catch (error) {}

    try {
        const res4 = await fetch('http://statistics/min', {cache: 'no-store'});
        res.min = (await res4.json())['count'];
    } catch (_error) {}

    try {
        const res3 = await fetch('http://statistics/max', {cache: 'no-store'});
        res.max = (await res3.json())['count'];
    } catch (_error) {}

    return Response.json(res, {status: 200});
}