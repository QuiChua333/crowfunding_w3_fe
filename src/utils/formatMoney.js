const formatMoney = (monney = 0) => {
    const formatter = new Intl.NumberFormat('de-VN', {
        style: 'currency',
        currency: 'VND',
    });

    let temp = formatter.format(monney).toString();

    let res = temp.slice(0, -1);
    return res
};
export default formatMoney;
