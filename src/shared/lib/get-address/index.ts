export default function getAddress(address: any, isFirstAddress: boolean) {
    if (!address)
        return ''
    
    if (isFirstAddress) {
        if (address.type === 'address') {
            let result = '';

            if (address.street)
                result += address.street;
            if (address.name)
                result += `, ${address.name}`;

            return result
        }
        else
            return address.name || '';
    }
    else {
        if (address.type === 'address') {
            let result = '';

            if (address.city)
                result += address.city;
            if (address.region)
                result += `, ${address.region}`;

            return result
        }
        else
            return address.street || '';
    }
}