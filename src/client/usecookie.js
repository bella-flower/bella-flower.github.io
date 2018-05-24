module.exports = {
  getCookie : function (name){
    var arr = document.cookie.split("; ");
    for(var i=0,len=arr.length;i<len;i++){
      var item = arr[i].split("=");
      if(item[0]==name){
        return item[1];
      }
    }
    return "";
  },
    setCookie  : function (c_name, value, expiredays){
      var exdate = new Date();
      exdate.setDate(exdate.getDate() + expiredays);
      document.cookie = c_name + "=" + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString());
    },

  delCookie:function (name) {
    function getCookie(name){
      var arr = document.cookie.split("; ");
      for(var i=0,len=arr.length;i<len;i++){
        var item = arr[i].split("=");
        if(item[0]==name){
          return item[1];
        }
      }
      return "";
    };
    var exp = new Date();
    exp.setTime(exp.getTime() + (-1 * 24 * 60 * 60 * 1000));
    var cval = getCookie(name);
    document.cookie = name + "=" + cval + "; expires=" + exp.toGMTString();
  }
};
