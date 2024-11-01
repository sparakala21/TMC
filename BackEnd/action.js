"use server";
import {Client} from "square"
const{paymentsApi} = new Client({
accessToken: process.env.SQUARE_ACCESS_TOKEN,
environment:"sandbox"


});

export async function submitPayment(sourceid){
    try {
        const {result} = await paymentsApi.createPayment({
                idempotencyKey: randomUUID(),
                sourceId,
                amountMoney:{
                    currency: "USD",
                    amount:100,
                },

        });
        return result;
    } catch(error){
        console.log(error)
    }
}