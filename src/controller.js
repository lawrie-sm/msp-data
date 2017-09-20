'use strict';
import * as model from './model';
import * as view from './view';

const CURRENT_DATE = new Date();

//let test_date = new Date(2011, 1, 1);

export const getExpandedCellData = () => {
	return new Promise((resolve, reject) => {
		let mspMap = model.getExpandedMSPMap(CURRENT_DATE).then((mspMap) => {
			resolve(mspMap);
		});
	});
}

export const refreshView = (date) => {
		console.log('refreshing', date); //TODO: Make Model handle date updates
		model.getMSPMap(date).then((mspMap) => {
			view.refresh(mspMap);
		});
}

/*** Main ***/

view.init();
model.getMSPMap(CURRENT_DATE).then((mspMap) => {
	view.refresh(mspMap);
});