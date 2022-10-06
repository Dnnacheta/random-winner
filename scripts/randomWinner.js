// import { ethers } from "hardhat";
require('dotenv').config();
const ethers = require('ethers');

const QUICKNODE_HTTP_URL = process.env.QUICKNODE_HTTP_URL;
const provider = new ethers.providers.Web3Provider('mumbai', QUICKNODE_HTTP_URL);

const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider);

const contract = require("../artifacts/contracts/RandomWinner.sol/RandomWinner.json");

const abi = contract.abi
const contractAddress = '0x8d8593a3AD310fc69D4A1297690B44a58147f997'
const randomWinner = new ethers.Contract(contractAddress, abi, signer);
console.log(JSON.stringify(contract.abi));