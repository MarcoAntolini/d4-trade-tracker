export async function get({ req, res, endpoint }: { req: Request; res: Response; endpoint: string }) {
	try {
		const response = await fetch(endpoint, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				"Access-Control-Allow-Origin": "*",
				"Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
				"Access-Control-Allow-Headers": "Content-Type, Authorization",
			},
			cache: "no-cache",
		});
		if (!response.ok) {
			console.error("Error from target server:", response.status, response.statusText);
			return new Response("Error from target server", { status: 500 });
		}
		const data = (await response.json())[0]["result"]["data"]["json"]["data"];
		return Response.json(data);
	} catch (error) {
		console.error("Error during proxy request:", error);
		return new Response("Error during proxy request", { status: 500 });
	}
}
