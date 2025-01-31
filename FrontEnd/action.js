"use server";
import { Client } from "square"
import { SquareClient } from "square";
// const { paymentsApi } = new Client({
//     // accessToken: process.env.SQUARE_ACCESS_TOKEN,
//     accessToken:"EAAAl7bENyO2IwLTbpGL89p7qWt6p1A6C6AXjph8GtfoeYievQUUrespkltM",
//     environment: "sandbox"


// });
accessToken:"EAAAl7bENyO2IwLTbpGL89p7qWt6p1A6C6AXjph8GtfoeYievQUUrespkltM"
environment: "sandbox"

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

        const client = new Client({
            token: "EAAAl7bENyO2IwLTbpGL89p7qWt6p1A6C6AXjph8GtfoeYievQUUrespkltM",
        });
        console.log("client:")
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
        console.log(client)


    } catch (error) {
        console.log(error)
    }
}