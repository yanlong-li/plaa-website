const MakePaging = (pageNo, total, pageSize, pageRange, callBack) => {

    pageSize = pageSize ? pageSize : 20;
    pageRange = pageRange ? pageRange : 1;

    total = (!isNaN(total) && total > 0) ? total : 0;

    let arrPages = [];

    if (total === 0) {
        return arrPages;
    }

    let lastPrev = pageNo - pageRange;

    if(lastPrev > 1){
        let firstPage = document.createElement("a");
        firstPage.addEventListener("click", () => {
            callBack(1);
        });
        firstPage.innerHTML = "1";
        arrPages.push(firstPage);
    }

    if(lastPrev > 2) {
        let prevDot = document.createElement("span");
        prevDot.className = "paging-more";
        prevDot.innerHTML = "...";
        arrPages.push(prevDot);
    }

    for(let i = lastPrev; i < lastPrev + pageRange; i++){
        if(i > 0){
            let prevPage = document.createElement("a");
            prevPage.addEventListener("click", () => {
                callBack(i);
            });
            prevPage.innerHTML = i;
            arrPages.push(prevPage);
        }
    }

    let tmpTotal = total;
    
    for(let i = pageNo; i <= pageNo + pageRange; i++){
        if(tmpTotal > 0){
            let tmpElement = document.createElement("a");
            
            tmpElement.innerHTML = i;

            if(i == pageNo){
                tmpElement.className = "active";
            }else{
                tmpElement.addEventListener("click", () => {
                    callBack(i);
                });
            }

            arrPages.push(tmpElement);
        }

        tmpTotal = tmpTotal - pageSize;
    }

    if(tmpTotal > 0){
        let nextDot = document.createElement("span");
        nextDot.className = "paging-more";
        nextDot.innerHTML = "...";
        arrPages.push(nextDot);

        let next = document.createElement("a");
        next.addEventListener("click", () => {
            callBack(pageNo + pageRange)
        });
        next.className = "paging-navi";
        next.innerHTML = " Next<i></i>";
        arrPages.push(next);
    }
    
    return arrPages;
}

const TotalPaging = (pageNo, total, pageSize, pageRange, callBack) => {
    var pagingTotal = total - (pageSize * (pageNo - 1));

    return MakePaging(pageNo, pagingTotal, pageSize, pageRange, callBack);
}

const customHelpers = {
    currency: (value) => {
        return value.toLocaleString();
    },
    locale: (value) => {
        value = value / 10000;
        return value.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    },
    localeDouble: (value) => {
        return value.toLocaleString(undefined, { minimumFractionDigits: 4, maximumFractionDigits: 4 });
    },
    shortHash: (value) => {
        if (value?.length >= 12) {
            return `${value.toString().substr(0, 5)}...${value.toString().substr(-5, 5)}`;
        }
        return value;
    },
    accountPart: (value) => {
        let accountId = value.split('@');

        if (accountId.length != 2) {
            return value;
        }

        let localPart = accountId[0];
        let len = localPart.length;

        if (len < 2) {
            return value;
        }

        if (len === 2) {
            localPart = localPart[0] + "*";
        }
        else if (len === 3) {
            localPart = localPart[0] + "*" + localPart[2];
        }
        else if (len === 4) {
            localPart = localPart[0] + "**" + localPart[3];
        }
        else if (len === 5) {
            localPart = localPart.substr(0,2) + "**" + localPart[4];
        }
        else if (len > 5) {
            localPart = localPart.substr(0, len - 5) + "***" + localPart.substr(len - 2, 2);
        }

        return localPart + "@" + accountId[1];
    },
    copy: (value) => {
        const el = document.createElement('textarea');
        el.value = value;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    },
    localeDoubleSmall: (value) => {
        let stringValue = value.toString();
        let left = parseInt(stringValue.split('.')[0]).toLocaleString();
        let right = stringValue.split('.')[1];
        if (right) {
            while (right.length < 4) {
                right += "0";
            }
            left += `<small>.${right}</small>`;
        } else {
            left += "<small>.0000</small>";
        }

        return left;
    }
}

const copyText = (str) => {
    const el = document.createElement('textarea');
    el.value = str;
    el.setAttribute('readonly', '');
    el.style.position = 'absolute';
    el.style.left = '-9999px';
    document.body.appendChild(el);
    el.select();
    document.execCommand('copy');
    document.body.removeChild(el);
}

const GoPage = (pageNo) => {
    location.href = location.origin + location.pathname + `?pageNo=${pageNo}`;
}

function renderHandlebars(contentId, templateId, data) {
    const content = document.getElementById(contentId);

    var source = document.getElementById(templateId).innerHTML;
    var template = Handlebars.compile(source);
    var html = template(data);

    $(content).html(html);
}

const formSubmit = function (url, data) {
    var form = document.createElement("form");
    form.setAttribute("charset", "UTF-8");
    form.setAttribute("method", "Post");
    form.setAttribute("action", url);

    if (data) {
        Array.from(Object.keys(data)).forEach(function (key) {
            var hiddenField = document.createElement("input");
            hiddenField.setAttribute("type", "hidden");
            hiddenField.setAttribute("name", key);
            hiddenField.setAttribute("value", data[key]);
            form.appendChild(hiddenField);
        })
    }

    document.body.appendChild(form);
    form.submit();
}

function getCookie(name) {
    let cookieRegexp = new RegExp(' ' + name + '=([^;]+)');
    let result = cookieRegexp.exec(' ' + document.cookie);
    if (result != null && result.length == 2) {
        return result[1];
    }
    return null;
}


function setCookie(name, value, domain) {
    let now = new Date();
    let expires = now.valueOf() + (1000 * 60 * 60 * 24 * 30);
    document.cookie = name + "=" + value + ";path=/;Expires=" + new Date(expires) + ";domain=." + domain;
}



