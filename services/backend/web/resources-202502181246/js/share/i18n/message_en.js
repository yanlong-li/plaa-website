'use strict';
(function ($m$$) {
    AL10N.Global = {
        accessDeniedInactive: $m$$("휴면 계정입니다."),
        accessDenied: $m$$("권한이 없습니다."),
        prepareOpen: $m$$("준비 중입니다."),
        overUploadMaxFileSize: $m$$("지원하는 업로드 용량을 초과했습니다."),
        overUploadMaxFileCount: $m$$("한 번에 최대 {0}장까지 추가 할 수 있습니다."),
        gameMgmt: $m$$("점검 중입니다."),
        cautionProcessStep: $m$$("이 페이지를 나가면 입력된 정보는 저장되지 않습니다."),
        gameRestrictions: $m$$("회원님의 계정은 게임 이용이 제한되었습니다.\n고객센터에 문의해 주세요."),
        gameInMaintenance: $m$$("게임 서비스 점검 중입니다.\n공지사항을 확인해 주세요."),
        gameTokenFail: $m$$("요청하신 정보를 처리하지 못하고 있습니다.\n잠시 후 다시 시도해 주세요."),
        gameTimeRestriction: $m$$(" 청소년보호법에 따라 00시부터 06시까지\n만 16세 미만의 청소년은 게임을 이용하실 수 없습니다."),
        accessDeniedRestricted: $m$$("You are not able to post or comment during homepage restriction. Please submit a ticket if there are any questions."),
        confirmCancel: $m$$("Do you want to cancel?"),
        confirmLeaving: $m$$("The content has been corrected. Would you like to go out anyway?"),
        forbidden: $m$$("No authority."),
        loginRequired: $m$$("Please login."),
        reqCs: $m$$("Please, contact customer support."),
        reqAgree: $m$$("For use of service, agreement to Terms of Service is required after game start."),
        reqWalletVerification: $m$$("All service is available after completing wallet verification.")
    };
    AL10N.Browser = {
        closeMsg: $m$$("I will not download the browser."),
        notSupport: $m$$("Browser not supported."),
        useNewer: $m$$("Please use lateset version.")
    };
    AL10N.Attachment = {
        confirmCdnDelDir: $m$$("Deletion Failed.\x3cbr\x3eTo delete the directory, you have to delete all files in the directory."),
        confirmDel: $m$$("Are you sure you want to delete?"),
        confirmDelImg: $m$$("Do you want to delete the image?"),
        confirmPurge: $m$$("Would you like to purge?"),
        filesizeWarn: $m$$("You can register image file up to {0}MB."),
        imageWarn: $m$$("You can only upload image files with the type of jpg, jpeg, gif, png."),
        maxFile: $m$$("You can add up to 5 files.")
    };
    AL10N.MultiFile = {
        browseDesc: $m$$("Click the Browse button to register the image file"),
        description: $m$$("Drag \x26 Drop Image Files Here."),
        title: $m$$("Add PC Image")
    };
    AL10N.Button = {
        cancel: $m$$("Cancel"),
        deleteFile: $m$$("Delete"),
        findFile: $m$$("Browse"),
        ok: $m$$("Ok"),
        registering: $m$$("ing..."),
        save: $m$$("Save"),
    };
    AL10N.MultiBoard = {
        confirmCommentDelete: $m$$("Do you want to delete?"),
        confirmDelete: $m$$("Do you want to delete?"),
        errorOnDelete: $m$$("Error while deleting."),
        requireCategory: $m$$("Please select the category."),
        requireContents: $m$$("Please type the content in {0} or more and {1} or fewer letters."),
        requirePcImageUpload: $m$$("Please attach image file on PC."),
        requireTitle: $m$$("Please enter title between {0} and {1} letters.")
    };
    AL10N.Comment = {
        confirmDel: $m$$("Are you sure you want to delete?"),
        contentsLength: $m$$("Please type the content in {0} or more and {1} or fewer letters.")
    };
    AL10N.Search = {
        keywordEmpty: $m$$("Please enter key words."),
        keywordOverlength: $m$$("You can't type more than {0} letters."),
        keywordRequired: $m$$("Please type {0} or more letters.")
    };
    AL10N.Inquiry = {
        confirmCancel: $m$$("Do you want to cancel the ticket?"),
        maxLength: $m$$("You can't type more than {0} letters."),
        minLength: $m$$("Please type {0} or more letters."),
        rangeLengthByType: $m$$("Please type {label} between {0} and {1} letters."),
        requireByType: $m$$("Please enter {0}."),
        selectCategory: $m$$("Select category"),
        validAttachFile: $m$$("You can only add the file with the type of jpg, jpeg, gif, png, txt."),
        warningAttach: $m$$("You can only add the file with the type of jpg, jpeg, gif, png, txt."),
        requireGameServer: $m$$("Please enter your server name.")
    };
    AL10N.NickName = {
        invalid: $m$$("The nickname is not available."),
        required: $m$$("Please choose a nickname."),
        limitLength: $m$$("You can use Thai, English between 3 to 15 characters, or Traditional Chinese between 2 to 6 characters.")
    };
    AL10N.WikiEditor = {
        hypherlinkTitle: $m$$("Hyperlinks"),
        hypherlinkDesc: $m$$("Enter the URL for the link"),
        fontTitle: $m$$("Select font color"),
        tableTitle: $m$$("Creating a Table"),
        tableDesc: $m$$("Please fill the rows and columns"),
        tableRow: $m$$("Row"),
        tableColumn: $m$$("Column"),
        tableThLabel: $m$$("Title"),
        tableTdLabel: $m$$("Contents")
    };
    AL10N.HelperMsg = {
        "transfer.label.world.INOK": $m$$("INOK"),
        "transfer.label.world.NAIMA": $m$$("NAIMA"),
        "character.race.NUIAN": $m$$("NUIAN"),
        "character.race.ELF": $m$$("ELF"),
        "character.race.HARIHARAN": $m$$("HARIHARAN"),
        "character.race.FERRE": $m$$("FERRE"),
        "character.race.DWARF": $m$$("DWARF"),
        "character.race.WARBORN": $m$$("WARBORN"),
        "character.faction.NUIA": $m$$("NUIA"),
        "character.faction.HARIHARA": $m$$("HARIHARA")
    };
    AL10N.Minting = {
        disallowBot: $m$$("Minting is already in progress. Please try again after few minutes."),
        expireDate: $m$$("We're sorry. Minting is not open at this time."),
        overTotalCount: $m$$("We're sorry. All NFTs have now been minted."),
        overCountPerAccount: $m$$("The maximum number of mint participation has been exceeded."),
        duplicated: $m$$("The maximum number of mint participation has been exceeded."),
        notWhiteList: $m$$("You are not allowed to mint."),
        connectWallet: $m$$("Please connect your wallet."),
        failure: $m$$("Minting failed. Thank you for your participation."),
        success: $m$$("Minting succeed. Thank you for your participation."),
        checkoutPlugin: $m$$("Please check the current status of the Wallet Extension."),
        installed: $m$$("MetaMask is installed."),
        needInstall: $m$$('\x3ca href\x3d"https://metamask.io/download" target\x3d"_blank"\x3ePlease install MetaMask.\x3c/a\x3e'),
        needInstallMobile: $m$$('\x3ca href\x3d"https://metamask.app.link/dapp/' +
            location.hostname + '"\x3ePlease install MetaMask.\x3c/a\x3e'),
        nopaid: $m$$("There is no payment transaction."),
        differentSender: $m$$("Invalid request."),
        progress: $m$$("Minting in progress."),
        confirmMsg: $m$$("When the wallet window appears, please confirm or reject."),
        warningF5: $m$$("Caution! It may be difficult to participate in minting if you refresh a page(F5)."),
        exception: $m$$("An error has occurred. please try again."),
        seeMintingDate: $m$$("Please check the minting schedule."),
        hasPaymentInfoCall: $m$$("There is information in the process of payment.\nPlease check your wallet"),
        selectWallet: $m$$("Please choose your wallet."),
        selectWalletLabel: $m$$("Choose Your Wallet"),
        notSupportMobile: $m$$("Mobile is not support.\nPlease use PC."),
        needInstallKaikas: $m$$('\x3ca href\x3d"https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi" target\x3d"_blank"\x3ePlease install Kaikas.\x3c/a\x3e'),
        reconnectWallet: $m$$("Please reconnect your wallet."),
        invalidNetwork: $m$$("The network is invalid."),
        illegalAccess: $m$$("Illegal access"),
        txError: $m$$("Minting failed. (tx error)"),
        unknownError: $m$$("Minting failed. (unknown error)"),
        klaytnError: $m$$("Minting failed. ({0})"),
        polygonError: $m$$("Minting failed. ({0})"),
        userDenied: $m$$("User denied transaction signature"),
        cancelFail: $m$$("Minting cancel ignored."),
        cancelPending: $m$$("Failed to verify minting result.\nMint transaction may be pending.\nClick the OK button to check the transaction by PolygonScan.")
    };
    AL10N.Wallet = {
        metamask: $m$$("MetaMask"),
        kaikas: $m$$("Kaikas"),
        facewallet: $m$$("Facewallet"),
        needInstall: $m$$("Please install MetaMask."),
        connectWallet: $m$$("Please connect your wallet."),
        checkoutPlugin: $m$$("Please check the currenct status of the MetaMask Extension."),
        differentSender: $m$$("Invalid request."),
        differentAddress: $m$$("Authenticated address is different"),
        exception: $m$$("An error has occurred. please try again."),
        invalidNetwork: $m$$("The network is invalid."),
        duplicateWallet: $m$$("The address has already been used by someone else."),
        connectBtn: $m$$("Connect wallet"),
        signMessage: $m$$("XLGAMES Global(ArcheWorld) requests authentication.\nThis request will not trigger a blockchain transaction or any payment.\nWallet address: {0}"),
        reqAuthAddress: $m$$("Wallet address not verified in XLGAMES."),
        useBrowser: $m$$("Please use the latest version of Chrome or Edge browser.")
    };
    AL10N.Discord = {
        connectWallet: $m$$("Please connect your wallet."),
        needInstall: $m$$("Please install Wallet extension."),
        checkoutPlugin: $m$$("Please check the current status of the Wallet Extension."),
        walletSelect: $m$$("지갑 선택"),
        invalidNetwork: $m$$("The network is invalid."),
        duplicateWallet: $m$$("The address has already been used by someone else."),
        verifyHolder: $m$$("The holder role has been granted."),
        revokeHolder: $m$$("The holder role has been revoked because you do not have any cards."),
        resetAddress: $m$$("The wallet address is initialized, and the Holder role is revoked."),
        illegalAccess: $m$$("Illegal access")
    };
    AL10N.Keyvisual = {preeventClosed: $m$$("Pre-registration closed")};
    AL10N.Nft = {btnOpen: $m$$("Open +"), btnClose: $m$$("Close -")};
    AL10N.Staking = {
        stakeable: $m$$("Stakeable"),
        staked: $m$$("Staked"),
        autoExtended: $m$$("Auto Extended"),
        autoExtend: $m$$("Auto Extend"),
        autoExtension: $m$$("Auto Extension"),
        thisMonth: $m$$("This Month"),
        untilCancel: $m$$("Continue staking until cancellation"),
        endThisMonth: $m$$("Staking is cancelled on the last day of this month"),
        complete: $m$$("Complete"),
        confirm: $m$$("Confirm"),
        staking: $m$$("Staking"),
        balance: $m$$("Balance"),
        cancelExtension: $m$$("Cancel Extension"),
        dailyPoints: $m$$("Daily Points"),
        totalPoints: $m$$("Total Points"),
        exchangeGift: $m$$("Point exchange gift"),
        btnExchange: $m$$("Exchange"),
        emptyNft: $m$$("You don't have Fandom Card"),
        emptyDispalyNft: $m$$("No NFTs to display"),
        normal: $m$$("Normal"),
        rare: $m$$("Rare"),
        purchasedMarket: $m$$("Fandom Cards can be purchased in a Marketplace"),
        selectDuration: $m$$("Select duration"),
        selectRegion: $m$$("Select region"),
        confirmExchange: $m$$("Would you exchange {0} points for a Special Costume Box?"),
        completed: $m$$("Completed"),
        tryAgain: $m$$("Request not completed. Please try again."),
        exchangeComplete: $m$$("A Special Costume Box coupon has been issued. Please check Coupon menu."),
        insufficientPoints: $m$$("Insufficient points")
    }
})(XLGames.Localization.message);