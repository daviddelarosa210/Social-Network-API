const { User, Thought } = require('../models'); // Import the models folder

const thoughtController = {
  getAllThoughts(req, res) {
    Thought.find()
      .populate('reactions')
      .select('-__v')
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

  getThoughtById(req, res) {
    const thoughtId = req.params.id;

    Thought.findById(thoughtId)
      .populate('reactions')
      .select('-__v')
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  createThought(req, res) {
    const { thoughtText, username, userId } = req.body;

    Thought.create({ thoughtText, username, userId })
      .then((thought) => {
        return User.findByIdAndUpdate(userId, { $push: { thoughts: thought._id } }, { new: true });
      })
      .then(() => res.json({ message: 'Thought created successfully' }))
      .catch((err) => res.status(500).json(err));
  },

  updateThought(req, res) {
    const thoughtId = req.params.id;
    const { thoughtText } = req.body;

    Thought.findByIdAndUpdate(
      thoughtId,
      { thoughtText },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteThought(req, res) {
    const thoughtId = req.params.id;

    Thought.findByIdAndDelete(thoughtId)
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        // Remove thought from associated user's thoughts array
        return User.findByIdAndUpdate(thought.userId, { $pull: { thoughts: thoughtId } });
      })
      .then(() => res.json({ message: 'Thought and associated user data updated' }))
      .catch((err) => res.status(500).json(err));
  },

  createReaction(req, res) {
    const thoughtId = req.params.thoughtId;
    const { reactionBody, username } = req.body;

    Thought.findByIdAndUpdate(
      thoughtId,
      { $push: { reactions: { reactionBody, username } } },
      { new: true, runValidators: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteReaction(req, res) {
    const thoughtId = req.params.thoughtId;
    const reactionId = req.body.reactionId;

    Thought.findByIdAndUpdate(
      thoughtId,
      { $pull: { reactions: { reactionId } } },
      { new: true }
    )
      .then((thought) => {
        if (!thought) {
          res.status(404).json({ message: 'Thought not found' });
          return;
        }
        res.json(thought);
      })
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = thoughtController;
