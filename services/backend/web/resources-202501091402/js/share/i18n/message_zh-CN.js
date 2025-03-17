'use strict';
(function ($m$$) {
    AL10N.Global = {
        accessDenied: $m$$("没有权限。"),
        accessDeniedCancelingUser: $m$$("会员退会正在进行中。"),
        accessDeniedChannelCancelingUser: $m$$("游戏服务取消正在进行中。"),
        accessDeniedNotCertifiedUser: $m$$("钱包验证尚未完成。\n请在[编辑账户信息]中完成钱包验证。"),
        accessDeniedPreserveUser: $m$$("我们检测到您的账户存在可疑活动，已暂时锁定该账户。"),
        accessDeniedRestricted: $m$$("在主页限制期间，您无法发布或评论。如有任何问题，请提交工单。"),
        accessDeniedStealUser: $m$$("该账户已被报告为被盗账户。"),
        cautionProcessStep: $m$$("如果您离开此页面，未保存的信息将被删除。"),
        confirmCancel: $m$$("您确定要取消吗？"),
        confirmLeaving: $m$$("内容已被修正，您仍然要离开吗？"),
        forbidden: $m$$("没有权限。"),
        gameInMaintenance: $m$$("游戏服务正在维护中。\n请查看公告。"),
        gameMgmt: $m$$("我们正在进行维护。"),
        gameRestrictions: $m$$("您的账户已被限制。\n请联系客户支持。"),
        gameTokenFail: $m$$("抱歉，我们无法处理您的请求。\n请稍后再试。"),
        imageMaxFileSize: $m$$("您可以上传最多 3MB 的图像文件。"),
        loginRequired: $m$$("请登录。"),
        overUploadMaxFileCount: $m$$("一次最多可以添加 {0} 页。"),
        overUploadMaxFileSize: $m$$("文件超过最大上传大小。"),
        prepareOpen: $m$$("准备中"),
        reqAgree: $m$$("使用服务需要同意服务条款，游戏开始后需要同意。"),
        reqCs: $m$$("请联系客户支持。"),
        restrictedAccount: $m$$("您的 ArcheWorld 访问权限已被限制。\n请联系客户支持。"),
        accessDeniedGuardianAgreeWaitUser: $m$$("监护人未同意。"),
        accessDeniedNotCertifiedOldUser: $m$$("未认证的账户，受限账户。"),
        accessDeniedInactive: $m$$("休眠账户。"),
        tryagain: $m$$("请重新尝试。"),
        loginFailTrayAgain: $m$$("登录失败，请重试。"),
        defaultErrorMessage: "系统错误，请联系管理员！"
    };
    AL10N.Browser = {
        closeMsg: $m$$("我不会下载这个浏览器。"),
        notSupport: $m$$("浏览器不支持。"),
        useNewer: $m$$("请使用最新版本。")
    };
    AL10N.Attachment = {
        confirmCdnDelDir: $m$$("删除失败。<br>要删除该目录，您必须先删除目录中的所有文件。"),
        confirmDel: $m$$("您确定要删除吗？"),
        confirmDelImg: $m$$("您确定要删除这张图片吗？"),
        confirmPurge: $m$$("您确定要清除吗？"),
        filesizeWarn: $m$$("您最多可以上传 {0}MB 的图片文件。"),
        imageWarn: $m$$("您只能上传 jpg、jpeg、gif、png 格式的图片文件。"),
        maxFile: $m$$("您最多可以添加 5 个文件。")
    };
    AL10N.MultiFile = {
        browseDesc: $m$$("点击浏览按钮以注册图片文件"),
        description: $m$$("拖拽图片文件到这里。"),
        title: $m$$("添加PC图片")
    };
    AL10N.Button = {
        login: $m$$("登录"),
        cancel: $m$$("取消"),
        deleteFile: $m$$("删除"),
        findFile: $m$$("浏览"),
        ok: $m$$("确定"),
        registering: $m$$("正在注册..."),
        save: $m$$("保存"),
        close: $m$$("关闭")
    };
    AL10N.MultiBoard = {
        confirmCommentDelete: $m$$("您确定要删除吗？"),
        confirmDelete: $m$$("您确定要删除吗？"),
        errorOnDelete: $m$$("删除时出错。"),
        requireCategory: $m$$("请选择类别。"),
        requireContents: $m$$("请在 {0} 到 {1} 个字之间输入内容。"),
        requirePcImageUpload: $m$$("请附加 PC 上的图片文件。"),
        requireTitle: $m$$("请输入 {0} 到 {1} 个字之间的标题。")
    };
    AL10N.Comment = {
        confirmDel: $m$$("您确定要删除评论吗？"),
        contentsLength: $m$$("请在 {0} 到 {1} 个字之间输入内容。"),
        deleteFailure: $m$$("删除评论失败。"),
        deleteNotOwner: $m$$("不是作者。")
    };
    AL10N.Search = {
        keywordEmpty: $m$$("请输入关键词。"),
        keywordOverlength: $m$$("不能输入超过 {0} 个字母。"),
        keywordRequired: $m$$("请输入 {0} 个或更多字母。")
    };
    AL10N.Inquiry = {
        confirmCancel: $m$$("您确定要取消工单吗？"),
        maxLength: $m$$("您不能输入超过 {0} 个字母。"),
        minLength: $m$$("请输入 {0} 个或更多字母。"),
        rangeLengthByType: $m$$("请输入 {label}，长度在 {0} 和 {1} 之间。"),
        requireByType: $m$$("请输入 {0}。"),
        selectCategory: $m$$("选择类别"),
        validAttachFile: $m$$("您只能添加 jpg、jpeg、gif、png、txt 格式的文件。"),
        warningAttach: $m$$("您只能添加 jpg、jpeg、gif、png、txt 格式的文件。"),
        requireGameServer: $m$$("请输入您的服务器名称。")
    };
    AL10N.Vote = {
        requiredOwnerArticle: $m$$("不能对自己的文章进行投票。"),
        alredyVoted: $m$$("您已经投过票了。")
    };
    AL10N.NickName = {
        invalid: $m$$("该昵称不可用。"),
        required: $m$$("请选择一个昵称。"),
        limitLength: $m$$("您可以使用3到15个字符的泰文、英文，或2到6个字符的繁体中文。")
    };
    AL10N.WikiEditor = {
        hypherlinkTitle: $m$$("超链接"),
        hypherlinkDesc: $m$$("请输入链接的 URL"),
        fontTitle: $m$$("选择字体颜色"),
        tableTitle: $m$$("创建表格"),
        tableDesc: $m$$("请填写行和列"),
        tableRow: $m$$("行"),
        tableColumn: $m$$("列"),
        tableThLabel: $m$$("标题"),
        tableTdLabel: $m$$("内容")
    };
    AL10N.HelperMsg = {
        "transfer.label.world.INOK": $m$$("INOK"),
        "transfer.label.world.NAIMA": $m$$("NAIMA"),
        "character.race.NUIAN": $m$$("诺亚"),
        "character.race.ELF": $m$$("精灵"),
        "character.race.HARIHARAN": $m$$("哈里兰"),
        "character.race.FERRE": $m$$("兽灵"),
        "character.race.DWARF": $m$$("矮人"),
        "character.race.WARBORN": $m$$("战魔"),
        "character.faction.NUIA": $m$$("诺伊亚联盟"),
        "character.faction.HARIHARA": $m$$("哈里拉联盟")
    };
    AL10N.Weblauncher = {
        install: $m$$("请安装启动器。"),
        reqInstall: $m$$("请先安装启动器以运行游戏。"),
        downloadAndInstall: $m$$("请点击手动下载按钮安装启动器。"),
        btnDownload: $m$$("手动下载"),
        requestCs: $m$$("如果在安装或启动游戏时遇到任何问题，请联系我们。"),
        btnCs: $m$$("联系客服"),
        alreadyInstallMsg: $m$$("我已经安装了启动器。不要再显示此消息。"),
        closeMsg: $m$$("不要再显示此消息。"),
        notSupportOs: $m$$("操作系统不受支持。")
    };
    AL10N.Wallet = {
        needInstall: $m$$("请安装 MetaMask。"),
        connectWallet: $m$$("请连接您的钱包。"),
        checkoutPlugin: $m$$("请检查 MetaMask 插件的当前状态。"),
        differentSender: $m$$("无效的请求。"),
        differentAddress: $m$$("认证地址不同"),
        exception: $m$$("发生错误，请重试。"),
        invalidNetwork: $m$$("网络无效。"),
        duplicateWallet: $m$$("该地址已被其他人使用。"),
        connectBtn: $m$$("连接钱包"),
        signMessage: $m$$("XLGAMES Global(ArcheWorld) 请求认证。\n此请求不会触发区块链交易或任何支付。\n钱包地址：{0}"),
        reqAuthAddress: $m$$("钱包地址尚未在 XLGAMES 中验证。"),
        useBrowser: $m$$("请使用最新版本的 Chrome 或 Edge 浏览器。"),
        notSupportMobile: $m$$("不支持移动设备。\n请使用 PC。"),
    };
    AL10N.Region = {
        "Layertitle": $m$$('区服选择'),
        "Layerdesc": $m$$('在所选区域玩游戏并存入BSLT。'),
        "Buttonok": $m$$('确定'),
        "zh-CN": $m$$("简体中文"),
        "en": $m$$("English"),
        'ASIA': $m$$('亚洲'),
        'NASA': $m$$('北美/南美')
    };
    AL10N.Member = {
        requiredName: $m$$("请输入姓名。"),
        invalidName: $m$$("请输入正确的姓名。"),
        requiredUsername: $m$$("请输入有效的电子邮件地址。"),
        requiredSsn: $m$$("请输入居民登记号码。"),
        requiredSsnAgree: $m$$("请同意居民登记号码的收集和使用。"),
        requiredCancelAnswer: $m$$("请输入注销理由以完成会员退出。"),
        maxlengthCancelAnswer: $m$$("最多可输入 200 个字符。"),
        requiredAnswer: $m$$("请输入答案。"),
        requiredPassword: $m$$("请输入密码。"),
        requiredCurrentPassword: $m$$("请输入当前密码。"),
        requiredNewPassword: $m$$("请输入新密码。"),
        requiredNewPasswordConfirm: $m$$("请重新输入密码。"),
        requiredEmail: $m$$("请输入电子邮件地址。"),
        confirmUserAgree: $m$$("请同意服务条款。"),
        confirmPersonalAgree: $m$$("请阅读并同意隐私政策。"),
        confirmPersonalTrustAgree: $m$$("请确认您同意我们的服务条款和隐私政策。"),
        conrirmUserAgreeAndPersonalAgree: $m$$("请进行钱包验证或手机钱包验证，以获取完整服务访问权限。"),
        requiredBirthDate: $m$$("请输入出生日期。"),
        invalidBirthDate: $m$$("请输入正确的法定出生日期。"),
        requiredConfirmPassword: $m$$("请重新输入密码。"),
        confirmPassword: $m$$("密码不匹配。"),
        confirmOldPassword: $m$$("当前密码与新密码相同。<br>请输入不同的密码。"),
        requiredCaptcha: $m$$("请勾选复选框。"),
        invalidCaptchaFormat: $m$$("请勾选复选框。"),
        invalidEmail: $m$$("请输入有效的电子邮件地址。"),
        requiredPhoneNo: $m$$("请输入联系电话。"),
        invalidPhone: $m$$("请输入正确的联系电话。"),
        invalidFirstPhoneNo: $m$$("请输入正确的联系电话。"),
        invalidFirstMobilePhoneNo: $m$$("请输入正确的手机号码。"),
        requiredMobilePhoneNo: $m$$("请输入手机号码。"),
        problemDuringMobileAuth: $m$$("认证过程中发生问题。"),
        exceedDailyPhoneAuthCount: $m$$("已超出当天认证次数。"),
        timeoutPhoneAuth: $m$$("认证时间已超时，请重试。"),
        invalidPhoneAuthNumber: $m$$("请输入有效的验证码。"),
        maxLengthPhoneAuthNumber: $m$$("请输入有效的验证码。"),
        phoneAuthNumberMismatch: $m$$("验证码不匹配。"),
        minlengthPassword: $m$$("密码必须包含 8-16 个字符，并包括数字、字母或特殊字符。"),
        maxlengthPassword: $m$$("密码必须包含 8-16 个字符，并包括数字、字母或特殊字符。"),
        invalidSsn: $m$$("请输入正确的居民登记号码。"),
        invalidUserIdFormat: $m$$("用户名必须由 4-12 个小写字母或数字组成，且不能仅由数字组成。<br />"),
        invalidUserIdAuthentification: $m$$("发生错误，请重新进行身份认证后再注册。"),
        invalidPasswordFormat: $m$$("密码必须包含 8-16 个字符，并包括数字、字母或特殊字符。"),
        invalidEmailFormat: $m$$("请输入有效的电子邮件地址。"),
        invalidEmailFormatAuth: $m$$("该电子邮件地址已被使用。"),
        sentAuthMail: $m$$("要完成验证并注册，请在 24 小时内点击验证邮件中的链接。"),
        sentFirstAuthMail: $m$$("创建账户后，验证邮件将发送到输入的电子邮件地址。<br>验证邮件可在 24 小时内进行验证。"),
        invalidAnswerInput: $m$$("身份验证答案最多可输入 10 个字符。"),
        requiredAuthAnswer: $m$$("请输入身份验证答案。"),
        requiredAuthQuestion: $m$$("请输入身份验证问题。"),
        invalidAuthQuestionFormat: $m$$("请输入 2~12 个字符的身份验证问题。"),
        notAuthenticatedEmail: $m$$("该账户未在会员信息中完成电子邮件验证。"),
        failIdentification: $m$$("错误代码：{0}\n请联系客户服务 1:1 咨询或拨打 1566-0550（全国通用）进行咨询。"),
        notExistedAccountId: $m$$("该账号未注册。"),
        confirmProtectorAgree: $m$$("请同意收集/使用子女的个人信息并允许其使用游戏。"),
        confirmUniqueAgree: $m$$("请同意收集和使用监护人的个人信息。"),
        requiredValidTerm: $m$$("请选择有效期。"),
        requiredCertificatePhoneNo: $m$$("请输入电话号码。"),
        requiredCertificateConfirmPhoneNo: $m$$("请确认电话号码。"),
        invalidCertificatePhoneNo: $m$$("请输入正确的电话号码。"),
        mismatchCertificatePhoneNo: $m$$("电话号码不匹配。"),
        cautionProcessStep: $m$$("离开此页面后，输入的信息不会被保存。"),
        requiredCancelConfirm: $m$$("请确认并同意上述内容。"),
        requiredAccountIds: $m$$("请选择账号。"),
        resendAuthEmail: $m$$("已重新发送验证邮件。"),
        joinResendAuthEmailFail: $m$$("重新发送验证邮件失败。\n请检查电子邮件地址是否有效。"),
        transIdResendAuthEmailFail: $m$$("重新发送验证邮件失败。\n请检查电子邮件地址是否有效。"),
        passwordByEmail: $m$$("已发送验证邮件。\n如果 24 小时内未完成验证，验证将自动撤销。"),
        invalidPasswordByEmail: $m$$("请输入有效的电子邮件地址。"),
        needPhoneAuthCheck: $m$$("请进行手机所有权认证。"),
        requiredLogout: $m$$("请先注销后再进行操作。")
    };
    AL10N.EmailAuth = {
        invalidAuthCode: $m$$("请输入有效的验证码。"),
        mismatchAndExpireAuthCode: $m$$("验证码有效期为 10 分钟。"),
        resendFail: $m$$("发送验证邮件失败。\n请稍后再试。"),
        resendComplete: $m$$("验证邮件已发送到请求的电子邮件地址。")
    };
    AL10N.Btn = {
        cancel: $m$$("取消"),
        deleteFile: $m$$("删除"),
        findFile: $m$$("浏览"),
        ok: $m$$("确定"),
        registering: $m$$("注册中..."),
        save: $m$$("保存"),
        emailVerification: $m$$("电子邮件验证"),
        inprogress: $m$$("进行中..."),
        authenticating: $m$$("正在认证")
    };
    AL10N.Bora = {
        ready: $m$$("正在连接到 BORA PORTAL"),
        connected_user: $m$$("通过已经在 BORA PORTAL 上验证的用户连接"),
        connected_wallet: $m$$("通过已连接到 BORA PORTAL 的钱包连接"),
        expired: $m$$("连接超时"),
        exception: $m$$("发生错误，请重试。")
    };
})(XLGames.Localization.message);