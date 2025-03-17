'use strict';
(function ($m$$) {
    AL10N.Global = {
        accessDenied: $m$$("권한이 없습니다."),
        accessDeniedCancelingUser: $m$$("회원탈퇴 신청 상태입니다."),
        accessDeniedChannelCancelingUser: $m$$("게임해지 신청 상태입니다."),
        accessDeniedNotCertifiedUser: $m$$("본인확인이 완료되지 않았습니다.\n[내정보] 메뉴에서 본인확인 후 이용할 수 있습니다."),
        accessDeniedPreserveUser: $m$$("비정상적인 접속 또는 계정도용이 의심되어 임시로 계정을 제한합니다."),
        accessDeniedRestricted: $m$$("You are not able to post or comment during homepage restriction. Please submit a ticket if there are any questions."),
        accessDeniedStealUser: $m$$("계정도용으로 신고된 상태입니다."),
        cautionProcessStep: $m$$("이 페이지를 나가면 입력된 정보는 저장되지 않습니다."),
        confirmCancel: $m$$("Do you want to cancel?"),
        confirmLeaving: $m$$("The content has been corrected. Would you like to go out anyway?"),
        forbidden: $m$$("No authority."),
        gameInMaintenance: $m$$("게임 서비스 점검 중입니다.\n공지사항을 확인해 주세요."),
        gameMgmt: $m$$("점검 중입니다."),
        gameRestrictions: $m$$("회원님의 계정은 게임 이용이 제한되었습니다.\n고객센터에 문의해 주세요."),
        gameTokenFail: $m$$("요청하신 정보를 처리하지 못하고 있습니다.\n잠시 후 다시 시도해 주세요."),
        imageMaxFileSize: $m$$("이미지 파일은 최대 3MB까지 등록할 수 있습니다."),
        loginRequired: $m$$("Please login."),
        overUploadMaxFileCount: $m$$("한 번에 최대 {0}장까지 추가 할 수 있습니다."),
        overUploadMaxFileSize: $m$$("지원하는 업로드 용량을 초과했습니다."),
        prepareOpen: $m$$("준비 중입니다."),
        reqAgree: $m$$("For use of service, agreement to Terms of Service is required after game start."),
        reqCs: $m$$("Please, contact customer support."),
        restrictedAccount: $m$$("아키월드 이용이 제한된 상태입니다.\n고객센터에 문의해 주세요."),
        accessDeniedGuardianAgreeWaitUser: $m$$("보호자 미동의 상태입니다."),
        accessDeniedNotCertifiedOldUser: $m$$("미인증 계정으로 제한된 계정입니다."),
        accessDeniedInactive: $m$$("휴면 계정입니다."),
        tryagain: $m$$("다시 진행해 주세요."),
        loginFailTrayAgain: $m$$("로그인에 실패했습니다. 다시 시도해주세요."),
        defaultErrorMessage: "시스템 오류입니다. 관리자에게 문의해 주십시오!"
    };
    AL10N.Browser = {
        closeMsg: $m$$("I will not download the browser."),
        notSupport: $m$$("Browser not supported."),
        useNewer: $m$$("Please use lateset version.")
    };
    AL10N.Attachment =
        {
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
        description: $m$$("Drag \x26 Drop Image Files Here."), title: $m$$("Add PC Image")
    };
    AL10N.Button = {
        cancel: $m$$("Cancel"),
        deleteFile: $m$$("Delete"),
        findFile: $m$$("Browse"),
        ok: $m$$("Ok"),
        registering: $m$$("ing..."),
        save: $m$$("Save"),
        close: $m$$("Close")
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
    AL10N.Vote = {requiredOwnerArticle: $m$$("본인글은 투표할 수 없습니다."), alredyVoted: $m$$("이미 투표하셨습니다.")};
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
    AL10N.Weblauncher = {
        install: $m$$("런처를 설치해 주세요."),
        reqInstall: $m$$("게임을 실행하려면 런처를 설치해야 합니다."),
        downloadAndInstall: $m$$("런처를 설치하지 않았으면, 수동 다운로드를 클릭해 런처를 설치해 주세요."),
        btnDownload: $m$$("수동 다운로드"),
        requestCs: $m$$("설치 및 시작에 문제가 지속되면 문의해 주세요."),
        btnCs: $m$$("고객센터"),
        alreadyInstallMsg: $m$$("이미 런처를 설치해서 다시 알릴 필요가 없어요."),
        closeMsg: $m$$("다시 알리지 않음"),
        notSupportOs: $m$$("지원하지 않는 OS입니다!")
    };
    AL10N.Wallet = {
        connectWallet: $m$$("지갑을 연결해 주세요."),
        checkoutPlugin: $m$$("MetaMask 확장 프로그램 상태를 확인해주세요."),
        installed: $m$$("MetaMask가 설치되었습니다."),
        needInstall: $m$$("MetaMask를 설치해 주세요."),
        differentAddress: $m$$("인증된 address가 다릅니다"),
        exception: $m$$("오류가 발생했습니다. 다시 시도해주세요."),
        invalidNetwork: $m$$("지갑의 네트워크가 다릅니다."),
        duplicateWallet: $m$$("다른 사람에게 이미 사용된 지갑입니다."),
        connectBtn: $m$$("지갑 연결"),
        signMessage: $m$$("엑스엘게임즈 글로벌회원(아키월드)에서 서명 인증을 진행합니다.\n이 서명은 블록체인 거래, 비용 소모가 발생하지 않습니다.\n 지갑 주소: {0}"),
        reqAuthAddress: $m$$("XLGAMES에 인증된 지갑주소가 아닙니다."),
        useBrowser: $m$$("최신버전의 chrome 또는 edge 브라우저를 이용해주세요."),
        notSupportMobile: $m$$("모바일은 지원하지 않습니다.\nPC에서 이용해 주세요.")
    };
    AL10N.Member = {
        requiredName: $m$$("성명을 입력해 주세요."),
        invalidName: $m$$("정확한 성명을 입력해 주세요."),
        requiredUsername: $m$$("아이디를 입력해 주세요."),
        requiredSsn: $m$$("주민등록번호를 입력해 주세요."),
        requiredSsnAgree: $m$$("주민등록번호 수집 및 이용에 동의해 주세요."),
        requiredCancelAnswer: $m$$("회원탈퇴이유를 입력해 주세요."),
        maxlengthCancelAnswer: $m$$("최대 200자까지 입력할 수 있습니다."),
        requiredAnswer: $m$$("답변을 입력해 주세요."),
        requiredPassword: $m$$("비밀번호를 입력해 주세요."),
        requiredCurrentPassword: $m$$("현재비밀번호를 입력해 주세요."),
        requiredNewPassword: $m$$("새비밀번호를 입력해 주세요."),
        requiredNewPasswordConfirm: $m$$("새비밀번호를 한번 더 입력해 주세요."),
        requiredEmail: $m$$("이메일 주소를 입력해 주세요."),
        confirmUserAgree: $m$$("이용약관에 동의해 주세요."),
        confirmPersonalAgree: $m$$("개인정보처리방침을 확인 후 동의해 주세요."),
        confirmPersonalTrustAgree: $m$$("개인정보 취급 위탁에 대해 동의해 주세요."),
        conrirmUserAgeeeAndPersonalAgree: $m$$("글로벌 서비스 약관 및 개인정보취급방침을 확인 후 동의해 주세요."),
        requiredBirthDate: $m$$("생년월일을 입력해 주세요."),
        invalidBirthDate: $m$$("정확한 법정 생년월일을 입력해 주세요."),
        requiredConfirmPassword: $m$$("비밀번호를 한번 더 입력해주세요."),
        confirmPassword: $m$$("입력한 비밀번호와 다릅니다."),
        confirmOldPassword: $m$$("현재 비밀번호와 새 비밀번호가 동일합니다.\x3cbr /\x3e다른 비밀번호를 입력해 주세요."),
        requiredCaptcha: $m$$("체크 박스를 선택해 주세요."),
        invalidCaptchaFormat: $m$$("체크 박스를 선택해 주세요."),
        invalidEmail: $m$$("정확한 이메일을 입력해 주세요."),
        requiredPhoneNo: $m$$("연락처를 입력해 주세요."),
        invalidPhone: $m$$("정확한 연락처를 입력해 주세요."),
        invalidFirstPhoneNo: $m$$("정확한 연락처를 입력해 주세요."),
        invalidFirstMobilePhoneNo: $m$$("정확한 휴대폰 번호를 입력해 주세요."),
        requiredMobilePhoneNo: $m$$("휴대폰 번호를 입력해 주세요."),
        problemDuringMobileAuth: $m$$("인증 과정에 문제가 생겼습니다."),
        exceedDailyPhoneAuthCount: $m$$("인증 가능 횟수가 초과되었습니다."),
        timeoutPhoneAuth: $m$$("인증 가능한 시간이 초과되었습니다. 다시 시도해 주세요."),
        invalidPhoneAuthNumber: $m$$("인증번호를 입력해 주세요."),
        maxLengthPhoneAuthNumber: $m$$("6자리 인증번호를 입력하세요."),
        phoneAuthNumberMismatch: $m$$("인증번호가 일치하지 않습니다."),
        minlengthPassword: $m$$("입력하신 비밀번호가 8자 미만입니다.\x3cbr/\x3e8~16자의 영문, 숫자, 특수문자를 혼용 할 수 있습니다."),
        maxlengthPassword: $m$$("입력하신 비밀번호가 16자 초과입니다.\x3cbr/\x3e8~16자의 영문, 숫자, 특수문자를 혼용 할 수 있습니다."),
        invalidSsn: $m$$("정확한 주민등록번호를 입력해 주세요."),
        invalidUserIdFormat: $m$$("아이디는 4~12자의 영문 소문자, 숫자를 사용할 수 있습니다. \x3cbr /\x3e단, 숫자만 사용할 수는 없습니다."),
        invalidUserIdAuthentification: $m$$("오류가 발생했으니 다시 본인 인증 후 가입해 주세요."),
        invalidPasswordFormat: $m$$("비밀번호는 8~16자이고, 영문, 숫자, 특수문자\x3cbr/\x3e하나씩을 포함해야 사용할 수 있습니다."),
        invalidEmailFormat: $m$$("정확한 이메일 주소를 입력해 주세요."),
        invalidEmailFormatAuth: $m$$("입력한 이메일 형식이 바르지 않습니다. 확인 후 다시 눌러주세요."),
        sentAuthMail: $m$$("인증 메일을 발송했습니다. 인증 메일은 24시간 동안 인증할 수 있습니다."),
        sentFirstAuthMail: $m$$("계정만들기를 완료하면 입력한 이메일로 인증 메일이 발송됩니다.\x3cbr/\x3e인증 메일은 24시간 동안 인증할 수 있습니다."),
        invalidAnswerInput: $m$$("본인확인 답변은 10자까지 입력할 수 있습니다."),
        requiredAuthAnswer: $m$$("본인확인 답변을 입력해 주세요."),
        requiredAuthQuestion: $m$$("본인확인 질문을 입력해 주세요."),
        invalidAuthQuestionFormat: $m$$("본인확인 질문을 2~12자 입력해 주세요."),
        notAuthenticatedEmail: $m$$("회원정보에서 이메일 인증을 받지 않은 아이디입니다."),
        failIdentification: $m$$("에러코드 : {0}\n자세한 사항은 고객센터 1:1 문의 또는\n1566-0550(전국공통)으로 문의해 주세요."),
        notExistedAccountId: $m$$("가입하지 않은 아이디입니다."),
        confirmProtectorAgree: $m$$("자녀의 개인정보 수집/이용 및 게임 이용에 동의해 주세요."),
        confirmUniqueAgree: $m$$("보호자의 개인정보 수집 및 이용에 동의해 주세요."),
        requiredValidTerm: $m$$("유효기간을 선택해 주세요."),
        requiredCertificatePhoneNo: $m$$("전화번호를 입력해 주세요."),
        requiredCertificateConfirmPhoneNo: $m$$("전화번호 확인을 해주세요."),
        invalidCertificatePhoneNo: $m$$("정확한 전화번호를 입력해 주세요."),
        mismatchCertificatePhoneNo: $m$$("전화번호가 일치하지 않습니다."),
        cautionProcessStep: $m$$("이 페이지를 나가면 입력된 정보는 저장되지 않습니다."),
        requiredCancelConfirm: $m$$("위 내용을 확인하고 동의해 주세요."),
        requiredAccountIds: $m$$("아이디를 선택해 주세요."),
        resendAuthEmail: $m$$("인증 메일을 재발송했습니다."),
        joinResendAuthEmailFail: $m$$("인증 메일 재발송에 실패했습니다.\n해당 이메일 주소가 수신 가능한지 확인해 주세요."),
        transIdResendAuthEmailFail: $m$$("인증 메일 재발송에 실패했습니다.\n해당 이메일 주소가 수신 가능한지 확인해 주세요."),
        passwordByEmail: $m$$("인증 메일이 발송되었습니다.\n24시간 내에 인증을 완료하지 못하면, 해당 인증은 자동으로 폐기됩니다."),
        invalidPasswordByEmail: $m$$("지갑인증을 완료하지 않은 아이디를 입력해 주세요."),
        needPhoneAuthCheck: $m$$("휴대폰 소유인증을 해주세요."),
        requiredLogout: $m$$("로그아웃 후 이용해 주세요")
    };
    AL10N.EmailAuth = {
        invalidAuthCode: $m$$("올바른 인증번호를 입력해 주세요."),
        mismatchAndExpireAuthCode: $m$$("인증번호가 일치하지 않거나 유효기간이 지났습니다."),
        resendFail: $m$$("인증 메일 발송에 실패했습니다.\n잠시 후 다시 시도해 주세요."),
        resendComplete: $m$$("인증 메일이 정상적으로 발송되었습니다.")
    };
    AL10N.Btn = {
        cancel: $m$$("취소"),
        deleteFile: $m$$("삭제"),
        findFile: $m$$("찾아보기"),
        ok: $m$$("확인"),
        registering: $m$$("처리중"),
        save: $m$$("저장"),
        emailVerification: $m$$("이메일 인증"),
        inprogress: $m$$("처리중"),
        authenticating: $m$$("인증하기")
    };
    AL10N.Bora = {
        READY: $m$$("BORA POTAL 연결중"),
        CONNECTED_USER: $m$$("BORA POTAL에 연동된 유저가 연결 시도"),
        CONNECTED_WALLET: $m$$("BORA POTAL에 연동된 지갑으로 연결 시도"),
        EXPIRED: $m$$("연결 시간 만료"),
        exception: $m$$("오류가 발생했습니다. 다시 시도해주세요.")
    }
})(XLGames.Localization.message);