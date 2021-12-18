const ethereumButton = document.getElementById("wallet");
const provider = detectEthereumProvider()

ethereumButton.addEventListener('click', () => {
    connectMetamask();});

async function connectMetamask() {
    if (!provider) {
        console.log('MetaMask is yüklü değil!');
    }else{
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        if (ethereum.isConnected() == true) {
            const account = accounts[0];
            document.getElementById("walletid").value = account;
            document.getElementById("form").submit();
        }else{
            console.log("Metamask'a bağlanın");
        }
    }
    
};