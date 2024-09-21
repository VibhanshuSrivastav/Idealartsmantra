const mongoose = require('mongoose');

const sequenceSchema = new mongoose.Schema({
    _id: { type: String, required: true },
    sequence_value: { type: Number, default: 1 }
});

const Sequence = mongoose.model('Sequence', sequenceSchema);

async function getNextSequenceValue(sequenceName) {
    try {
        const sequenceDoc = await Sequence.findByIdAndUpdate(
            sequenceName,
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        return sequenceDoc.sequence_value;
    } catch (error) {
        console.error('Error getting next sequence value:', error);
        throw error;
    }
}

module.exports = {
    Sequence,
    getNextSequenceValue
};
