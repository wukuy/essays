import Moment from 'moment';

export default {
	// 时间格式化
	getDateDiff (dateTimeStamp) {
		let result = '';
		let minute = 1000 * 60;
		let hour = minute * 60;
		let day = hour * 24;
		let now = new Date().getTime();
		let diffValue = now - dateTimeStamp;
		if (diffValue < 0) { return; };
		let dayC = diffValue / day;
		let hourC = diffValue / hour;
		let minC = diffValue / minute;

		if (dayC >= 1) {
			result = Moment(dateTimeStamp).format('YYYY-MM-DD HH:mm:ss');
		} else if (hourC >= 1) {
			result = '' + parseInt(hourC) + '小时前';
		} else if (minC >= 1) {
			result = '' + parseInt(minC) + '分钟前';
		} else {
			result = '刚刚';
		}
		return result;
	}
};
