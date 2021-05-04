const post = require('../models/post');

exports.getPosts = async (req,res,next) => {
    const posts = await post.find({user_id:req.session.user._id});
    res.render('admin/posts',{
        posts: posts
    });
}

exports.getEdit_Post = async (req,res,next) => {
    const selected_Post = await post.findOne({_id:req.body.id});
    res.render('admin/edit-post',{
        post: selected_Post
    });
}

exports.addPost = (req,res,next) => {
    res.render('admin/add-post');
}

exports.Posting = async (req,res,next) => {
    const data = req.body;
    const new_Blog = new post({
        title: data.title,
        description: data.description,
        read_Count: 0,
        user_id: req.session.user._id
    });
    await new_Blog.save();
    res.redirect(`/admin/${req.session.user.user_name}/posts`);
}

exports.postEdit_Post = async (req,res,next) => {
    await post.updateOne({_id: req.body.id},{title:req.body.title,description:req.body.description});
    res.redirect(`/admin/${req.session.user.user_name}/posts`);
}

exports.logOut = async (req,res,next) => {
    req.session.destroy(()=>{
        res.redirect('/');
    })
}