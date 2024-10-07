const formatPercent = (number) => {
    let res = number;
    if (number.toString().length >= 3 && number !== 100) {
        res = number.toFixed(1);
    }
    return res;
}

export default formatPercent