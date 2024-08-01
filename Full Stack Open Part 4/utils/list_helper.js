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
    const authorBlogCount = {};

    if(!blogs){
        return { author: "", blogs: 0}
    }

    blogs.forEach(blog => {
        const author = blog.author;
        if (authorBlogCount[author]) {
            authorBlogCount[author]++;
        } else {
            authorBlogCount[author] = 1;
        }
    });

    let maxBlogs = 0;
    let authorWithMostBlogs = "";
    for (const author in authorBlogCount) {
        if (authorBlogCount[author] > maxBlogs) {
            maxBlogs = authorBlogCount[author];
            authorWithMostBlogs = author;
        }
    }

    return { author: authorWithMostBlogs, blogs: maxBlogs };
}

const mostLikes = (blogs) => {
    const authorLikeCount = {};

    if(!blogs){
        return { author: "", likes: 0}
    }

    blogs.forEach(blog => {
        const author = blog.author;
        if (authorLikeCount[author]) {
            authorLikeCount[author] += blog.likes;
        } else {
            authorLikeCount[author] = blog.likes;
        }
    });

    let maxLikes = 0;
    let authorWithMostLikes = "";
    for (const author in authorLikeCount) {
        if (authorLikeCount[author] > maxLikes) {
            maxLikes = authorLikeCount[author];
            authorWithMostLikes = author;
        }
    }

    return { author: authorWithMostLikes, likes: maxLikes };
}
  
module.exports = {
    dummy,
    totalLikes,
    favouriteBlog,
    mostBlogs,
    mostLikes
}