//@flow
import React from 'react';
import './Btn.css';

type BtnPropsType = {
   label?: string,
   btnStyle?: string,
   btnClick: Function
};

export const Btn = ({ label, btnStyle, btnClick }: BtnPropsType ) => (
	<a className={`btn ${btnStyle || ''}`} onClick={e => btnClick(e)}>
		{label}
	</a>
)

export default Btn;