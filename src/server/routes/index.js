var express = require('express');
var router = express.Router();
var data = {
  myChart:[5110, 11, 15, 13],
  tableData: [
    {
      zhuangtai: '总数',
      shuliang: '5000',
    },
    {
      zhuangtai: '运行',
      shuliang: '2020',
    },
    {
      zhuangtai: '排队',
      shuliang: '150',
    },
    {
      zhuangtai: '退出',
      shuliang: '150',
    }
  ],
}
/* GET home page. */
router.route('/').get(function (req,res) {

})
  .post(function (req,res) {
     console.log(req.body);
     res.send(data);
  });


module.exports = router;
