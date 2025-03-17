import { Face, Network } from '/lib/facewallet/facewallet1.9.2.js';
import { ethers } from "/lib/ethereum/ethers-5.0.esm.min.js";


$(async function () {
    Handlebars.registerHelper("accountPart", customHelpers.accountPart);
    Handlebars.registerHelper("shortHash", customHelpers.shortHash);
    Handlebars.registerHelper("localeDouble", customHelpers.localeDouble);
    Handlebars.registerHelper("localeDoubleSmall", customHelpers.localeDoubleSmall);
    renderHandlebars("main-content", "entry-template", serverData);

    let networkInfo = await axios.get("/api/bslt/facewallet/network");
    let face = new Face(networkInfo.data.faceObject);
    let provider = new ethers.providers.Web3Provider(face.getEthLikeProvider());
    let signer = provider.getSigner();
    let contractABI = JSON.stringify([{ "constant": true, "inputs": [{ "name": "_owner", "type": "address" }], "name": "balanceOf", "outputs": [{ "name": "balance", "type": "uint256" }], "payable": false, "stateMutability": "view", "type": "function" }, { "constant": false, "inputs": [{ "name": "_to", "type": "address" }, { "name": "_value", "type": "uint256" }], "name": "transfer", "outputs": [{ "name": "", "type": "bool" }], "payable": false, "stateMutability": "nonpayable", "type": "function" }, { "anonymous": false, "inputs": [{ "indexed": true, "name": "from", "type": "address" }, { "indexed": true, "name": "to", "type": "address" }, { "indexed": false, "name": "value", "type": "uint256" }], "name": "Transfer", "type": "event" }]);
    let contractAddress = networkInfo.data.bsltContract;
    let contract = new ethers.Contract(contractAddress, contractABI, signer);

    let sendByTbora = async (amount) => {
        let data = {
            amount: amount
        };

        let res = await axios.post(`/api/bslt/deposit`, data).catch(function (error) {
            if (error.response.status == 405) {
                location.href = location.href;
            }
        });

        if (res.data.success) {
            window.open(res.data.url, 'boraDepositPopup');
        } else {
            alert(res.data.message);
        }
    }

    let openFaceWalletHome = async function () {
        let result = await checkWalletAddress();
        if (result) {
            await face.wallet.home({ networks: networkInfo.data.home });
        }
    }

    let checkWalletAddress = async () => {
        let login = await faceWalletLogin();
        if (login === false) {
            return;
        }

        let userAddress = await signer.getAddress();

        if (userAddress.toLowerCase() != serverData.Wallet.toLowerCase()) {
            XLGames.alert("Wallet address does not match. Please login another FaceWallet account.");
            await faceWalletLogout();
        } else {
            return userAddress;
        }
    }

    let sendByFaceWallet = async (amount) => {
        let userAddress = await checkWalletAddress();
        if (!userAddress) {
            return;
        }

        let depositData = {
            amount: amount,
            wallet: userAddress
        };

        let send = await axios.post("/api/bslt/facewallet/deposit", depositData).catch(async (error) => {
           if (error.response.status == 401) {
                await faceWalletLogout();
                XLGames.alert("Walletaddress is not match. Please login another Facewallet account.", () => {
                    location.href = location.href;
                });
           }
        });
        
        if (send?.data.success == true) {
            let receipt = await faceWalletSendTransaction(send.data.to, send.data.amount);
            
            let successData = {
                tranSeq: send.data.tranSeq,
                receipt: JSON.stringify(receipt),
                amount: send.data.amount
            }
            let response = await axios.post("/api/bslt/facewallet/callback", successData);
            if (receipt.status == 1 && !response.data.success) {
                XLGames.alert("Deposit Failed Please Contact CustomerService!");
            }
        } else {
            XLGames.alert("Deposit False!");
        }
    };

    let isFaceWalletLoggedIn = async () => {        
        return await face.auth.isLoggedIn();
    };

    let faceWalletLogin = async () => {
        let isLoggined = await isFaceWalletLoggedIn();
        
        if (isLoggined === true) {
            return true;
        }

        await face.auth.logout();

        if (!serverData.IsGoogle) {
            return await face.auth.directSocialLogin('google.com');
        }

        var faceSignature =
            await axios.get("/api/auth/face/signature")
                .catch((e) => {
                    if (e.response.status === 401) {
                        XLGames.alert("Please log in to Google", () => {
                            location.href = e.response.data;
                        })
                        return false;
                    } else {
                        alert(e.message);
                        return false;
                    }
                });
        
        if (faceSignature === false) {
            return false;
        }

        return await face.auth.loginWithIdToken({
            idToken: faceSignature.data.idToken,
            sig: faceSignature.data.signature
        });
    };

    let faceWalletLogout = async () => {
        axios.post("/api/auth/google/logout");
        return await face.auth.logout();
    }

    let faceWalletSendTransaction = async (wallet, amount) => {
        let sendAmount = ethers.utils.parseEther(amount.toString());

        let tx = await contract.transfer(wallet, sendAmount);
        let receipt = await tx.wait();

        return receipt;
    }

    let btnBsltClick = function (e) {
        let mode = e.srcElement.getAttribute("data-mode");
        if (mode == "deposit") {
            deposit();
        } else {
            withdraw();
        }
    }

    let checkInputAmount = function () {
        let element = document.getElementById("ip-amount");
        let amount = element.value;
    
        amount = (amount == "" || isNaN(amount)) ? 0 : parseInt(amount);

        amount = element.getAttribute("data-mode") == "deposit" ? checkDeposit(amount).amount : checkWithdraw(amount).amount
    
        element.value = amount;
    }

    let checkDeposit = function (amount) {

        let errMessage = amount > serverData.Balance ? dictionary.Insufficientbalance : "";

        document.getElementById("lbl-error").innerHTML = errMessage;
        document.getElementById("btn-bslt").disabled = ((errMessage != "") || amount <= 0);
    
        amount = amount >= serverData.Max ? serverData.Max - 1 : amount;

        document.getElementById("show-amount").innerHTML = amount > 0 ? customHelpers.localeDoubleSmall(amount) : customHelpers.localeDoubleSmall(0);

        return { amount: parseFloat(amount), errMessage: errMessage };
    }

    let checkWithdraw = function (amount) {

        if ((serverData.WithdrawAmount + amount) > serverData.Max) {
            amount = serverData.Max - serverData.WithdrawAmount;
        }

        let errMessage = amount < serverData.Min ? dictionary.withdrawAvailable.format(serverData.Min) : "";

        errMessage = amount > serverData.Balance ? dictionary.Insufficientbalance : errMessage;

        document.getElementById("lbl-error").innerHTML = errMessage;
        document.getElementById("btn-bslt").disabled = ((errMessage != "") || amount <= 0);

        document.getElementById("show-amount").innerHTML = (amount - serverData.Fee) > 0 ? customHelpers.localeDoubleSmall(amount - serverData.Fee) : customHelpers.localeDoubleSmall(0);
    
        return { amount: parseFloat(amount) , errMessage : errMessage };
    }

    let checkAmountSubmit = function (mode) {
        let element = document.getElementById("ip-amount");
        let amount = element.value;
    
        amount = (amount == "" || isNaN(amount)) ? 0 : parseInt(amount);

        let errMessage = mode == "deposit" ? checkDeposit(amount).errMessage : checkWithdraw(amount).errMessage;

        return { amount: amount, errMessage: errMessage };
    }

    let deposit = async function () {
        let result = await checkAmountSubmit("deposit");

        let depositToken = serverData.IsFaceWallet ? sendByFaceWallet : sendByTbora;

        if (result.errMessage != "") {
            alert(result.errMessage);
            return false;
        }
        XLGames.confirm(dictionary.confirmSubmit.format(customHelpers.localeDouble(result.amount)), async function () {
            document.getElementById("btn-bslt").disabled = true;
            document.getElementById("btn-bslt").innerHTML = "Processing...";

            await depositToken(result.amount);

            document.getElementById("ip-amount").disabled = true;
            document.getElementById("row-noti").innerHTML = "<strong>" + dictionary.refreshMessage + "</strong>";
            document.getElementById("btn-bslt").disabled = false;
            document.getElementById("btn-bslt").removeEventListener("click", btnBsltClick);
            document.getElementById("btn-bslt").innerHTML = "Refresh"
            document.getElementById("btn-bslt").addEventListener("click", function () {
                location.href = location.href;
            });
        });
    }

    let withdraw = async function () {
        let result = await checkAmountSubmit("withdraw");
    
        if (result.errMessage != "") {
            alert(result.errMessage);
            return false;
        }
        if (confirm(dictionary.confirmSubmit.format(customHelpers.localeDouble(result.amount)))) {
            document.getElementById("btn-bslt").disabled = true;
            document.getElementById("btn-bslt").innerHTML = "Processing..."
            let data = {
                amount: result.amount
            };

            let res = await axios.post(`/api/bslt/withdraw`, data).catch(function (error) {
                if (error.response.status == 405) {
                    location.href = location.href;
                }
            });

            setTimeout(() => {
                alert(res.data.message);
                location.href = location.href;
            }, 3000);
        }
    }

    document.getElementById("ip-amount").addEventListener('keypress', function (e) {
        if (e.which < 48 || e.which > 57) {
            e.preventDefault();
        }
    });

    document.getElementById("ip-amount").addEventListener('input', function (e) {
        checkInputAmount(e.srcElement);
    });

    document.getElementById("btn-copy").addEventListener("click", function () {
        copyText(serverData.Wallet);
    });

    document.getElementById("btn-bslt").addEventListener("click", btnBsltClick);
    
    document.getElementById("btn-facewallet")?.addEventListener("click", openFaceWalletHome);
});

