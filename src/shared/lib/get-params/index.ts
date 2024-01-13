export default function getParams(source: any) {
    const params = {} as any;

    Object.keys(source).forEach(key => {
        if (!source[key])
            return;
        
        params[key] = source[key];
    })

    return { params };
}