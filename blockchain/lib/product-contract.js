/*
 * SPDX-License-Identifier: Apache-2.0
 */

"use strict";

const { Contract } = require("fabric-contract-api");
const { add } = require("winston");

class ProductContract extends Contract {
    //Add Sample Data
    async createProductArray(ctx, productList) {
        try {
            // Product count
            let addedCount = 0;
            let list = JSON.parse(productList);

            //Looping through each product and saving in the blockchain
            for (let i = 0; i < list.length; i++) {
                let product = list[i];
                // Get the existing product with the given identifier, if it exists
                let productTest = await ctx.stub.getState(product.id);
                if (!productTest || productTest.length === 0) {
                    // Save the new product to the blockchain
                    await ctx.stub.putState(
                        list[i].identifier,
                        Buffer.from(JSON.stringify(list[i]))
                    );
                    addedCount++;
                }
            }
            return {
                message:
                    "saved " + addedCount + " products out of " + list.length,
            };
        } catch (e) {
            console.log(e.message);
            return {
                message: e.message,
            };
        }
    }

    //Search Product
    async getProductById(ctx, id) {
        const productBytes = await ctx.stub.getState(id);
        if (!productBytes || productBytes.length === 0) {
            return {
                message: "invalid",
            };
        }
        const product = JSON.parse(productBytes.toString());
        return {
            message: "valid",
            product: product,
        };
    }

    //Update Safety Message
    async updateSafetyMessage(ctx, id, message) {
        try {
            // Get the product from the ledger using its ID
            const product = await ctx.stub.getState(id);
            if (!product || product.length === 0) {
                return {
                    message: "error",
                };
            }

            // Parse the JSON data
            const productData = JSON.parse(product.toString());

            // Add the safety message info to the product data
            productData.safety_message.message = message;

            // Convert the data back to JSON and write it to the ledger
            await ctx.stub.putState(
                id,
                Buffer.from(JSON.stringify(productData))
            );
            return {
                message: "saved",
            };
        } catch (err) {
            console.error(err);
            return {
                message: "error",
            };
        }
    }
}

module.exports = ProductContract;
