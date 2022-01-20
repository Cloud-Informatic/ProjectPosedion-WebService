const ethereumButton = document.getElementById("wallet");
async function connectMetamask() {
   
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (ethereum.isConnected() == true) {
            const account = accounts[0];
            document.getElementById("walletid").value = account;
            document.getElementById("form").submit();
        }else{
            console.log("Metamask'a bağlanın");
        }
    
    
};
