//make sure npm install maticjs
// and npm install chainlink
            'use strict';
            import MaticJS from "maticjs";
            import Chainlink from "chainlink";

            const matic = new MaticJS();
            const chainlink = new Chainlink();

const swapTokens = async (amount, tokenIn, tokenOut) => {
    // Get the current price of the tokens to be swapped.
    const tokenInPrice = await chainlink.getPrice(tokenIn);
            const tokenOutPrice = await chainlink.getPrice(tokenOut);

            // Calculate the amount of tokenOut to be received.
            const amountOut = amount / tokenInPrice * tokenOutPrice;

            // Swap the tokens.
            const txHash = await matic.swapTokens(amount, tokenIn, tokenOut);
            console.log("Transaction hash: ", txHash);
};

const transferTokens = async (tokenIn, tokenOutChain, amount) => {
    // Get the current price of the token to be transferred.
    const tokenInPrice = await chainlink.getPrice(tokenIn);

            // Calculate the amount of tokenOut to be received.
            const amountOut = amount / tokenInPrice * chainlink.getPrice(tokenOutChain);

            // Transfer the tokens.
            const txHash = await matic.transferTokens(tokenIn, tokenOutChain, amount);
            console.log("Transaction hash: ", txHash);
};

const main = async () => {
    const amount = document.getElementById("amount").value;
            const tokenIn = document.getElementById("tokenIn").value;
            const tokenOutChain = document.getElementById("tokenOutChain").value;

            // Transfer the tokens to the selected blockchain.
            const txHash = await transferTokens(tokenIn, tokenOutChain, amount);
            console.log("Transaction hash: ", txHash);
};

document.addEventListener("DOMContentLoaded", () => {
    const button = document.getElementById("transfer");
            button.addEventListener("click", main);
});

main();

console.log('Hello world');