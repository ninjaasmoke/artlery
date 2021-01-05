module.exports = {
    errorLog: (err) => {
        if (err)
            console.error(err);
        else
            console.log('still working');
    }
}