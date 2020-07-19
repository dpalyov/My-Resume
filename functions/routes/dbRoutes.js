const router = require("express").Router();
const admin = require("firebase-admin");
const Post = require("../models/Post");
const {app} = require("../init");

const db = app.firestore();

router.get("/data/:collection", async (req, res) => {
    let { sortField, sortOrder = "asc" } = req.query;

    if(!sortField){
        sortField = admin.firestore.FieldPath.documentId();
    }

    const { collection } = req.params;
    const entity = await db
        .collection(`${collection}`)
        .orderBy(sortField, sortOrder)
        .get();
    const data = entity.docs.map((d) => d.data());
    return res.status(200).json(data);
});

router.post("/posts/create", async (req, res) => {
    var postModel = Post(req.body);
    var post = await (await db.collection("/posts").add(postModel))
    
    if(post.id) {
        return res.json({
            success: true,
            body: post.id
        })
    }
    else {
        return res.json({
            success:false,
            body: res.statusMessage
        })
    }
    
})

router.post("/comments/create", async (req, res) => {
    var {content, authorId, postId} = Comment(req.body);
    var comment = await (await db.collection("/comments").add({
        content: content,
        author: db.doc(`/users/${authorId}`),
        post: db.doc(`/posts/${postId}`)
    }))
    
    if(comment.id) {
        return res.json({
            success: true,
            body: comment.id
        })
    }
    else {
        return res.json({
            success:false,
            body: res.statusMessage
        })
    }
    
})

module.exports = router;
