import { Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

//Guideline sizes are based on standard ~5" screen mobile device
const guidelineBaseWidth = 390;
const guidelineBaseHeight = 844;
/**
 * 
 * @param {*} size 
 * @returns 根據畫面寬度比例 
 */
const scale = size => width / guidelineBaseWidth * size;
/**
 * 
 * @param {*} size 
 * @returns 根據畫面高度
 */
const verticalScale = size => height / guidelineBaseHeight * size;
/**
 * 
 * @param {*} size 
 * @param {*} factor 
 * @returns 根據特定倍數放大縮小
 */
const moderateScale = (size, factor = 0.6) => size + ( scale(size) - size ) * factor;
/**
 * 更改組件大小引入
 */
export  {scale, verticalScale, moderateScale};