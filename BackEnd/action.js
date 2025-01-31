"use server";
import { Client } from "square"
import { SquareClient } from "square";
const { paymentsApi } = new Client({
    accessToken: process.env.SQUARE_ACCESS_TOKEN,
    environment: "sandbox"


});

export async function submitPayment(sourceId) {
    try {
        // const {result} = await paymentsApi.createPayment({
        //         idempotencyKey: crypto.randomUUID(),
        //         sourceId,
        //         amountMoney:{
        //             currency: "USD",
        //             amount:100,
        //         },

        // });
        // return result;
        const client = new SquareClient({
            token: accessToken,
        });
        await client.checkout.paymentLinks.create({
            quickPay: {
                locationId: "LAWPABWTGF5CK",
                name: "Thunder Mountain Curry",
                priceMoney: {
                    amount: BigInt(1300),
                    currency: "USD",
                },
            },
            checkoutOptions: {
                allowTipping: true,
            },
        });
        console.log(client.checkout.paymentLinks)


    } catch (error) {
        console.log(error)
    }
}