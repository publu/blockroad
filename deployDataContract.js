const fs = require('fs');
const solc = require('solc');
const Web3 = require('web3');

if (typeof web3 !== 'undefined') {
    web3 = new Web3(web3.currentProvider);
  } else {
    // set the provider you want from Web3.providers
    web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));
  }

const input = fs.readFileSync('/contracts/DataStorage.sol');
const output = solc.compile(input.toString(), 1);
const bytecode = output.contracts['Token'].bytecode;
const abi = JSON.parse(output.contracts['Token'].interface);

function deployDataContract = (address, hash, price, title, desciption) {

	var mySenderAddress = address;
	var priceWei = web3.toWei(price, ether);

	var myContractReturned = MyContract.new(hash, price, {
	   from:mySenderAddress,
	   data:bytecode,
	   gas:gasEstimate}, function(err, myContract){
	    if(!err) {
	       // NOTE: The callback will fire twice!
	       // Once the contract has the transactionHash property set and once its deployed on an address.

	       // e.g. check tx hash on the first call (transaction send)
	       if(!myContract.address) {
	           console.log(myContract.transactionHash) // The hash of the transaction, which deploys the contract
	       
	       // check address on the second call (contract deployed)
	       } else {
	           console.log(myContract.address) // the contract address
	       }

	       // Note that the returned "myContractReturned" === "myContract",
	       // so the returned "myContractReturned" object will also get the address set.
	    }
	  });

	  // Deploy contract syncronous: The address will be added as soon as the contract is mined.
	  // Additionally you can watch the transaction by using the "transactionHash" property
	  var myContractInstance = MyContract.new(hash, price, {data: myContractCode, gas: 300000, from: mySenderAddress});
	  myContractInstance.transactionHash // The hash of the transaction, which created the contract
	  myContractInstance.address // undefined at start, but will be auto-filled later
	}