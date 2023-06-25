function sortDate(date) {
    const substringed = date.substring(0, 10)

    return substringed.split("-").reverse().join("-")
}

module.exports = { sortDate }