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
  
module.exports = {
    dummy,
    totalLikes
}