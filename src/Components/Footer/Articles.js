import { useEffect, useState } from "react"

function Articles({article, mainUser}){
    let [title, setTitle] = useState(article.title)


    // useEffect(() => {
    //     if (title.length) {
    //         setTitle(title.slice(0, 20) + "...")
    //       }
    // }, [title, article.title])

return(
    <a href={`${article.url}`} target="_blank">
   <div className="article_real">
    <div className="article_image_container">
        <img src={article.urlToImage} alt={article.title} className="article_img"/>
    </div>

    <div className="article_info_container">
        <div className={`article-title light_text`}>{title}</div>
        <br/>
        <div className={`article_news_outlet  light_text` }>Published: {article.source.name}</div>
    </div>

   </div>

    </a>
    
)

}


export default Articles