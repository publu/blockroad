pragma solidity 0.4.18;

contract DataStore {
    
    address public owner;
    bytes32 hash;
    uint256 public price;
    
    event BoughtData(address receiver, bytes32 hash);
    
    function DataStore(bytes32 _hash, uint256 _price) 
        public
    {
        owner = msg.sender;
        hash = _hash;
        price = _price;
    }
    
    function buyData()
        public
        payable
        returns (bytes32)
    {
        require(price <= msg.value);
        
        bytes32 encryptedHash = keccak256(msg.sender, hash);
        
        BoughtData(msg.sender, encryptedHash);
       
        owner.transfer(msg.value);
       
        return encryptedHash;
    }
    
    function changePrice(uint newPrice)
        public
    {
        require(msg.sender == owner);
        price = newPrice;
    }
    
}