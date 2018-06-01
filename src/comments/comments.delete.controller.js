const query = require('../Query');

exports.deleteCommnets = async (req, res) => {
  const comment = await query.deleteComment(req.body.comment_id)
  if (!comment) {
    return res.status(404).json({message: "삭제 실패"})
  }
  return res.status(200).json({ message: "success" })
}