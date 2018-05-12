import conekta from 'conekta';
import { resolve } from 'path';

conekta.api_key = 'key_mggRLQzrnMLbxCxurmLzBg';
conekta.locale = 'es';

const createOrder = (body, user) => {
    return new Promise((resolve, reject) =>{
        conekta.Order.create({
            "currency": "MXN",
            "customer_info": {
                "name": user.name,
                "phone": user.phone,
                "email": user.email
            },
            "line_items": [{
                "name": `Booking ${body.EstateId}`,
                "description": `${body.checkin, "MM-DD-YY"} - ${body.checkout, "MM-DD-YY"}`,
                "unit_price": body.totalprice,
                "quantity": 1,
                "tags": [],
                "type": "physical"
            }],
            "charges": [{
                "payment_method": {
                  //"token_id": "tok_test_insufficient_funds",
                  //"token_id":"tok_test_visa_4242",
                  "token_id": body.card_token,
                  "type": "card"
                }
            }]
          }, function(err, res) {
            if (err) {
                console.log(`${err.http_code} ${err.details[0].message}`)
                reject(err)
            }else{
                console.log(res.toObject());
                resolve(res.toObject())
            }
        });
    })
}

export{
    createOrder
}