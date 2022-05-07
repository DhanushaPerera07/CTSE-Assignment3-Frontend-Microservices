/*
 * MIT License
 *
 * Copyright (c) 2022 Code4 v2 Technologies.
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NON INFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 */

// import axios from './axios.service';
const axios = require('axios');

/**
 * Send email using emailJS web service.
 * "user_id": "user_Swzja6hgJOB3MOMfn8x53"
 * "service_id": "service_727resg"
 * "template_id": "template_7yqrsnk"
 * */
const sendEmail = ({
                       user_id,
                       service_id,
                       template_id,
                       template_params: {
                           from_name,
                           to_name,
                           reply_to,
                           address,
                           message,
                           itemName,
                           quantity,
                           unitPrice,
                           total
                       },
                       accessToken
                   }) => {
    const sendData = {
        user_id,
        service_id,
        template_id,
        template_params: {from_name, to_name, reply_to, address, message, itemName, quantity, unitPrice, total},
        accessToken
    };

    return new Promise(async (resolve, reject) => {
        try {
            const response = await axios.post('https://api.emailjs.com/api/v1.0/email/send',
                JSON.stringify(sendData), {
                    headers: {'Content-Type': 'application/json'}
                });
            if (response.status === 200) {
                resolve(true);
            }
        } catch (error) {
            reject(error);
        }
    });
};


// sendEmail({
//     user_id: 'user_Swzja6hgJOB3MOMfn8x53',
//     service_id: 'service_727resg',
//     template_id: 'template_3cvmc3f',
//     template_params: {
//         from_name: 'Janaka Chinthana',
//         to_name: 'Dhanusha Perera',
//         reply_to: 'buddhika.dhanusha@gmail.com',
//         message: 'Hello, I am testing the emailJS service.'
//     },
//     accessToken: '6ceb240ee4e4e409d19845b2e08cd7fa'
// }).then(response => {
//     console.log(response);
// }).catch(reason => {
//     console.error(reason);
// });

module.exports = {
    sendEmail
};