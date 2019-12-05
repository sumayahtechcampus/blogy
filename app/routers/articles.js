const express =require('express');

const router =express.Router();
const Article = require ('../models/article');
//GET ALL ARTICLES
router.get('/articles',(req,res)=> {
    res.json({message:'welcome to articles'});
});
/**
 * Action:      INDEX
 * Method:      GET
 * URI:         /api/articles
 * Description: Get All Articles
 */
router.get('/api/articles', (req, res) => {
    Article.find()
    // Return all Articles as an Array
    .then((articles) => {
      res.status(200).json({ articles: articles });
    })
    // Catch any errors that might occur
    .catch((error) => {
      res.status(500).json({ error: error });
    });
  });

  

/**
* Action:       SHOW
* Method:       GET
* URI:          /api/articles/5d664b8b68b4f5092aba18e9
* Description:  Get An Article by Article ID
*/
/**
 * Action:      CREATE
 * Method:      POST
 * URI:         /api/articles
 * Description: Create a new Article
*/
router.post('/api/articles', (req, res) =>{
Article.create(req.body.article)
// On a successful create action, responsd with 201
// HHTP status and the content of new article
.then((newArticle)=>{
    res.status(201).json({article: newArticle});
})
// Catch any error that is might occur
.catch((error)=>{
    res.status(500).json({error: error});
})
});
/**
 * Action:      UPDATE
 * Method:      PATCH
* URI:          /api/articles/5d664b8b68b4f5092aba18e9
* Description:  Update An Article by Article ID
 */
/**
 * Action:      DESTROY
 * Method:      DELETE
* URI:          /api/articles/5d664b8b68b4f5092aba18e9
* Description: Delete An Article by Article ID
 */
router.delete('/api/articles/:id', (req, res)=>{
    Article.findById(req.params.id)
    .then((article) => {
        if(article){
            return article.remove();
        } else {
            res.status(404).json({
                error: {
                    name: 'Document not foundError',
                    message: 'THe Provided Id dosent match any documnet'
                }
            });
        }

    })
   .then(() =>{
       res.status(204).end();
   })
   .catch((error) => {
       res.status(500).json({error: error});
   });
});
// UPDATE ARTICLE BY ID --PATCH
// DELETE ARTICLE BY ID --DESTROY
module.exports=router;