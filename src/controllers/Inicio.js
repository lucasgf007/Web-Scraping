const index = async (req, res) => {
    res.render('home')
}

const faq = async (req, res) => {

    res.render('faq')
}

module.exports.index = index
module.exports.faq = faq