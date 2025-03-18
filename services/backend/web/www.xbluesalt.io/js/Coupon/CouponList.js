const pageSize = 10;
let characterServerNo = 0;
let characterName = null;
let characterNo = 0;
let characterServerName = "";

window.onload = function () {
    render(1);

    for (let i = 1; i <= 4; i++) {
        $("#ipCoupon" + i).bind({
            paste: function (e) {
                if (window.clipboardData)
                    pasteCoupon(window.clipboardData.getData('text'));
                else
                    pasteCoupon(e.originalEvent.clipboardData.getData('text/plain'));
            }
        });
    }

    document.getElementById("btnRegCoupon").addEventListener("click", function () {
        let couponId = "";

        Array.from(document.getElementsByClassName("coupon-input")).sort(function (a, b) {
            return a.getAttribute("data-index") - b.getAttribute("data-index");
        }).forEach(function (element, index) {
            couponId += element.value;
        });

        if (couponId == "" || couponId.length != 17) {
            alert(dictionary.wrongCoupon);
        } else {
            if (confirm(dictionary.regCoupon)) {
                registCoupon(couponId);
            }
        }
    });

    Array.from(document.getElementsByClassName("serverBtn")).forEach(function (element, index) {
        element.addEventListener("click", function () {
            characterName = element.getAttribute("data-char-name");
            characterServerNo = element.getAttribute("data-server");
            characterNo = element.getAttribute("data-character-id");
            characterServerName = element.getAttribute("data-server-name");

            render(1);
        });
    });
    
    document.getElementById("checkAll").addEventListener("click", function (e) {
        if (characterName == null) {
            e.preventDefault();
            return;
        }
        checkAll();
    });

    document.getElementById("btnUseCouponChecked").addEventListener("click", function () {
        useCouponChecked();
    });

    Handlebars.registerHelper('setStatus', function (message, canUse, couponId) {
        let result = message;
        if (characterServerNo == 0) {
            result = "-";
        }
        else if (canUse) {
            result = `<a href='javascript:useCouponOne(${couponId})'>${result}</a>`
        }
        return result;
    });

    Handlebars.registerHelper('couponCheckbox', function (couponId, canUse) {
        if (characterName != null && canUse) {
            return `<input type="checkbox"  id="coupon_${couponId}" data-coupon-id=${couponId} class="checkOne"><label for="coupon_${couponId}"></label>`;
        } else {
            return `<input type="checkbox" disabled='true' id="${couponId}" data-coupon-id=${couponId} class="checkOne"><label for="${couponId}"></label>`;
        }
        return result;
    });
}

const pasteCoupon = async function (value) {
    if (value) {
        value = value.toUpperCase().trim().replace(/-/g, '');
        if (value.length === 17) {
            var keys = [value.substr(0, 4), value.substr(4, 4), value.substr(8, 4), value.substr(12)];
            for (var i = 0; i < keys.length; i++) {
                $("#ipCoupon" + (i + 1)).val(keys[i]);
            }
        }
    }
}

const registCoupon = async function (couponId) {
    let data = {
        "couponKey" : couponId
    }

    let result = await axios.post("/api/coupon/regCoupon", data, {
            headers: { "Content-Type": `application/json` }
        }
    );

    if (result.data.success) {
        location.href = location.href;
    } else {
        alert(result.data.message);
    }
}

const useCoupon = async function (couponId) {
    let data = {
        "couponId": couponId,
        "serverNo": characterServerNo,
        "characterNo": characterNo,
        "characterName" : characterName
    }
    
    document.querySelector(`td[data-coupon-id='${couponId}']`).innerHTML = dictionary.processing;

    return axios.post("/api/coupon/usecoupon", data)
        .then(function (response) {
            return { id: couponId, response: response };
        });
}

const useCouponChecked = async function () {
    if (characterNo == 0) {
        alert(dictionary.selectCharacter);
    } else {
        if (confirm(dictionary.useCoupon.format(`${characterName}@${characterServerName}`))) {
            let coupons = [];

            Array.from(document.getElementsByClassName("checkOne")).forEach(async function (element, index) {
                if (element.checked) {
                    coupons.push(element.getAttribute("data-coupon-id"));
                }
            });

            if (coupons.length == 0) {
                alert(dictionary.emptyCoupon);
                return;
            }

            Promise.all(
                coupons.map((id) => {
                    return useCoupon(id);
                })
            ).then(function (values) {
                let totalCount = values.length;
                let successCount = 0;
                values.forEach(data => {
                    if (data.response.data.success) {
                        successCount++;
                    }
                    document.querySelector(`td[data-coupon-id='${data.id}']`).innerHTML = data.response.data.message;
                });
                if (totalCount == successCount) {
                    alert(dictionary.sendComplete);
                } else {
                    alert(dictionary.sendFailed.format(totalCount - successCount, totalCount));
                }
                location.href = location.href;
            });
        }
    }
}

const useCouponOne = async function (couponId) {
    if (characterNo == 0) {
        alert(dictionary.selectCharacter);
    } else {
        if (confirm(dictionary.useCoupon.format(`${characterName}@${characterServerName}`))) {
            useCoupon(couponId)
                .then((result) => {
                    alert(result.response.data.message);
                    location.href = location.href;
                });
        }
    }
}

const checkAll = function () {
    let btnAll = Array.from(document.getElementsByClassName("checkOne"));

    btnAll.forEach(function (element, index) {
        if (characterNo != 0) {
            element.checked = document.getElementById("checkAll").checked;
        }
    })
}

const render = async function (pageNo) {
    document.getElementById("checkAll").checked = false;

    const tableSection = document.getElementById("table-section");
    const pagingSection = document.getElementById("paging-section");

    tableSection.innerHTML = "";
    pagingSection.innerHTML = "";

    pageNo = (!isNaN(pageNo) && pageNo > 0) ? pageNo : 1;

    let data = {
        "serverid": characterServerNo,
        "pageNo": pageNo,
        "pageSize": pageSize
    };
    
    const response = await axios.get(`/www.xbluesalt.io/api/coupon/couponlist.json`, data);

    let templateData = response.data;
    templateData.hasRows = templateData.totalCount > 0;
    templateData.couponInfos = templateData.couponInfos.slice(0, pageSize);

    TotalPaging(pageNo, response.data.totalCount, pageSize, 1, render).forEach((element, index) => {
        pagingSection.append(element);
    });

    var source = document.getElementById("entry-template").innerHTML;
    var template = Handlebars.compile(source);
    var html = template({
        items: templateData
    });

    $(tableSection).append(html);
}
