<template>
  <div class="hello">
  <el-table
  border
  style="width: 100%">
  <el-table-column
  prop="id"
  label="设置的id"
  width="180">
  </el-table-column>
  <el-table-column
  prop="createdOn"
  label="开始时间"
  width="180">
  </el-table-column>
  <el-table-column
  prop="updatedOn"
  label="修改时间">
  </el-table-column>
    <el-table-column
      prop="priceAvg"
      label="价格">
    </el-table-column>
    <el-table-column
      prop="operationUserId"
      label="用户id">
    </el-table-column>
    <el-table-column
      prop="quoteDate"
      label="引用价格日期">
    </el-table-column>

  </el-table>
  </div>
</template>
<script>
  export default {
    name: 'price',
    data () {
      return {
        msg: '',
        dialogVisible:false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: '',
        },
      }
  },
  methods:{

    close(){
      alert(1);
      this.dialogVisible=false;
    },
    obList(){
      let parms = {
        url: this.URLS.TY_BACK_adminMarket_quotation,
        token:window.sessionStorage.getItem('token'),
        data: {
          p:1,
          p_size:10
        }
      };
      this.SERVICE.post(parms, res => {
        console.log(res);
      });
    },

  },
    mounted(){
      this.obList()
    }
  }
</script>
<style>

</style>


