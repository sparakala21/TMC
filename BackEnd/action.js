"use server";
// import { Client } from "square"
// import { SquareClient } from "square";
// const { paymentsApi } = new Client({
//     accessToken: process.env.SQUARE_ACCESS_TOKEN,
//     environment: "sandbox"


// });
import axios from 'axios';


export async function submitPayment() {       
    const headers = {

        'Authorization': `Bearer EAAAl7bENyO2IwLTbpGL89p7qWt6p1A6C6AXjph8GtfoeYievQUUrespkltM-hh3`, //make more secure use env
    
        'Square-Version': '2025-01-23', 
    
        'Content-Type': 'application/json'
    
      };
    
     price = 12.5;
     locationId = "LAWPABWTGF5CK";
    
      const data = {
    
        "idempotency_key": crypto.randomUUID(),
    
        "quick_pay": {
    
          "name": "TMC",
    
          "price_money": {
    
            "amount": price * 100, // Amount in cents
    
            "currency": "USD" 
    
          },
    
          "location_id": locationId
    
        }
    
      };
    
    
      console.log("function is run")
      try {
    
        const response = await axios.post('https://connect.squareupsandbox.com/v2/online-checkout/payment-links', data, { headers });
    
        console.log("Quick Pay link created:", response.data.payment_link.url);
    
      } catch (error) {
    
        console.error("Error creating Quick Pay link:", error);
    
      }
}