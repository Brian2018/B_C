<template>
	<div class="person_msg">
		<div class="header"><span @click="$router.back()"></span>个人信息</div>	
		<div class="msg_touxiang"><span>头像</span><i class="item_link"></i>
			<el-upload
			class="avatar-uploader"
			action="https://jsonplaceholder.typicode.com/posts/"
			:show-file-list="false"
			:on-success="handleAvatarSuccess"
			:before-upload="beforeAvatarUpload">
			<img v-if="imageUrl" :src="imageUrl" class="avatar">
			<i v-else="!imageUrl" class="el-icon-plus avatar-uploader-icon"></i>
		</el-upload>
	</div>
	<ul class="msg_title ul_list page-picker" >
		<li @click='set_name'>昵称<i></i><span id="your_name">{{nick_name}}</span></li>
		<li>性别<div class="sex_choose">
			<span name="man" :class="{'active_man':choosed_man}" @click='choose_man'>男</span>
			<span name="woman" :class="{'active_woman':choosed_woman}" @click='choose_woman'>女</span>
		</div></li>
		<li @click='openPicker'>出生日期<i></i><span>{{date}}</span></li>
		<mt-datetime-picker  :startDate="startDate" :endDate='endDate'
			v-model="pickerVisible"
			ref="picker"
			type="date"			
			year-format="{value} 年"
			month-format="{value} 月"
			date-format="{value} 日"		
			@confirm="handleConfirm">
		</mt-datetime-picker>
	<li @click='choose_address'>地址<i class="item_link"></i><span>{{ addressProvince }} {{ addressCity }} </span></li>
	<li @click="$router.push({path:'/qr_code'})">我的二维码<i class="item_link"></i><img src="./img/QR code_icon.png" alt=""></li>
</ul>
<div class="choose_address" v-show='address_show'>
	<p class="page-picker-desc"><span @click="cancel">取消</span>地址: {{ addressProvince }} {{ addressCity }} <label @click='ensure_address'>确定</label></p>
	<div class="page-picker-wrapper">
		<mt-picker :slots="addressSlots" @change="onAddressChange" :visible-item-count="5"></mt-picker>
	</div>
</div>
<ul class="msg_bottom ul_list">
	<li class="first" @click="$router.push({path:'/bind_taobao'})">淘宝会员名<i></i><span>{{taobao_account}}</span></li>
	<li>身份信息<i></i><span>{{idcard}}</span></li>
</ul>
<div class="edit_name" v-if='edit'>
	<div class="edit-title">设置昵称</div>
	<input class="edit-input" v-model="value" name="nick_name" type="text" placeholder="请输入昵称" maxlength="15">
	<div class="edit-bottom">
		<div class="edit-cancel" @click="cancel">取消</div>
		<div class="edit-submit e-edit-nickname" @click="ensure">提交</div>
	</div>
</div>
<div class="black" v-if='black_show'></div>
</div>
</template>
<script>
import crypto from 'crypto'
const address = {
	'北京': ['北京'],
	'广东': ['广州', '深圳', '珠海', '汕头', '韶关', '佛山', '江门', '湛江', '茂名', '肇庆', '惠州', '梅州', '汕尾', '河源', '阳江', '清远', '东莞', '中山', '潮州', '揭阳', '云浮'],
	'上海': ['上海'],
	'天津': ['天津'],
	'重庆': ['重庆'],
	'辽宁': ['沈阳', '大连', '鞍山', '抚顺', '本溪', '丹东', '锦州', '营口', '阜新', '辽阳', '盘锦', '铁岭', '朝阳', '葫芦岛'],
	'江苏': ['南京', '苏州', '无锡', '常州', '镇江', '南通', '泰州', '扬州', '盐城', '连云港', '徐州', '淮安', '宿迁'],
	'湖北': ['武汉', '黄石', '十堰', '荆州', '宜昌', '襄樊', '鄂州', '荆门', '孝感', '黄冈', '咸宁', '随州', '恩施土家族苗族自治州', '仙桃', '天门', '潜江', '神农架林区'],
	'四川': ['成都', '自贡', '攀枝花', '泸州', '德阳', '绵阳', '广元', '遂宁', '内江', '乐山', '南充', '眉山', '宜宾', '广安', '达州', '雅安', '巴中', '资阳', '阿坝藏族羌族自治州', '甘孜藏族自治州', '凉山彝族自治州'],
	'陕西': ['西安', '铜川', '宝鸡', '咸阳', '渭南', '延安', '汉中', '榆林', '安康', '商洛'],
	'河北': ['石家庄', '唐山', '秦皇岛', '邯郸', '邢台', '保定', '张家口', '承德', '沧州', '廊坊', '衡水'],
	'山西': ['太原', '大同', '阳泉', '长治', '晋城', '朔州', '晋中', '运城', '忻州', '临汾', '吕梁'],
	'河南': ['郑州', '开封', '洛阳', '平顶山', '安阳', '鹤壁', '新乡', '焦作', '濮阳', '许昌', '漯河', '三门峡', '南阳', '商丘', '信阳', '周口', '驻马店'],
	'吉林': ['长春', '吉林', '四平', '辽源', '通化', '白山', '松原', '白城', '延边朝鲜族自治州'],
	'黑龙江': ['哈尔滨', '齐齐哈尔', '鹤岗', '双鸭山', '鸡西', '大庆', '伊春', '牡丹江', '佳木斯', '七台河', '黑河', '绥化', '大兴安岭地区'],
	'内蒙古': ['呼和浩特', '包头', '乌海', '赤峰', '通辽', '鄂尔多斯', '呼伦贝尔', '巴彦淖尔', '乌兰察布', '锡林郭勒盟', '兴安盟', '阿拉善盟'],
	'山东': ['济南', '青岛', '淄博', '枣庄', '东营', '烟台', '潍坊', '济宁', '泰安', '威海', '日照', '莱芜', '临沂', '德州', '聊城', '滨州', '菏泽'],
	'安徽': ['合肥', '芜湖', '蚌埠', '淮南', '马鞍山', '淮北', '铜陵', '安庆', '黄山', '滁州', '阜阳', '宿州', '巢湖', '六安', '亳州', '池州', '宣城'],
	'浙江': ['杭州', '宁波', '温州', '嘉兴', '湖州', '绍兴', '金华', '衢州', '舟山', '台州', '丽水'],
	'福建': ['福州', '厦门', '莆田', '三明', '泉州', '漳州', '南平', '龙岩', '宁德'],
	'湖南': ['长沙', '株洲', '湘潭', '衡阳', '邵阳', '岳阳', '常德', '张家界', '益阳', '郴州', '永州', '怀化', '娄底', '湘西土家族苗族自治州'],
	'广西': ['南宁', '柳州', '桂林', '梧州', '北海', '防城港', '钦州', '贵港', '玉林', '百色', '贺州', '河池', '来宾', '崇左'],
	'江西': ['南昌', '景德镇', '萍乡', '九江', '新余', '鹰潭', '赣州', '吉安', '宜春', '抚州', '上饶'],
	'贵州': ['贵阳', '六盘水', '遵义', '安顺', '铜仁地区', '毕节地区', '黔西南布依族苗族自治州', '黔东南苗族侗族自治州', '黔南布依族苗族自治州'],
	'云南': ['昆明', '曲靖', '玉溪', '保山', '昭通', '丽江', '普洱', '临沧', '德宏傣族景颇族自治州', '怒江傈僳族自治州', '迪庆藏族自治州', '大理白族自治州', '楚雄彝族自治州', '红河哈尼族彝族自治州', '文山壮族苗族自治州', '西双版纳傣族自治州'],
	'西藏': ['拉萨', '那曲地区', '昌都地区', '林芝地区', '山南地区', '日喀则地区', '阿里地区'],
	'海南': ['海口', '三亚', '五指山', '琼海', '儋州', '文昌', '万宁', '东方', '澄迈县', '定安县', '屯昌县', '临高县', '白沙黎族自治县', '昌江黎族自治县', '乐东黎族自治县', '陵水黎族自治县', '保亭黎族苗族自治县', '琼中黎族苗族自治县'],
	'甘肃': ['兰州', '嘉峪关', '金昌', '白银', '天水', '武威', '酒泉', '张掖', '庆阳', '平凉', '定西', '陇南', '临夏回族自治州', '甘南藏族自治州'],
	'宁夏': ['银川', '石嘴山', '吴忠', '固原', '中卫'],
	'青海': ['西宁', '海东地区', '海北藏族自治州', '海南藏族自治州', '黄南藏族自治州', '果洛藏族自治州', '玉树藏族自治州', '海西蒙古族藏族自治州'],
	'新疆': ['乌鲁木齐', '克拉玛依', '吐鲁番地区', '哈密地区', '和田地区', '阿克苏地区', '喀什地区', '克孜勒苏柯尔克孜自治州', '巴音郭楞蒙古自治州', '昌吉回族自治州', '博尔塔拉蒙古自治州', '石河子', '阿拉尔', '图木舒克', '五家渠', '伊犁哈萨克自治州'],
	'香港': ['香港'],
	'澳门': ['澳门'],
	'台湾': ['台北市', '高雄市', '台北县', '桃园县', '新竹县', '苗栗县', '台中县', '彰化县', '南投县', '云林县', '嘉义县', '台南县', '高雄县', '屏东县', '宜兰县', '花莲县', '台东县', '澎湖县', '基隆市', '新竹市', '台中市', '嘉义市', '台南市']
};
export default {
	data() {
		return {
			startDate: new Date('1950-01-01'),
			endDate: new Date('2010-01-01'),
			pickerVisible:'',
			imageUrl: '',
			edit:false,
			value:'',
			choosed_man:true,
			choosed_woman:false,
			date:'',
			black_show:false,
			address_show:false,
			addressSlots: [
			{
				flex: 1,
				values: Object.keys(address),
				className: 'slot1',
				textAlign: 'center'
			}, {
				divider: true,
				content: '-',
				className: 'slot2'
			}, {
				flex: 1,
				values: ['北京'],
				className: 'slot3',
				textAlign: 'center'
			}
			],
			addressProvince: '',
			addressCity: '',
			image_url:'',
			sex:'',
			taobao_account:'',
			nick_name:'',
			birth_time:'',
			idcard:'',
			sex_id:''
		};
	},
	methods: {
		openPicker() {
			this.$refs.picker.open();
		},
		handleAvatarSuccess(res, file) {
			this.imageUrl = URL.createObjectURL(file.raw);
		},
		beforeAvatarUpload(file) {
			// const isJPG = file.type === 'image/jpeg';
			// const isLt2M = file.size / 1024 / 1024 < 2;

			// if (!isJPG) {
			// 	this.$message.error('上传头像图片只能是 JPG 格式!');
			// }
			// if (!isLt2M) {
			// 	this.$message.error('上传头像图片大小不能超过 2MB!');
			// }
			// return isJPG && isLt2M;
		},
		// 格式化获取的时间
		formatDate(date) {
			const y = date.getFullYear()
			let m = date.getMonth() + 1
			m = m < 10 ? '0' + m : m
			let d = date.getDate()
			d = d < 10 ? ('0' + d) : d
			return y + '-' + m + '-' + d
		},
		handleConfirm() {
			this.date=this.formatDate(this.pickerVisible);
		},
		set_name(){
			this.black_show=this.edit=true;			
		},
		cancel(){
			this.black_show=this.edit=false;	
			this.address_show=this.black_show=false;		
		},
		ensure(){
			this.name=this.value;
			this.black_show=this.edit=false;
		},
		ensure_address(){
			this.address_show=this.black_show=false;
		},
		choose_man(){
			if(this.choosed_man==false){
				this.choosed_man=this.choosed_man==false?true:false;
				this.choosed_woman=this.choosed_woman==false?true:false;
			}			
		},
		choose_woman(){
			if(this.choosed_woman==false){
				this.choosed_man=this.choosed_man==false?true:false;
				this.choosed_woman=this.choosed_woman==false?true:false;
			}			
		},
		choose_address(){
			this.address_show=this.black_show=true;
		},
		onAddressChange(picker, values) {
			picker.setSlotValues(1, address[values[0]]);
			this.addressProvince = values[0];
			this.addressCity = values[1];
		}	
	},
	mounted(){
		this.six_id=this.$route.query.six_id;
		var md5 = crypto.createHash("md5");
      	md5.update('L8q{b=fk=4aJ3jM#cBDE8SaZ_A;bWAG]'+this.six_id);
      	var app_key = md5.digest('hex');
		var url_user='http://pass.71baomu.com/interface/user/getUserInfo/key/' + app_key;
		var six_id='six_id='+this.six_id;
		this.$axios.post(url_user,six_id).then((res) => {
			console.log(res['data']['data']);
			this.addressProvince=res['data']['data']['province'];
			this.addressCity=res['data']['data']['city'];
			this.choosed_man=res['data']['data']['sex']=='male'?true:false;
			this.choosed_woman=res['data']['data']['sex']=='male'?false:true;
			this.imageUrl=res['data']['data']['image_url'];
			this.taobao_account=res['data']['data']['taobao_account']==null?'未绑定':res['data']['data']['taobao_account'];
			this.idcard=res['data']['data']['idcard']==null?'未绑定':res['data']['data']['idcard'];
			this.nick_name=res['data']['data']['nick_name'];
			this.date=res['data']['data']['birth_time'];
		});
	}
};
</script>
<style>
input[type="radio"]{
	content: '';
}
.person_msg{
	position: fixed;
	width: 100%;
	height: 100%;
	top: 0;
	left: 0;
	background: #F5F7F7;
}	
.person_msg>.msg_touxiang{
	width: inherit;
	height: 1.5rem;
	background: #fff;
	margin-top: 0.2rem;
	font-family: PingFangSC-Regular;
	font-size: 0.28rem;
	color: #333333;
	letter-spacing: 1.11px;
	line-height: 1.5rem;
	text-align: left;
	position: relative;
}
.person_msg>.msg_touxiang:before{
	content: '';
	height: 1px;
	width: inherit;
	background: #e0e0e0;
	position: absolute;
	top: 0;
	left: 0;
	display: block;
	-webkit-transform: scaleY(.33);
	-ms-transform: scaleY(.33);
	-o-transform: scaleY(.33);
	transform: scaleY(.33);
}
.person_msg>.msg_touxiang>.avatar-uploader>div{
	float: right;
	height: 0.92rem;
	width: 0.92rem;
	border-radius: 50%;
	margin-top: 0.29rem;
	margin-right: 0.2rem;
	overflow: hidden;
}
.el-icon-plus{
	display: block;
	width: inherit;
	height: inherit;
	background: url(./img/head.png) center no-repeat;
	background-size: 0.92rem;
}
.el-icon-plus:before{
	content: '';
}
.msg_touxiang>span{
	float: left;
	margin-left: 0.32rem; 
}
.msg_touxiang>p>span{
	display: inline-block;		
	width: 0.92rem;		
	border-radius: 50%;
	height: inherit;
	float: right;
	vertical-align: middle;		
}
.msg_touxiang>p>span>img{
	width: 0.92rem;
	height: 0.92rem;
	display: inline-block;
	vertical-align: middle;
}
.msg_touxiang>p>i{
	float: right;
	display:inline-block;
	width: 0.2rem;
	height: 0.2rem;
	background: url(./img/link_to.png) no-repeat;
	background-size: 0.2rem;
	margin: 0.65rem 0.32rem 0 0.2rem;
}
.msg_title{
	width: inherit;
	background: #fff;
	margin-top: 0;
}
.msg_bottom{
	width: inherit;height: 2.41rem;
	background: #fff;
	margin-top: 0.2rem;
}
.msg_bottom>li{		
	height: 1.2rem;
	margin-left: 0.32rem;
	text-align: left;
	font-family: PingFangSC-Regular;
	font-size: 0.30rem;
	color: #333333;
	letter-spacing: 1.18px;
	line-height: 1.2rem;
}
.msg_title>li{
	height: 1.2rem;
	margin-left: 0.32rem;	
	text-align: left;	
	font-family: PingFangSC-Regular;
	font-size: 0.30rem;
	color: #333333;
	letter-spacing: 1.18px;
	line-height: 1.2rem;
}
.msg_title>li>img{
	width: 0.48rem;
	height: 0.48rem;
	float: right;
	margin-top: 0.35rem;
}
.msg_title>li>i,.msg_bottom>li>i{
	float: right;
	display:inline-block;
	width: 0.2rem;
	height: 0.2rem;
	background: url(./img/link_to.png) no-repeat;
	background-size: 0.2rem;
	margin: 0.5rem 0.32rem 0 0.2rem;
}
.msg_title>li>span,.msg_bottom>li>span{
	float: right;
	font-family: PingFang-SC-Medium;
	font-size: 0.26rem;
	color: #B3B3B3;
	letter-spacing: 1.03px;
}
.sex_choose{
	float: right;
	width: 1.3rem;
	height: 1.2rem;
	margin-right: 0.32rem;
	font-size: 0.26rem;
	color: #B3B3B3;
	line-height: 1.2rem;
}
.sex_choose>span{
	display: inline-block;
	width: 0.5rem;
	float: left;
	height: inherit;
	padding: 0.05rem !important;
	background: url(./img/Oval_normal.png) left center no-repeat;
	background-size: 0.2rem;
	text-align: right;
}
.sex_choose>.active_man{
	background: url(./img/Oval_nan.png) left center no-repeat;
	background-size: 0.2rem;
}
.sex_choose>.active_woman{
	background: url(./img/Oval_nv.png) left center no-repeat;
	background-size: 0.2rem;
}
.sex_choose>.woman{
	margin-left: 0.1rem;
}
.edit_name{
	width: 6rem;
	height: 3.14rem;
	background: #f1f1f1;
	border-radius: 0.08rem;
	position: fixed;
	top: 2.5rem;
	left: 0.75rem;
	z-index: 2;
}
.edit-title {
	font-family: .PingFang-SC-Medium;
	font-size: 0.36rem;
	color: #262626;
	text-align: center;
	margin: 0.35rem 0;
}
.edit-input {
	font-size: 0.28rem;
	-webkit-appearance: none;
	width: 5.1rem;
	height: 0.68rem;
	border: 1px solid #b3b3b3;
	border-radius: 4px;
	float: left;
	margin-left: 0.32rem; 
	padding-left: 0.2rem;
}
.edit-bottom {
	position: absolute;
	bottom: 0;
	height: 0.84rem;
	box-shadow: inset 0px 1px 0px 0px #d3d3d3;
	width: 6rem;
}
.edit-bottom>div {
	float: left;
	line-height: 0.84rem;
	font-family: .PingFang-SC-Regular;
	font-size: 0.34rem;
	color: #333333;
	text-align: center;
	width: 2.99rem;
}
.edit-submit {
	width: 2.99rem;
	color: #30bb32!important;
	border-left: 0.01rem solid #d3d3d3;
}
@component-namespace page {
	@component picker {
		padding: 0 10px 20px;
		@descendent wrapper {
			background-color: #fff;
			text-align: center;
		}

		@descendent desc {
			margin: 10px 0 50px;
		}

		.mint-button {
			margin-top: 15px;
		}
	}
}
.choose_address{
	position: fixed;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 999;
	border-top: 1px solid #e0e0e0;
	border-bottom: 1px solid #e0e0e0;
}
.page-picker-desc{
	height: 0.8rem;
	width: 100%;
	font-size: 0.3rem;
	line-height: 0.8rem;
	background-color: #fff;
}
.page-picker-desc>span{
	display: inline-block;
	width: 1rem;
	float: left;
	text-align: center;
	line-height: 0.8rem;
	font-size: 0.28rem;
	color: #26a2ff;
}
.page-picker-desc>label{
	display: inline-block;
	width: 1.2rem;
	float: right;
	text-align: center;
	line-height: 0.8rem;
	font-size: 0.28rem;
	color: #26a2ff;
}
.page-picker-wrapper{
	background-color: #fff;
}
</style>