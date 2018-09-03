<template>
	<el-table
    :data="tableData3"
    style="width: 100%">
    <el-table-column type="expand">
      <template slot-scope="props">
        <p>State: {{ props.row.state }}</p>
        <p>City: {{ props.row.city }}</p>
        <p>Address: {{ props.row.address }}</p>
        <p>Zip: {{ props.row.zip }}</p>
      </template>
    </el-table-column>
    <el-table-column
      label="예상 젠시간">
      <template slot-scope="scope">
        <i class="el-icon-time"></i>
        <span style="margin-left: 10px">{{ scope.row.date }}</span>
      </template>
    </el-table-column>

    <el-table-column
      label="이름"
      prop="name">
    </el-table-column>

    <el-table-column
      label="컷체크">
      <template slot-scope="scope">
      	<el-time-select
      		size="mini"
      		:picker-options="{
      			start: '00:00',
      			end: '23:59',
				    step: '00:1',
				  }"
				  v-model="scope.row.lastTime">
				</el-time-select>
				<el-button
					class="
					.btn-check-time"
					type="danger"
					size="mini"
				><i class="el-icon-check"></i></el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script type="text/javascript">
	import Vue from 'vue'
	import $ from 'jquery'

	export default {
    data() {
      return {
        tableData3: [{
          date: '18:30:00',
          name: '스피리드',
          lastTime: '18:30:00',
        }	]
      }
    }
  }
</script>

<style scoped>
	*{font-size:12px;}
</style>