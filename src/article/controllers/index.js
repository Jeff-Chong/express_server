import {
  addArticle,
  editArticle,
  listArticles,
  removeArticle
} from '../use-cases'

import makeGetArticles from './get-articles'
import makePostArticle from './post-article'
import makePatchArticle from './patch-article'
import makeDeleteArticle from './delete-article'

const getArticles = makeGetArticles({ listArticles })
const postArticle = makePostArticle({ addArticle })
const patchArticle = makePatchArticle({ editArticle })
const deleteArticle = makeDeleteArticle({ removeArticle })

const articleController = Object.freeze({
  getArticles,
  postArticle,
  patchArticle,
  deleteArticle
})

export default articleController

export { getArticles, postArticle, patchArticle, deleteArticle }
