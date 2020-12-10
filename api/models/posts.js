const PATH = "./data.json"
const fs = require('fs');

class Post {

    get = () => {
        /* Get Posts */
        return this.readData();
    }


    getIndividualBlog(postId) {
        /* Get One BLog Post */
        const posts = this.readData();
        const foundPost = posts.find((post) => post.id == postId);
        return foundPost;
    }

    add(newPost) {
        /* Add new Post  */
        const currentPosts = this.readData();
        currentPosts.unshift(newPost);
        this.storeData(currentPosts);
    }


    readData() {

        let rawdata = fs.readFileSync(PATH);  // read in string format so we have to parse it 
        let posts = JSON.parse(rawdata); //converting in json format
        return posts;

    }

    storeData(rawData) {
        let data = JSON.stringify(rawData);
        fs.writeFileSync(PATH,data);
    }
}

module.exports = Post