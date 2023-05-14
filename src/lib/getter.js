export const getter = async (url, context) => {
    const cookie = context.req.headers.cookie;
    const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      cookie: cookie
    },
    })
    if(res.status === 401 && !context.req) {
        router.push('/auth/login');
    }
    if(res.status === 401 && !context.req) {
        router.push('/auth/login');
    }
    if(res.status === 401) {
        context.res.writeHead(302, {
        Location: 'http://localhost:3000/auth/login'
        });
        context.res.end();
        return;
    }
    const json = await res.json()
    return json;
}