const { User, Thought } = require('../models'); // Import the models folder

const userController = {
  getAllUsers(req, res) {
    User.find()
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((users) => res.json(users))
      .catch((err) => res.status(500).json(err));
  },

  getUserById(req, res) {
    const userId = req.params.id;

    User.findById(userId)
      .populate('thoughts')
      .populate('friends')
      .select('-__v')
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  createUser(req, res) {
    const { username, email } = req.body;

    User.create({ username, email })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  updateUser(req, res) {
    const userId = req.params.id;
    const { username, email } = req.body;

    User.findByIdAndUpdate(
      userId,
      { username, email },
      { new: true, runValidators: true }
    )
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        res.json(user);
      })
      .catch((err) => res.status(500).json(err));
  },

  deleteUser(req, res) {
    const userId = req.params.id;

    User.findByIdAndDelete(userId)
      .then((user) => {
        if (!user) {
          res.status(404).json({ message: 'User not found' });
          return;
        }
        // BONUS: Remove user's associated thoughts
        return Thought.deleteMany({ _id: { $in: user.thoughts } });
      })
      .then(() => res.json({ message: 'User and associated thoughts deleted' }))
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    User.findByIdAndUpdate(userId, { $addToSet: { friends: friendId } }, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },

  removeFriend(req, res) {
    const userId = req.params.userId;
    const friendId = req.params.friendId;

    User.findByIdAndUpdate(userId, { $pull: { friends: friendId } }, { new: true })
      .then((user) => res.json(user))
      .catch((err) => res.status(500).json(err));
  },
};

module.exports = userController;
