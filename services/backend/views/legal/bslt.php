<?php
$this->title = 'BSLT Deposit and Withdrawal Policy | XLGAMES Global member';
?>


<section class="content">
    <header class="content-title">
        <h1>BSLT Deposit and Withdrawal Policy</h1>
    </header>
    <div class="etc">

        <section class="etc_box etc_date">
            <div class="tit">1. Definition of Terms</div>
            <ul>
                <li><span class="cl">1)</span> “Deposit” refers to the act of transferring BSLT purchased from an
                    external exchange and held in a personal service token wallet to an ArcheWorld account.
                </li>
                <li><span class="cl">2)</span> “Withdrawal” refers to the act of transferring BSLT held in an ArcheWorld
                    account to personal service token wallet
                </li>
            </ul>

            <div class="tit">2. BSLT Decimal Places</div>
            <ul>
                <li>
                    <span class="cl">1)</span> BSLT is supported up to 4 decimal places. Decimal places after that will
                    be left out.<br/>
                    &nbsp;&nbsp;&nbsp;&nbsp;Ex) 12.3456789 -> 12.3456
                </li>
            </ul>

            <div class="tit">3. BSLT Deposit Fee</div>
            <ul>
                <li><span class="cl">1)</span> 1% of the total deposit amount will be charged as a platform fee when
                    depositing BSLT to the account.
                </li>
                <li><span class="cl">2)</span> The Liquidity, not the depositor, is responsible for covering the
                    platform fee.
                </li>
                <li><span class="cl">3)</span> There are no additional deposit fees except for the blockchain gas fee
                    for depositor.
                </li>
                <li><span class="cl">4)</span> There is no separate limit on the maximum daily deposit amount per
                    account.
                </li>
                <li><span class="cl">5)</span> The deposit fee is subject to change after prior notice.</li>
            </ul>

            <div class="tit">4. BSLT Withdrawal Fee</div>
            <ul>
                <li><span class="cl">1)</span> The minimum/maximum daily withdrawal amount per account is subject to
                    change depending on the Operational Policy of the Company. The minimum/maximum daily withdrawal
                    amount per account will be notified separately by the Company on the website, and the announcement
                    has the same force as a part of this policy.
                </li>
                <li><span class="cl">2)</span> Withdrawal fee is fixed at 10 BSLT per time regardless of the withdrawal
                    amount.
                </li>
                <li><span class="cl">3)</span> Blockchain Gas fee is consumed separately in addition to the withdrawal
                    fee during withdrawal.
                </li>
                <li><span class="cl">4)</span> Withdrawal fee is subject to change after prior notice.</li>
            </ul>

            <div class="tit">5. Membership Wallet Verification Policy</div>
            <ul>
                <li><span class="cl">1)</span> Only one wallet per account can be verified, and once the wallet address
                    has been verified, it cannot be re-verified to another account until 7 days have elapsed after
                    membership withdrawal.
                </li>
                <li><span class="cl">2)</span> Once the wallet is verified in the account, it cannot be replaced due to
                    personal reasons such as loss or hacking of the verified wallet.
                </li>
            </ul>

            <div class="tit">6. BSLT withdrawal limit</div>
            <ul>
                <li><span class="cl">1)</span> If the account's service use is restricted according to the Operational
                    Policy, the withdrawal of BSLT deposited in the ArcheWorld account may be restricted until the
                    reason for the service restriction is resolved.
                </li>
                <li><span class="cl">2)</span> BSLT does not support functions such as gift or transfer other than
                    deposit/withdrawal to the account.
                </li>
                <li><span class="cl">3)</span> BSLT will be deducted immediately upon BSLT withdrawal requests. All
                    withdrawal requests require a waiting time of at least 24 hours to a maximum of 25 hours from the
                    time requested, and the withdrawal request cannot be cancelled during the waiting time.
                </li>
                <li><span class="cl">4)</span> If a reason for withdrawal rejection (lack of balance, account
                    restriction, maintenance, etc.) occurs during the waiting time, additional waiting time may be
                    required until the reason for withdrawal rejection is resolved, apart from the waiting time
                    specified in 6. 3) of this policy.
                </li>
            </ul>

            <div class="tit">7. BSLT Processing upon Membership Withdrawal</div>
            <ul>
                <li><span class="cl">1)</span> You cannot request membership withdrawal if you have BSLT that have not
                    been withdrawn from your account.
                </li>
                <li><span class="cl">2)</span> In accordance with Policy 1.4.3), membership withdrawal is not possible
                    if the remaining balance of BSLT is less than the withdrawal fee because the withdrawal fee of 10
                    BSLT is fixedly deducted every time, regardless of the amount withdrawn.
                </li>
            </ul>


            <div class="end">
                ADDENDUM<br/>
                The BSLT Deposit and Withdrawal Policy is effective from: March 24, 2023.
            </div>

        </section>
    </div>
</section>


<?php
$this->beginBlock('script');
?>

<script type="text/javascript">
    $(document).ready(function () {
        XLGames.Legal.Navigation.showSubGnb("bslt", "bslt");
    });
</script>
<?php
$this->endBlock();
?>
