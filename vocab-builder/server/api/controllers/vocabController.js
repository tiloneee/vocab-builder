const mongoose = require('mongoose');
const Vocab = mongoose.model('Vocab');

exports.list_all_words = (req, res) => {
    Vocab.find({}, (err, word) => {
        if (err) return res.status(500).send(err); // Added return here
        return res.json(word); // Added return here
    });
}

exports.create_a_word = (req, res) => {
    const newWord = new Vocab(req.body);
    newWord.save()
        .then(word => res.json(word))
        .catch(err => res.status(500).send(err)); // No change needed here
};

exports.read_a_word = (req, res) => {
    Vocab.findById(req.params.wordId, (err, word) => {
        if (err) return res.status(500).send(err); // Added return here
        return res.json(word); // Added return here
    });
};

exports.update_a_word = (req, res) => {
    Vocab.findOneAndUpdate(
        { _id: req.params.wordId },
        req.body,
        { new: true },
        (err, word) => {
            if (err) return res.status(500).send(err); // Added return here
            return res.json(word); // Added return here
        }
    );
};

exports.delete_a_word = (req, res) => {
    Vocab.deleteOne({ _id: req.params.wordId }, (err) => {
        if (err) return res.status(500).send(err); // Added return here
        return res.json({ 
            message: 'Word successfully deleted',
            _id: req.params.wordId,
        });
    });
};
