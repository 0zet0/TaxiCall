function getFullTimeText(minutes: number) {
    if (minutes <= 60)
        return `${Math.floor(minutes)} минут`;

    const minute = Math.floor(minutes % 60);
    const hour = Math.floor(minutes / 60);

    return hour < 24 ? `${hour} часов ${minute} минут` : `${Math.floor(hour / 24)} дней ${Math.floor(hour % 24)} часов`;
}

export { getFullTimeText }