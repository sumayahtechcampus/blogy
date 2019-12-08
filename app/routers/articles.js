const express = require('express');
const Article = require('../models/article').Article
const Comment = require('../models/article').Comment
const router = express.Router();

/*
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/articles
 * Description: Get all the articles
 */
router.get("/api/articles", (req, res) => {
    Article.find()
    .then((articles)=>{
        res.status(200).json({articles: articles})
    })
    .catch((error)=>{
        res.status(500).json({error: error})
    })
});
router.get('/api/articles/:articleId/comments', (req, res)=>{
    Article.findById(req.params.articleId)
    .then((article)=>{
        if(article){
            // Pass the result of Mongoose's 'get' method to the next 'then'
            return res.status(200).json({article: article.comments})
        }
        else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: 'The provided ID doesnt match any documents'
                }
            })
        }
    })
    .then(()=>{
        // If the update succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
})
router.get('/api/articles/:articleId/comments/:id', (req, res)=>{
    Article.findById(req.params.articleId)
    .then((article)=>{
        if(article){
            // Pass the result of Mongoose's 'get' method to the next 'then'
            return res.status(200).json({article: article.comments.id(req.params.id)})
        }
        else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: 'The provided ID doesnt match any documents'
                }
            })
        }
    })
    .then(()=>{
        // If the update succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
})
/*
 * Action:      SHOW
 * Method:      GET
 * URI:         /api/articles/:id
 * Description: Get an Article by ID
*/
router.get('/api/articles/:id', (req, res)=>{
    Article.findById(req.params.id)
    .then((article)=>{
        if(article){
            // Pass the result of Mongoose's 'get' method to the next 'then'
            return res.status(200).json({article: article})
        }
        else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: 'The provided ID doesnt match any documents'
                }
            })
        }
    })
    .then(()=>{
        // If the update succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
})

/*
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/articles
 * Description: create a new article 
*/
router.post('/api/articles', (req, res)=>{
    Article.create(req.body.article)
    //On a successful 'create' action,respond with 201
    //HTTP status and the content of the new article
    .then((newArticle)=>{
        res.status(201).json({article: newArticle})
    })
    //Catch any errors 
    .catch((error)=>{
        res.status(500).json({error: error})
    })
})
/*
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/articles/:articleId/comments
 * Description: create a new comment for an article 
*/
router.post('/api/articles/:articleId/comments', (req, res)=>{
    const newComment = new Comment({body: req.body.commentText})

    Article.findById(req.params.articleId, (err, article)=>{
        article.comments.push(newComment)
        article.save((err, savedArticle)=>{
            res.json(newComment)
        });
    });
});
/*
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/articles/:id
 * Description: update an article by id
 */
router.patch('/api/articles/:id',(req, res)=>{
    Article.findById(req.params.id)
    .then((article)=>{
        if(article){
            // Pass the result of Mongoose's 'delete' method to the next 'then'
            return article.updateOne(req.body.article)
        }
        else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: 'The provided ID doesnt match any documents'
                }
            })
        }
    })
    .then(()=>{
        // If the update succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
})
/*
 * Action:      UPDATE
 * Method:      PATCH
 * URI:         /api/articles/:articleId/comments/:id
 * Description: update an article by id
*/
router.patch('/api/articles/:articleId/comments/:id', (req, res)=>{
       const articleId = req.params.articleId
       const commentId = req.params.id
       Article.findById(articleId, (err, article)=>{
           comment = article.comments.id(commentId);
           comment.body = req.body.commentText;
       })
})
/*
 * Action:      DELETE
 * Method:      DELETE
 * URI:         /api/articles/:id
 * Description: Get all the articles
*/
router.delete('/api/articles/:id', (req, res)=>{
    Article.findById(req.params.id)
    .then((article)=>{
        if(article){
            // Pass the result of Mongoose's 'delete' method to the next 'then'
            return article.remove()
        }
        else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: 'The provided ID doesnt match any documents'
                }
            })
        }
    })
    .then(()=>{
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
})
router.delete('/api/articles/:articleId/comments/:id', (req, res)=>{
    Article.findById(req.params.articleId)
    .then((article)=>{
        if(article){
            // Pass the result of Mongoose's 'delete' method to the next 'then'
            article.comments.id(req.params.id).remove()
            article.save()
            return

        }
        else {
            res.status(404).json({
                error: {
                    name: 'DocumentNotFound',
                    message: 'The provided ID doesnt match any documents'
                }
            })
        }
    })
    .then(()=>{
        // If the deletion succeeded, return 204 and no JSON
        res.status(204).end();
    })
    .catch((error)=>{
        res.status(500).json({error:error})
    })
})
module.exports = router