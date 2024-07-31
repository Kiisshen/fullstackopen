const dummy = (blogs) => {
    return 1
}

const totalLikes = (blogs) => {
    let likes = 0
    if(blogs){
        blogs.forEach(element => {
            likes += element.likes
        });
    }
    return likes
}

const favouriteBlog = (blogs) => {
    let favourite = {
        "likes": 0,
        "title": "",
        "author": ""
    }
    if(blogs){
        blogs.forEach(element => {
            if(element.likes > favourite.likes){
                favourite.likes = element.likes
                favourite.title = element.title
                favourite.author = element.author
            }
            else if(favourite.title == "" || favourite.author == ""){
                favourite.likes = element.likes
                favourite.title = element.title
                favourite.author = element.author
            }
        });
    }
    return favourite
}

const mostBlogs = (blogs) => {

}

const mostLikes = (blogs) => {

}
  
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}