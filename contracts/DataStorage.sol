pragma solidity 0.4.18;

contract DataStore {
    
    address public owner;
    bytes32 hash;
    uint256 public price;
    string public title;
    string public description;
    
    event BoughtData(address receiver, uint price, string title, bytes32 hash);
    
    function DataStore(bytes32 _hash, uint256 _price, string _title, string _description) 
        public
    {
        owner = msg.sender;
        hash = _hash;
        price = _price;
        title = _title;
        description = _description;
    }
    
    function buyData()
        public
        payable
        returns (bytes32)
    {
        require(price <= msg.value);
        
        bytes32 encryptedHash = keccak256(msg.sender, hash);
        
        BoughtData(msg.sender, price, title, encryptedHash);
       
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