import makeAddArticle from './add-article'
import makeEditArticle from './edit-article'
import makeRemoveArticle from './remove-article'
import makeListArticles from './list-articles'
import { verifyInfo } from '../../_helpers'

import articlesDb from '../data-access'

const addArticle = makeAddArticle({ articlesDb, verifyInfo })
const editArticle = makeEditArticle({ articlesDb, verifyInfo })
const listArticles = makeListArticles({ articlesDb })
const removeArticle = makeRemoveArticle({ articlesDb, verifyInfo })

const articleService = Object.freeze({
  addArticle,
  editArticle,
  listArticles,
  removeArticle
})

export default articleService
export { addArticle, editArticle, listArticles, removeArticle }
