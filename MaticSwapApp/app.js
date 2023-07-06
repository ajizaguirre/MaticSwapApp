'use strict';
import MaticJS from "maticjs";

const matic = new MaticJS();

const swapTokens = async (amount, tokenIn, tokenOut) => {
    const txHash = await matic.swapTokens(amount, tokenIn, tokenOut);
    console.log("Transaction hash: ", txHash);
};

const main = async () => {
    const amount = 100;
    const tokenInOptions = [
        {
            name: "USDC",
            address: "0x22f65f64875a6967c70b84b8750f94da6abb616b",
        },
        {
            name: "MATIC",
            address: "0x7d75f78724a376f36b7742e12e50ef2712546837",
        },
        {
            name: "ETH",
            address: "0x0000000000000000000000000000000000000000",
        },
        {
            name: "WETH",
            address: "0x7c7a679d7e52c2f04354f9fa72d9147039a8b82c",
        },
        {
            name: "DAI",
            address: "0x6b175474e89094c44da98b954eedeac495271d0f",
        },
        {
            name: "LINK",
            address: "0x046d8811f9168629c949783b8d10a0462ee2f339",
        },
    ];
    const tokenIn = document.getElementById("tokenIn").value;
    const tokenOutOptions = tokenInOptions.filter((token) => token !== tokenIn);
    const tokenOut = document.getElementById("tokenOut").value;

    const tokenInAddress = tokenInOptions.find((token) => token.name === tokenIn).address;
    const tokenOutAddress = tokenOutOptions.find((token) => token.name === tokenOut).address;

    // Validate the user input.
    if (!tokenInAddress || !tokenOutAddress) {
        throw new Error("Invalid token addresses");
    }

    // Check the balance of the user.
    const balance = await matic.getBalance(tokenInAddress);

    // If the balance is not enough, show an error message.
    if (balance < amount) {
        throw new Error("Not enough balance");
    }

    // Encrypt the transaction data.
    const encryptedTxData = await matic.encryptTxData(txHash);

    // Send the transaction.
    const txHash = await matic.sendTransaction(encryptedTxData);
    console.log("Transaction hash: ", txHash);
};

document.addEventListener("DOMContentLoaded", () => {
    const tokenInSelect = document.getElementById("tokenIn");
    tokenInSelect.innerHTML = "";
    for (const token of tokenInOptions) {
        const option = document.createElement("option");
        option.value = token.name;
        option.textContent = token.name;
        tokenInSelect.appendChild(option);
    }

    const tokenOutSelect = document.getElementById("tokenOut");
    tokenOutSelect.innerHTML = "";
    for (const token of tokenOutOptions) {
        const option = document.createElement("option");
        option.value = token.name;
        option.textContent = token.name;
        tokenOutSelect.appendChild(option);
    }
});

main();

console.log('Hello world');