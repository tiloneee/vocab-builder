import mongoose from "mongoose";
import Vocab from "../models/vocabModel.js";

export const list_all_words = async (req, res) => {
    try {
        const words = await Vocab.find({});
        res.json(words);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const create_a_word = async (req, res) => {
    try {
        const newWord = new Vocab(req.body);
        const savedWord = await newWord.save();
        res.json(savedWord);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const read_a_word = async (req, res) => {
    try {
        const word = await Vocab.findById(req.params.wordId);
        res.json(word);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const update_a_word = async (req, res) => {
    try {
        const updatedWord = await Vocab.findOneAndUpdate(
            { _id: req.params.wordId },
            req.body,
            { new: true }
        );
        res.json(updatedWord);
    } catch (err) {
        res.status(500).send(err);
    }
};

export const delete_a_word = async (req, res) => {
    try {
        await Vocab.deleteOne({ _id: req.params.wordId });
        res.json({ 
            message: 'Word successfully deleted',
            _id: req.params.wordId,
        });
    } catch (err) {
        res.status(500).send(err);
    }
};


