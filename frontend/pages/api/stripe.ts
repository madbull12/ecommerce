import {  NextApiRequest, NextApiResponse } from 'next';
import Stripe from 'stripe';
import { IProduct } from '../../interface';

const stripe = new Stripe(`${process.env.NEXT_PUBLIC_STRIPE_SECRET_KEY}`,{
    apiVersion:"2022-08-01"
});

export default async function handler(req:NextApiRequest,res:NextApiResponse) {
    if(req.method==="POST") {
        console.log(req)
        try {

            const session = await stripe.checkout.sessions.create({
                submit_type: "pay",
                mode:"payment",
                payment_method_types:["card"],
                cancel_url: `${req.headers.origin}/cancel`,
                success_url: `${req.headers.origin}/success?&session_id={CHECKOUT_SESSION_ID}`,
                shipping_address_collection:{
                    allowed_countries:["US","ID" ]
                }, 
                shipping_options:[{ shipping_rate:"shr_1LTHgAA7LQ0rA2oBRg1y6kaU" }],
                allow_promotion_codes:true,
                line_items:req.body.map((item:IProduct)=>{
                    return {
                        price_data:{
                            currency:"usd",
                            product_data:{
                                name:item?.attributes.title,
                                images:[item?.attributes.image.data.attributes.formats.thumbnail.url]
                            },
                            
                            unit_amount:item?.attributes.price * 100
                        },
                        adjustable_quantity:{
                            enabled:true,
                            minimum:1
                        },
                        quantity:item?.quantity
                        
                    }
                })
            });

            res.status(200).json(session)
        }catch(err:any) {
            res.status(err?.statusCode || 500).json(err.message)
        }
    }
}