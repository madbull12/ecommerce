import { NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,{
    apiVersion:"2022-08-01"
});

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method==="POST") {
        try {
            const session = await stripe.checkout.sessions.create({
                submit_type: "pay",
                mode:"payment",
                payment_method_types:["card"],
                cancel_url: `${req.headers.origin}/cancel`,
                success_url: `${req.headers.origin}/success`,
                shipping_address_collection:{
                    allowed_countries:["US","ID" ]
                }, 
                line_items:req.body.map((item:any)=>{
                    return {
                        price_data:{
                            currency:"usd",
                            product_data:{
                                name:item.title,
                                images:[item?.image.data.attributes.formats.thumbnail.url]
                            },
                            unit_amount:item?.price * 100
                        }
                    }
                })
            });
            res.status(200).json(session)
        }catch(err:any) {
            res.status(err?.statusCode || 500).json(err.message)
        }
    }
}