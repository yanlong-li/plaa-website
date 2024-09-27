export default defineEventHandler(async (event) => {

    const targetUrl = 'http://localhost:8080' + getRequestPath(event).replace(/^\/api/, '');
    let headers = getRequestHeaders(event);


    let opts = {
        method: event.method,
        body: undefined,
        headers: {
            ...headers,
            // 确保 cookie 被包含
            cookie: headers.cookie || ''
        },
        credentials: 'include'
    };

    if (opts.method === 'POST' || opts.method === 'PUT') {
        opts.body = await readBody(event);
    }

    // console.log(event);

    let res  = await $fetch.raw(targetUrl, opts)
    /* Get the cookies from the response */
    const cookies = res.headers.getSetCookie()
    /* Attach each cookie to our incoming Request */
    for (const cookie of cookies) {
        appendResponseHeader(event, 'set-cookie', cookie)
    }

    // console.log(event)
    return res._data;
});
