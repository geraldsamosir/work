// anggap seperti kelas statis yg global
app.service('articleDataPasser',function(){
    var article= null;
    return{
        loadArticle: function(){
            return article;
        },
        setArticle: function(value){
            article = value;
        }
    };
})