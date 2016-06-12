// anggap seperti kelas statis yg global
app.service('statusUserDataPasser',function(){
    var statusUser = null;
    return{
        loadStatusUser: function(){
            return statusUser;
        },
        setStatusUser: function(value){
            statusUser = value;
        }
    };
})