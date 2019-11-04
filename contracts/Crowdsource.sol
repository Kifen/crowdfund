pragma solidity >=0.4.22 <0.7.0;


contract CrowdSourceFactory {
    address[] public deployedCampaigns;

    function createCampaign(uint _minPledge) public payable{
        address newCampaign = address(new CrowdSource(_minPledge, msg.sender));
        deployedCampaigns.push(newCampaign);
    }

    function getDeployedCampaigns() public view returns (address[] memory) {
        return deployedCampaigns;
    }
}

contract CrowdSource {
    struct Request {
        string description;
        uint value;
        address payable recipient;
        bool complete;
        uint approvalCount;
        mapping(address => bool) approvals;
    }

    address public manager;
    uint public minimumPledge;
    mapping(address => bool) public contributors;
    Request[] public requests;
    uint public contributorsCount;

    modifier restricted() {
        require(msg.sender == manager, "Sender not authorized");
        _;
    }

    constructor(uint _minPledge, address creator) public {
        manager = creator;
        minimumPledge = _minPledge;
    }

    function contribute() public payable {
        require(msg.value >= minimumPledge, "Ether less than [minimumPledge]");
        contributors[msg.sender] = true;
        contributorsCount++;
    }

    function createRequest(string memory description, uint value, address payable recipient) public restricted {
        Request memory newRequest = Request({
            description: description,
            value: value,
            recipient: recipient,
            complete: false,
            approvalCount: 0
        });
        requests.push(newRequest);
    }

    function approveRequest(uint _index) public{
        Request storage request = requests[_index];
        require(contributors[msg.sender], "Sender not a contributor to campaign");
        require(!request.approvals[msg.sender], "Contributor cannot approve request twice");

        request.approvals[msg.sender] = true;
        request.approvalCount++;
    }

    function finalizeRequest(uint _index) public payable restricted{
        Request storage request = requests[_index];
        require(request.approvalCount > (contributorsCount/2), "Approval less than 50%");
        require(!request.complete, "Request has already been approved");

        request.recipient.transfer(request.value);
        request.complete = true;

    }
}
