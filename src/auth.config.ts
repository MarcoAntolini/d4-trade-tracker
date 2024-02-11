import { type NextAuthOptions } from "next-auth";
import BattleNetProvider, { type BattleNetIssuer } from "next-auth/providers/battlenet";

const authConfig = {
	providers: [
		BattleNetProvider({
			clientId: process.env.BATTLENET_CLIENT_ID as string,
			clientSecret: process.env.BATTLENET_CLIENT_SECRET as string,
			issuer: process.env.BATTLENET_ISSUER as BattleNetIssuer,
		}),
	],
} satisfies NextAuthOptions;

export default authConfig;
