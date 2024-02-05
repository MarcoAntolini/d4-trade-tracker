export async function GET(req: Request, res: Response) {
	try {
		const response = await fetch(
			"https://diablo.trade/api/trpc/offer.search?batch=1&input=%7B%220%22%3A%7B%22json%22%3A%7B%22price%22%3A%7B%22min%22%3A0%2C%22max%22%3A9999999999%7D%2C%22sold%22%3Afalse%2C%22quantity%22%3A%7B%22max%22%3A9999%2C%22min%22%3A0%7D%2C%22requestType%22%3A%5B%22WTS%22%5D%2C%22mode%22%3A%5B%22season%20softcore%22%5D%2C%22cursor%22%3A1%2C%22limit%22%3A20%2C%22sort%22%3A%7B%22updatedAt%22%3A-1%2C%22createdAt%22%3A-1%7D%2C%22itemType%22%3A%5B%22boss%20materials%22%5D%2C%22name%22%3A%5B%22Shard-of%20Agony%22%2C%22Mucus-Slick%20Egg%22%5D%7D%7D%7D",
			{
				method: "GET",
				headers: {
					"Content-Type": "application/json",
					"Access-Control-Allow-Origin": "*",
					"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
					"Access-Control-Allow-Headers": "Content-Type, Authorization",
				},
			}
		);
		if (!response.ok) {
			console.error("Error from target server:", response.status, response.statusText);
			return new Response("Error from target server", { status: 500 });
		}
		const data = await response.json();
		return Response.json(data);
	} catch (error) {
		console.error("Error during proxy request:", error);
		return new Response("Error during proxy request", { status: 500 });
	}
}
