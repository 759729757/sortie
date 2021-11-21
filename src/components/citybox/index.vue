<template>
    <div>
		<el-row>
			<el-col :span="4">
				姓名：
			</el-col>
			<el-col :span="20">
				<el-input v-model="userName" placeholder="请输入收件人姓名"></el-input>
			</el-col>
		</el-row>
		<el-row>
			<el-col :span="4">
				手机号：
			</el-col>
			<el-col :span="20">
				<el-input v-model="phoneNumber" placeholder="请输入收件人手机号"></el-input>
			</el-col>
		</el-row>
		<div class="cityBox">
			<el-select v-model="prov">
				<el-option v-for="(option, index) in arr" :disabled="edit" :value="option.name" :key="index">{{ option.name }}</el-option>
			</el-select>
			<el-select v-model="city">
				<el-option v-for="(option, index) in cityArr" :disabled="edit" :value="option.name" :key="index">{{ option.name }}</el-option>
			</el-select>
			<el-select v-model="district" v-if="district">
				<el-option v-for="(option, index) in districtArr" :disabled="edit" :value="option.name" :key="index">{{ option.name }}</el-option>
			</el-select>
		</div>
		<div>
			<el-input
				type="textarea"
				:rows="2"
				placeholder="请输入详细地址"
				v-model="address">
			</el-input>
		</div>
        <div class="flex btn-ground">
          <el-button type="info" @click="cancelAddress">取消</el-button>
          <el-button type="success" @click="submit">确认</el-button>
        </div>
	</div>
</template>

<script>
import area from "./area.js";
  import {userAddress} from '../../api'

export default {
    data() {
        return{
			userName: '',
			phoneNumber: '',
            arr: area.arrAll,
			address: '',
			prov: '省份',
			city: '城市',
			district: '区域',
			cityArr: [],
			districtArr: [],
			edit: false,
			iscity: false,
			isdistrict: false
        }
    },
	mounted() {
		userAddress().then(res => {
			this.userName = res.data.userName,
			this.phoneNumber = res.data.phoneNumber,
			this.address = res.data.address,
			this.prov = res.data.prov,
			this.district = res.data.district,
			this.city = res.data.city
		})
	},
    methods: {
		cancelAddress: function(){
			this.$emit('cancel');
		},
		submit: function() {
			if(!this.userName){
				this.$message.error('请输入收件人姓名');
				return false
			}
			if(!this.phoneNumber){
				this.$message.error('请输入收件人手机号');
				return false
			}
			if(this.prov === '省份'){
				this.$message.error('请选择省份');
				return false
			}
			if(this.city == "城市"){
				this.$message.error('请选择城市');
				return false
			}
			if(this.district == "区域"){
				this.$message.error('请选择区域');
				return false
			}
			if(!this.address){
				this.$message.error('请输入详细地址');
				return false
			}
			this.$emit('submit', {
				userName: this.userName,
				phoneNumber: this.phoneNumber,
				prov: this.prov,
				city: this.city,
				district: this.district,
				address: this.address
			})
		},
        updateCity: function() {
			this.iscity = false;
			for (var i in this.arr) {
				var obj = this.arr[i];
				if (obj.name) {
					if (obj.name == this.prov) {
						this.cityArr = obj.sub;
						break;
					}
				}
			}
			if (this.cityArr && this.cityArr.length > 0 && this.cityArr[1].name) {
				for (var i in this.cityArr) {
					var obj = this.cityArr[i];
					if (obj.name == this.city) {
						this.city = obj.name;
						this.iscity = true;
						break;
					}
				}
				if (!this.iscity) {
					this.city = this.cityArr[1].name;
				}
			} else {
				this.city = '城市';
			}
		},
		//更新区域数据
		updateDistrict: function() {
			var i = 1;
			this.isdistrict = false;
			for (var i in this.cityArr) {
				var obj = this.cityArr[i];
				if (obj.name == this.city) {
					this.districtArr = obj.sub;

					break;
				}
			}
			if(this.cityArr[i].sub!=undefined){
			if(this.cityArr[i].sub[0].name!=""){
			if (this.districtArr && this.districtArr.length > 0&&this.districtArr[1].name) {
				for (var i in this.districtArr) {
					var obj = this.districtArr[i];
					if (obj.name == this.district) {
						this.district = obj.name;
						this.isdistrict = true;
						break;
					}
				}
				if (!this.isdistrict) {
					this.district = this.districtArr[1].name;
				}
			}
			}else{
				this.district=""
			}
			}else{
				this.district=""
			}
		}
    },
    beforeMount(){
        this.updateCity();
		this.updateDistrict();
    },
    watch: {
		prov: function() {
			this.updateCity();
			this.updateDistrict();
		},
		city: function() {
			this.updateDistrict();
		}
	}

}
</script>

<style scoped>
	.cityBox{
		display: flex;
	}

  .btn-ground .el-button{
    margin-top: 20px;
    width: 48%;
  }


</style>