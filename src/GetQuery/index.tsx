const GetQuery = (name: string) => {
    let query: { [key: string]: string } = {},
        search = window.location.search.slice(1).split('&'),
        i = search.length,
        p,
        j,
        v;
    while (i--) {
        p = search[i];
        if (p) {
            j = p.indexOf('=');
            v = p.slice(j + 1);
            v &&
                j > 0 &&
                (query[p.slice(0, j).toLowerCase()] = decodeURIComponent(v));
        }
    }
    return query[name.toLowerCase()] || '';
};

export default GetQuery;
