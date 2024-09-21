const { Sequence } = require('../db/sequence');

async function getNextRollNo() {
    try {
        const sequenceDoc = await Sequence.findByIdAndUpdate(
            'studentId',
            { $inc: { sequence_value: 1 } },
            { new: true, upsert: true }
        );
        return sequenceDoc.sequence_value;
    } catch (error) {
        console.error('Error getting next roll number:', error);
        throw error;
    }
}

module.exports = getNextRollNo;
